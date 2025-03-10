import { NextResponse } from 'next/server';
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

// Reuse the MongoDB connection logic
declare global {
    // eslint-disable-next-line no-var
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

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
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { error: "userId is required" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("sonic_agent_academy");
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ userId });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            user
        });

    } catch (error) {
        console.error("Error fetching user data:", error);
        if (error instanceof Error) {
            return NextResponse.json(
                { error: `Failed to fetch user data: ${error.message}` },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: "Failed to fetch user data" },
            { status: 500 }
        );
    }
} 