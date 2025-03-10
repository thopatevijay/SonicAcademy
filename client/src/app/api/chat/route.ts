import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const NEXT_PUBLIC_CREATE_AGENT_URL = process.env.NEXT_PUBLIC_CREATE_AGENT_URL;
        if (!NEXT_PUBLIC_CREATE_AGENT_URL) {
            throw new Error('NEXT_PUBLIC_CREATE_AGENT_URL is not set');
        }

        const body = await request.json();
        const payload = {
            text: body.message,
        };

        // Add timeout and proper error handling for fetch
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        const response = await fetch(`${NEXT_PUBLIC_CREATE_AGENT_URL}/${body.agentId}/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
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
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}