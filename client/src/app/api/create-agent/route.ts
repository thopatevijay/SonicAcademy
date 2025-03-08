import { NextResponse } from 'next/server';
interface CharacterRequest {
    characterPath?: string;
    characterJson?: string;
}

export async function POST(request: Request) {
    try {
        const body: CharacterRequest = await request.json();
        const { characterPath, characterJson } = body;

        console.log("characterPath:", characterPath);
        console.log("characterJson:", characterJson);

        if (!characterPath && !characterJson) {
            return NextResponse.json(
                { error: 'No character path or JSON provided' },
                { status: 400 }
            );
        }

        const API_URL = process.env.API_URL;

        // timeout and proper error handling for fetch
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        const response = await fetch(`${API_URL}/agent/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ characterJson }),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Agent created:", data);
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('API Error:', error);

        // Check for specific error types
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                return NextResponse.json(
                    { error: 'Request timeout' },
                    { status: 504 }
                );
            }
        }

        return NextResponse.json(
            { error: 'Failed to create agent' },
            { status: 500 }
        );
    }
} 