import { NextResponse } from 'next/server';
import { MongoClient } from "mongodb";

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

export async function GET(request: Request) {
    try {
        // Get userId from the URL search params
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { searchParams } = new URL(request.url);
        const userId = "123";

        // Input validation
        if (!userId) {
            return NextResponse.json(
                { error: "userId is required" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("sonic_agent_academy");
        const agentsCollection = db.collection("agents");

        // Find all agents for the given userId
        const agents = await agentsCollection.find({ userId }).toArray();

        return NextResponse.json({
            success: true,
            agents: agents
        });

    } catch (error) {
        console.error("Error fetching agents:", error);
        if (error instanceof Error) {
            return NextResponse.json(
                { error: `Failed to fetch agents: ${error.message}` },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: "Failed to fetch agents" },
            { status: 500 }
        );
    }
}