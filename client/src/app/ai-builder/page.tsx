'use client';
import { elizaCharacter } from '../constant';
import Chat from '../components/Chat';
export default function AIBuilder() {
    const createAgent = async () => {
        console.log("Creating agent...");

        try {
            const response = await fetch('/api/create-agent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ characterJson: elizaCharacter }),
            });
            const data = await response.json();
            console.log("Agent created:", data);
        } catch (error) {
            console.error("Error creating agent:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full p-8">
            <h1 className="text-3xl font-bold mb-8 neon-text">AI Builder</h1>
            <div className="flex flex-col items-center justify-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={createAgent}
                >
                    Create Agent
                </button>
                <Chat />
            </div>
        </div>
    );
}