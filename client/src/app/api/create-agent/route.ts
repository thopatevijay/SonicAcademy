import { NextResponse } from 'next/server';
import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from 'uuid';

interface Agent {
    userId: string;
    agentName: string;
    secrets: Record<string, unknown>;
    agentId?: string;
}

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
    // eslint-disable-next-line no-var
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// MongoDB connection (cached to avoid reconnecting on every request)
let client: MongoClient;
const clientPromise: Promise<MongoClient> = (() => {
    if (!MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI environment variable");
    }

    if (!global._mongoClientPromise) {
        client = new MongoClient(MONGODB_URI);
        global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
})();

export async function POST(request: Request) {
    try {
        const { userId, agentName, secrets, characterJson } = await request.json();

        // Input validation
        if (!userId || typeof userId !== 'string') {
            return NextResponse.json(
                { error: "Invalid or missing userId" },
                { status: 400 }
            );
        }

        if (!agentName || typeof agentName !== 'string') {
            return NextResponse.json(
                { error: "Invalid or missing agentName" },
                { status: 400 }
            );
        }

        if (secrets && typeof secrets !== 'object') {
            return NextResponse.json(
                { error: "Secrets must be an object" },
                { status: 400 }
            );
        }

        if (!characterJson) {
            return NextResponse.json(
                { error: "Character JSON is required" },
                { status: 400 }
            );
        }

        const agentId = uuidv4();

        const modifiedCharacter = {
            ...characterJson,
            id: agentId,
            name: agentName,
            settings: {
                ...characterJson.settings,
                secrets: secrets
            }
        };

        // Step 1: Create agent via API
        const API_URL = process.env.NEXT_PUBLIC_CREATE_AGENT_URL;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        const apiResponse = await fetch(`${API_URL}/agent/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                characterJson: modifiedCharacter
            }),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!apiResponse.ok) {
            throw new Error(`API responded with status: ${apiResponse.status}`);
        }

        // Step 2: Store agent data in MongoDB
        const agent: Agent = {
            userId,
            agentName,
            secrets,
            agentId,// Store the agent ID from the API response
        };

        const client = await clientPromise;
        const db = client.db("sonic_agent_academy");
        const agentsCollection = db.collection("agents");

        const result = await agentsCollection.insertOne(agent);

        return NextResponse.json({
            success: true,
            agentId: agentId,
            mongoId: result.insertedId,
            agent: agent,
        });

    } catch (error) {
        console.error("Error creating agent:", error);
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                return NextResponse.json(
                    { error: 'Request timeout' },
                    { status: 504 }
                );
            }
            return NextResponse.json(
                { error: `Failed to create agent: ${error.message}` },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: "Failed to create agent" },
            { status: 500 }
        );
    }
}