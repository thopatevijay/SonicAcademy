import { NextResponse } from 'next/server';

type Agent = {
    id: string;
    name: string;
    clients: string[];
}

export async function POST(request: Request) {
    try {
        const API_URL = process.env.API_URL;
        if (!API_URL) {
            throw new Error('API_URL is not set');
        }

        // Fetch agents first
        const agentsResponse = await fetch(`${API_URL}/agents`);
        if (!agentsResponse.ok) {
            throw new Error(`Failed to fetch agents: ${agentsResponse.status}`);
        }
        
        const agentsData = await agentsResponse.json();
        const sonicTutor = agentsData.agents.find((agent: Agent) => agent.name === "SonicTutor");
        
        if (!sonicTutor) {
            throw new Error('SonicTutor agent not found');
        }

        console.log(sonicTutor);
        const body = await request.json();
        const payload = {
            text: body.message,
        };

        // Add timeout and proper error handling for fetch
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        const response = await fetch(`${API_URL}/${sonicTutor.id}/message`, {
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