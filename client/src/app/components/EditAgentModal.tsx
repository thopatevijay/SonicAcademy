'use client';
import { useState, useEffect } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';

interface EditAgentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (agentData: { agentId: string; agentName: string; description: string; secrets: Record<string, unknown>[] }) => void;
    agent: { agentId: string; agentName: string; description?: string; secrets?: Record<string, unknown>[] } | null;
}

export default function EditAgentModal({ isOpen, onClose, onSubmit, agent }: EditAgentModalProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [secrets, setSecrets] = useState<Record<string, unknown>[]>([{ key: '', value: '', visible: false }]);
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
            // Convert secrets object to array format
            if (agent.secrets) {
                const secretsArray = Object.entries(agent.secrets).map(([key, value]) => ({
                    key,
                    value,
                    visible: false,
                }));
                setSecrets(secretsArray);
            }
        }
    }, [agent]);

    if (!isOpen || !agent) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Convert secrets array back to object format
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const secretsObject = secrets.reduce((obj: any, { key, value }) => ({ ...obj, [key as string]: value }), {});
        onSubmit({ agentId: agent.agentId, agentName: name, description, secrets: secretsObject });
        onClose();
    };

    // const handleSecretChange = (index: number, field: string, value: string) => {
    //     const newSecrets = [...secrets];
    //     newSecrets[index][field] = value;
    //     setSecrets(newSecrets);
    // };

    // const toggleSecretVisibility = (index: number) => {
    //     const newSecrets = [...secrets];
    //     newSecrets[index].visible = !newSecrets[index].visible;
    //     setSecrets(newSecrets);
    // };

    // const removeSecret = (index: number) => {
    //     const newSecrets = [...secrets];
    //     newSecrets.splice(index, 1);
    //     setSecrets(newSecrets);
    // };

    // const addSecret = () => {
    //     setSecrets([...secrets, { key: '', value: '', visible: false }]);
    // };

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
                className="bg-gray-900 w-full min-h-screen border border-white/10 shadow-xl
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

                <div className="flex h-[calc(100vh-80px)]">
                    {/* Notice Card */}
                    <div className="w-1/2 p-6 border-r border-white/10 overflow-y-auto">
                        <div className="bg-gray-800/50 rounded-xl p-6 max-w-3xl mx-auto">
                            <div className="space-y-6">
                                <div className="border-l-4 border-yellow-500 pl-4">
                                    <h3 className="text-xl font-semibold text-yellow-500 mb-2">
                                        Feature Coming Soon
                                    </h3>
                                    <p className="text-gray-300">
                                        The edit functionality is currently under development. We&apos;re working hard to bring you this feature in a future update.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-lg font-medium text-white">What&apos;s Being Worked On:</h4>
                                    <ul className="list-disc ml-6 space-y-2 text-gray-300">
                                        <li>Secure agent configuration updates</li>
                                        <li>Secret management system</li>
                                        <li>Blockchain integration verification</li>
                                        <li>Real-time update validation</li>
                                    </ul>
                                </div>

                                <div className="bg-blue-500/10 rounded-lg p-4">
                                    <h4 className="text-blue-400 font-medium mb-2">Current Limitations</h4>
                                    <p className="text-gray-300">
                                        At this time, agent configurations can only be set during creation.
                                        To modify an agent&apos;s settings, please create a new agent with the desired configuration.
                                    </p>
                                </div>

                                {/* <div className="text-sm text-gray-400">
                                    <p>For any urgent changes, please delete the existing agent and create a new one with the updated configuration.</p>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    {/* Form Section - Disabled */}
                    <div className="w-1/2 overflow-y-auto opacity-50">
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-white mb-2">Agent Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3
                                    text-white focus:outline-none cursor-not-allowed"
                                    placeholder="Enter agent name"
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="block text-white mb-2">Secrets</label>
                                {secrets.map((secret, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={secret.key as string}
                                            className="flex-1 bg-gray-800 border border-white/10 rounded-xl px-4 py-3
                                            text-white focus:outline-none cursor-not-allowed"
                                            placeholder="Secret Key"
                                            disabled
                                        />
                                        <div className="relative flex-1">
                                            <input
                                                type="password"
                                                value={secret.value as string}
                                                className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3
                                                text-white focus:outline-none cursor-not-allowed"
                                                placeholder="Secret Value"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600/50 text-white px-6 py-2 rounded-lg cursor-not-allowed"
                                    disabled
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}