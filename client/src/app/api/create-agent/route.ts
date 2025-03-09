import { NextResponse } from 'next/server';
import { MongoClient } from "mongodb";

// Add type definition for agent
interface Agent {
    userId: string;
    agentName: string;
    secrets: Record<string, unknown>;
}

// Move MongoDB URI to environment variable
const MONGODB_URI = process.env.MONGODB_URI;

// Add type definition for global MongoDB client
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
        const { userId, agentName, secrets } = await request.json();

        console.log(userId, agentName, secrets);
        // Enhanced validation
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

        const agent: Agent = { userId, agentName, secrets };

        // Step 2: Store agent data in MongoDB
        const client = await clientPromise;
        const db = client.db("sonic_agent_academy");
        const agentsCollection = db.collection("agents");

        const result = await agentsCollection.insertOne(agent);

        return NextResponse.json({
            success: true,
            agentId: result.insertedId,
            message: "Agent created and stored successfully",
            mongoId: result.insertedId,
            agent: agent,
        });
    } catch (error) {
        // Add more specific error handling
        console.error("Error creating agent:", error);
        if (error instanceof Error) {
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







// interface CharacterRequest {
//     characterPath?: string;
//     characterJson?: string;
// }



// export async function POST(request: Request) {
//     try {
//         const body: CharacterRequest = await request.json();
//         const { characterPath, characterJson } = body;

//         console.log("characterPath:", characterPath);
//         console.log("characterJson:", characterJson);

//         if (!characterPath && !characterJson) {
//             return NextResponse.json(
//                 { error: 'No character path or JSON provided' },
//                 { status: 400 }
//             );
//         }

//         const API_URL = process.env.API_URL;

//         // timeout and proper error handling for fetch
//         const controller = new AbortController();
//         const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

//         const response = await fetch(`${API_URL}/agent/start`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ characterJson }),
//             signal: controller.signal,
//         });

//         clearTimeout(timeoutId);

//         if (!response.ok) {
//             throw new Error(`API responded with status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Agent created:", data);
//         return NextResponse.json(data, { status: 200 });

//     } catch (error) {
//         console.error('API Error:', error);

//         // Check for specific error types
//         if (error instanceof Error) {
//             if (error.name === 'AbortError') {
//                 return NextResponse.json(
//                     { error: 'Request timeout' },
//                     { status: 504 }
//                 );
//             }
//         }

//         return NextResponse.json(
//             { error: 'Failed to create agent' },
//             { status: 500 }
//         );
//     }
// } 