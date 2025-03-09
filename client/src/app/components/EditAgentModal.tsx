'use client';
import { useState, useEffect } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';

interface EditAgentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (agentData: { agentId: string; agentName: string; description: string }) => void;
    agent: { agentId: string; agentName: string; description?: string } | null;
}

export default function EditAgentModal({ isOpen, onClose, onSubmit, agent }: EditAgentModalProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        }
    }, [isOpen]);

    useEffect(() => {
        if (agent) {
            setName(agent.agentName);
            setDescription(agent.description || '');
        }
    }, [agent]);

    if (!isOpen || !agent) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ agentId: agent.agentId, agentName: name, description });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-start justify-center z-50">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
                style={{ opacity: isAnimating ? 1 : 0 }}
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className="bg-gray-900 rounded-2xl w-[500px] border border-white/10 shadow-xl mt-20
                    transition-all duration-300 relative"
                style={{
                    transform: isAnimating ? 'translateY(0)' : 'translateY(-100%)',
                    opacity: isAnimating ? 1 : 0
                }}
            >
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-xl font-semibold flex items-center gap-3 text-white">
                        <FaRobot className="text-blue-400" />
                        Edit Agent
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-white mb-2">Agent Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3
                            text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter agent name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3
                            text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                            placeholder="Enter agent description"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg
                            transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}