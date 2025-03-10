import { NextResponse } from 'next/server';
import { MongoClient } from "mongodb";

interface UserData {
    userId: string;
    ageGroup: string;
    learningStyle: string;
    experienceLevel: string;
}

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

export async function POST(request: Request) {
    try {
        const { userId, ageGroup, learningStyle, experienceLevel, isNewUser } = await request.json();
        // Input validation
        if (!userId || typeof userId !== 'string') {
            return NextResponse.json(
                { error: "Invalid or missing userId" },
                { status: 400 }
            );
        }

        const userData: UserData = {
            userId,
            ageGroup,
            learningStyle,
            experienceLevel
        };

        const client = await clientPromise;
        const db = client.db("sonic_agent_academy");
        const usersCollection = db.collection("users");

        let result;

        if (isNewUser) {
            // Insert new user
            result = await usersCollection.insertOne(userData);
            return NextResponse.json({
                success: true,
                mongoId: result.insertedId,
                message: "User created successfully"
            });
        } else {
            // Update existing user
            result = await usersCollection.updateOne(
                { userId: userId },
                { $set: userData },
                { upsert: true }
            );
            return NextResponse.json({
                success: true,
                modifiedCount: result.modifiedCount,
                message: "User updated successfully"
            });
        }

    } catch (error) {
        console.error("Error updating user data:", error);
        if (error instanceof Error) {
            return NextResponse.json(
                { error: `Failed to update user data: ${error.message}` },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: "Failed to update user data" },
            { status: 500 }
        );
    }
} 