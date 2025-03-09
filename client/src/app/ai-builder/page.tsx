'use client';
import { SONIC_CHARACTER } from '../constant';
import { useEffect, useState } from 'react';
import { FaRobot, FaPlus, FaCog } from 'react-icons/fa';
import CreateAgentModal from '../components/CreateAgentModal';
import EditAgentModal from '../components/EditAgentModal';
import { toast } from "sonner"
import Chat from '../components/Chat';

interface Agent {
    agentId: string;
    agentName: string;
    secrets?: Record<string, unknown>[];
}

export default function AIBuilder() {
    const [agents, setAgents] = useState<Agent[]>([]);
    const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingAgent, setEditingAgent] = useState<null | Agent>(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAgents = async () => {
            const response = await fetch("/api/get-agents");
            const data = await response.json();
            console.log(data);
            setAgents(data.agents);
        }
        fetchAgents();
    }, []);

    const createAgent = async (agentData: { agentName: string; secrets: Record<string, unknown>[] }) => {
        toast.info("Creating agent...")
        const data = {
            userId: "123",
            agentName: agentData.agentName,
            secrets: agentData.secrets,
            characterJson: SONIC_CHARACTER
        }
        try {
            const response = await fetch("/api/create-agent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const res = await response.json();
            if (res.success) {
                toast.success("Agent created successfully")
                console.log("Agent created with ID:", res.agentId);
                return res.agent;
            } else {
                toast.error("Error creating agent")
                console.error("Error:", res.error);
                return false;
            }
        } catch (error) {
            toast.error("Error creating agent")
            console.error("Error:", error);
            return false;
        }
    }

    const selectedAgent = agents.find(agent => agent.agentId === selectedAgentId);

    const handleCreateAgent = async (agentData: { agentName: string; secrets: Record<string, unknown>[] }) => {
        const agent = await createAgent(agentData);
        if (agent) {
            const fetchAgents = async () => {
                const response = await fetch("/api/get-agents");
                const data = await response.json();
                setAgents(data.agents);
            }
            fetchAgents();
        }
    };

    const handleEditAgent = (agentData: Agent) => {
        setAgents(agents.map(agent =>
            agent.agentId === agentData.agentId ? { ...agent, ...agentData } : agent
        ));
    };

    const openEditModal = (agent: Agent) => {
        setEditingAgent(agent);
        setIsEditModalOpen(true);
    };

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        // Add user message to chat
        setMessages(prev => [...prev, { text: message, isUser: true }]);
        setLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message,
                    agentId: selectedAgentId
                }),
            });

            const data = await response.json();

            // Add agent responses to chat
            data.forEach((msg: { text: string }) => {
                setMessages(prev => [...prev, { text: msg.text, isUser: false }]);
            });
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
            setMessage('');
        }
    }


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
                            onClick={() => setIsCreateModalOpen(true)}
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
                                    key={agent.agentId}
                                    className={`w-full p-4 rounded-xl transition-all duration-300
                                    flex items-center gap-3 border group ${selectedAgentId === agent.agentId
                                            ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                                            : 'bg-white/5 border-white/5 text-white hover:bg-white/10 hover:border-blue-500/50'
                                        }`}
                                >
                                    <button
                                        className="flex-1 flex items-center gap-3"
                                        onClick={() => {
                                            setSelectedAgentId(agent.agentId);
                                            setMessages([]);
                                        }}
                                    >
                                        <FaRobot className={selectedAgentId === agent.agentId ? 'text-blue-400' : 'text-cyan-400'} />
                                        <span className="font-medium">{agent.agentName}</span>
                                    </button>
                                    <button
                                        className={`p-2 rounded-lg transition-all duration-300 
                                        ${selectedAgentId === agent.agentId
                                                ? 'text-blue-400 hover:bg-blue-500/20'
                                                : 'text-gray-400 hover:text-cyan-400 hover:bg-white/10'
                                            }`}
                                        onClick={() => openEditModal(agent)}
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
                    <Chat
                        name={selectedAgent.agentName}
                        messages={messages}
                        sendMessage={sendMessage}
                        loading={loading}
                        setMessage={setMessage}
                        message={message}
                    />
                ) : (
                    <div className="bg-gray-800/50 rounded-2xl w-[800px] h-[600px] flex flex-col 
                        shadow-xl shadow-black/20 border border-white/10 items-center justify-center text-white/50">
                        <FaRobot className="text-6xl mb-4" />
                        <p className="text-xl">Select an agent to start chatting</p>
                    </div>
                )}
            </div>
            <CreateAgentModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateAgent}
            />
            <EditAgentModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleEditAgent}
                agent={editingAgent}
            />
        </div>
    );
}