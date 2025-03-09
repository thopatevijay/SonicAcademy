'use client';
import { useState, useEffect } from 'react';
import { FaRobot, FaTimes, FaRocket } from 'react-icons/fa';

interface OnBoardingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (agentData: { name: string; description: string }) => void;
}

export default function OnBoardingModal({ isOpen, onClose, onSubmit }: OnBoardingModalProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, description });
        setName('');
        setDescription('');
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
                        Onboarding
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <FaRocket className="text-blue-400" />
                        Tell Us About Your Mission
                    </h2>

                    <div>
                        <label className="block text-white mb-3">Which crew are you joining?</label>
                        <div className="space-y-2">
                            <label className="flex items-center space-x-3">
                                <input type="radio" name="ageGroup" value="Young Explorers" className="text-blue-500" required />
                                <span className="text-white">Young Explorers (Under 18)</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input type="radio" name="ageGroup" value="Rising Stars" className="text-blue-500" />
                                <span className="text-white">Rising Stars (18-25)</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input type="radio" name="ageGroup" value="Seasoned Voyagers" className="text-blue-500" />
                                <span className="text-white">Seasoned Voyagers (26-35)</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input type="radio" name="ageGroup" value="Master Navigators" className="text-blue-500" />
                                <span className="text-white">Master Navigators (36+)</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white mb-3">What&apos;s your learning superpower?</label>
                        <div className="space-y-2">
                            <label className="flex items-center space-x-3 opacity-50">
                                <input type="radio" name="learningStyle" value="Visual" className="text-blue-500" disabled />
                                <span className="text-white">I see it to believe it (Visual) (coming soon)</span>
                            </label>
                            <label className="flex items-center space-x-3 opacity-50">
                                <input type="radio" name="learningStyle" value="Auditory" className="text-blue-500" disabled />
                                <span className="text-white">I hear you loud and clear (Auditory) (coming soon)</span>
                            </label>
                            <label className="flex items-center space-x-3 opacity-50">
                                <input type="radio" name="learningStyle" value="Kinesthetic" className="text-blue-500" disabled />
                                <span className="text-white">I learn by doing (Kinesthetic) (coming soon)</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input type="radio" name="learningStyle" value="Reading/Writing" className="text-blue-500" required />
                                <span className="text-white">I read and write my way to knowledge (Reading/Writing)</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white mb-3">How familiar are you with the Sonic universe?</label>
                        <div className="space-y-2">
                            <label className="flex items-center space-x-3">
                                <input type="radio" name="experienceLevel" value="Beginner" className="text-blue-500" required />
                                <span className="text-white">New to the galaxy (Beginner)</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input type="radio" name="experienceLevel" value="Intermediate" className="text-blue-500" />
                                <span className="text-white">I&apos;ve orbited a few planets (Intermediate)</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input type="radio" name="experienceLevel" value="Advanced" className="text-blue-500" />
                                <span className="text-white">I&apos;m a seasoned space captain (Advanced)</span>
                            </label>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg
                            transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 text-lg font-semibold
                            flex items-center justify-center gap-2"
                        >
                            Start Your Journey
                            <FaRocket className="text-blue-300" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}