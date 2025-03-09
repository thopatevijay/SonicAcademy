'use client';
import { elizaCharacter } from '../constant';
import { useState } from 'react';
import { FaRobot, FaPlus, FaPaperPlane, FaComments, FaCog } from 'react-icons/fa';

export default function AIBuilder() {
    const [agents, setAgents] = useState([
        { id: 1, name: 'Agent A' },
        { id: 2, name: 'Agent B' }
    ]);
    const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
    const [message, setMessage] = useState('');

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

    const selectedAgent = agents.find(agent => agent.id === selectedAgentId);

    return (
        <div className="flex min-h-screen w-full bg-gradient-to-b from-gray-900 to-black p-8">
            {/* Container for both sidebar and chat to center them vertically */}
            <div className="flex items-center justify-center w-full gap-8 max-w-[1400px] mx-auto">
                {/* Sidebar */}
                <div className="w-96 h-[600px] bg-gray-900/80 backdrop-blur-sm 
                    rounded-2xl shadow-xl shadow-black/20">
                    {/* Header */}
                    <div className="p-6 border-b border-white/10">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 
                            text-transparent bg-clip-text mb-6">AI Agent Builder</h1>
                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl
                            transition-all duration-300 shadow-lg hover:shadow-blue-500/50 
                            flex items-center justify-center gap-3 text-lg font-medium
                            hover:scale-[1.02] active:scale-[0.98]"
                            onClick={createAgent}
                        >
                            <FaPlus className="text-blue-300" />
                            Create New Agent
                        </button>
                    </div>

                    {/* Agents List */}
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-3 text-white">
                            <FaRobot className="text-blue-400" />
                            My Agents
                        </h2>
                        <div className="space-y-3 overflow-y-auto max-h-[350px] pr-2">
                            {agents.map((agent) => (
                                <div
                                    key={agent.id}
                                    className={`w-full p-4 rounded-xl transition-all duration-300
                                    flex items-center gap-3 border group ${selectedAgentId === agent.id
                                            ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                                            : 'bg-white/5 border-white/5 text-white hover:bg-white/10 hover:border-blue-500/50'
                                        }`}
                                >
                                    <button
                                        className="flex-1 flex items-center gap-3"
                                        onClick={() => setSelectedAgentId(agent.id)}
                                    >
                                        <FaRobot className={selectedAgentId === agent.id ? 'text-blue-400' : 'text-cyan-400'} />
                                        <span className="font-medium">{agent.name}</span>
                                    </button>
                                    <button
                                        className={`p-2 rounded-lg transition-all duration-300 
                                        ${selectedAgentId === agent.id
                                                ? 'text-blue-400 hover:bg-blue-500/20'
                                                : 'text-gray-400 hover:text-cyan-400 hover:bg-white/10'
                                            }`}
                                        onClick={() => console.log('Settings clicked for:', agent.name)}
                                    >
                                        <FaCog className="text-lg" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                {selectedAgent ? (
                    <div className="bg-gray-800/50 rounded-2xl w-[800px] h-[600px] flex flex-col 
                        shadow-xl shadow-black/20 border border-white/10">
                        {/* Chat Header */}
                        <div className="p-6 border-b border-white/10 flex items-center gap-3">
                            <FaComments className="text-cyan-400 text-xl" />
                            <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 
                                text-transparent bg-clip-text">
                                Chat with {selectedAgent.name}
                            </h2>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 p-6 overflow-y-auto">
                            <div className="bg-gray-900/50 rounded-xl p-6 h-full border border-white/5">
                                {/* Messages will go here */}
                            </div>
                        </div>

                        {/* Chat Input */}
                        <div className="p-6 border-t border-white/10">
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder={`Message ${selectedAgent.name}...`}
                                    className="flex-1 bg-gray-900/50 border border-white/10 rounded-xl px-5 py-4
                                    text-white placeholder-white/50 focus:outline-none focus:ring-2 
                                    focus:ring-blue-500/50 focus:border-blue-500"
                                />
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl
                                    transition-all duration-300 flex items-center gap-3 font-medium
                                    hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <FaPaperPlane className="text-blue-300" />
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-800/50 rounded-2xl w-[800px] h-[600px] flex flex-col 
                        shadow-xl shadow-black/20 border border-white/10 items-center justify-center text-white/50">
                        <FaRobot className="text-6xl mb-4" />
                        <p className="text-xl">Select an agent to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
}