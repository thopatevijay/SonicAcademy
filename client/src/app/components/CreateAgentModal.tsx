'use client';
import { useState, useEffect } from 'react';
import { FaRobot, FaTimes, FaEye, FaEyeSlash, FaTrash, FaPlus } from 'react-icons/fa';

interface CreateAgentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (agentData: { agentName: string; secrets: Record<string, unknown>[] }) => void;
}

export default function CreateAgentModal({ isOpen, onClose, onSubmit }: CreateAgentModalProps) {
    const [name, setName] = useState('');
    const [secrets, setSecrets] = useState<Record<string, unknown>[]>([{ key: '', value: '', visible: true }]);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSubmit({ agentName: name, secrets: secrets.reduce((obj: any, { key, value }) => ({ ...obj, [key as string]: value }), {}) });
        setName('');
        setSecrets([{ key: '', value: '', visible: false }]);
        onClose();
    };

    const handleSecretChange = (index: number, field: string, value: string) => {
        const newSecrets = [...secrets];
        newSecrets[index][field] = value;
        setSecrets(newSecrets);
    };

    const toggleSecretVisibility = (index: number) => {
        const newSecrets = [...secrets];
        newSecrets[index].visible = !newSecrets[index].visible;
        setSecrets(newSecrets);
    };

    const removeSecret = (index: number) => {
        const newSecrets = [...secrets];
        newSecrets.splice(index, 1);
        setSecrets(newSecrets);
    };

    const addSecret = () => {
        setSecrets([...secrets, { key: '', value: '', visible: false }]);
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
                        Create New Agent
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
                        <label className="block text-white mb-2">Secrets</label>
                        {secrets.map((secret, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={secret.key as string}
                                    onChange={(e) => handleSecretChange(index, 'key', e.target.value)}
                                    className="flex-1 bg-gray-800 border border-white/10 rounded-xl px-4 py-3
                                    text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Secret Key"
                                />
                                <div className="relative flex-1">
                                    <input
                                        type={secret.visible ? "text" : "password"}
                                        value={secret.value as string}
                                        onChange={(e) => handleSecretChange(index, 'value', e.target.value)}
                                        className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3
                                        text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Secret Value"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => toggleSecretVisibility(index)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                    >
                                        {secret.visible ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeSecret(index)}
                                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-3 rounded-xl"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addSecret}
                            className="w-full mt-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl
                            flex items-center justify-center gap-2"
                        >
                            <FaPlus /> Add Secret
                        </button>
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
                            Create Agent
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}