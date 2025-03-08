'use client';
import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

const mockLessons = [
    {
        id: 1,
        title: "Introduction to Sonic Blockchain",
        content: "Welcome to your first lesson about Sonic blockchain technology...",
    },
];

export default function Lessons() {
    const [currentLesson, setCurrentLesson] = useState(0);
    const totalLessons = mockLessons.length;

    // To enable circular navigation:
    const handleNextLesson = () => {
        setCurrentLesson(prev => (prev + 1) % totalLessons);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full p-8">
            {/* Progress Bar */}
            <div className="w-full max-w-5xl mb-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Progress</span>
                    <span className="text-sm text-gray-400">
                        {currentLesson + 1}/{totalLessons} Lessons
                    </span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-bar-fill h-2 transition-all duration-300"
                        style={{ width: `${((currentLesson + 1) / totalLessons) * 100}%` }}
                    />
                </div>
            </div>

            {/* Lesson Content */}
            <div className="cyber-box w-full max-w-5xl min-h-[60vh] p-12 mb-8">
                <h1 className="text-3xl font-bold mb-8 neon-text">
                    {mockLessons[currentLesson].title}
                </h1>
                <div className="prose prose-invert">
                    {mockLessons[currentLesson].content}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between w-full max-w-5xl">
                <button
                    onClick={() => setCurrentLesson(prev => Math.max(0, prev - 1))}
                    className={`neon-button px-8 py-3 rounded-lg font-semibold text-base inline-flex items-center gap-2 
            ${currentLesson === 0 ? 'opacity-50' : 'hover:opacity-90'}`}
                    disabled={currentLesson === 0}
                >
                    Previous Lesson
                </button>

                <button
                    onClick={handleNextLesson}
                    className={`neon-button px-8 py-3 rounded-lg font-semibold text-base inline-flex items-center gap-2
            ${currentLesson === totalLessons - 1 ? 'opacity-50' : 'hover:opacity-90'}`}
                    disabled={currentLesson === totalLessons - 1}
                >
                    Next Lesson
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
}