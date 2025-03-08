'use client';
import { useState, useCallback } from 'react';
import { FaChevronRight } from 'react-icons/fa';
enum Lesson {
    LESSON_1 = "Lesson 1",
    LESSON_2 = "Lesson 2",
    LESSON_3 = "Lesson 3",
}

const parseLesson = (xmlString: string) => {
    // Remove markdown code block markers and clean up the string
    const cleanXml = xmlString.replace(/```/g, '').trim();

    const titleMatch = cleanXml.match(/<lesson_title>(.*?)<\/lesson_title>/s);
    const contentMatch = cleanXml.match(/<lesson_content>(.*?)<\/lesson_content>/s);

    return {
        title: titleMatch ? titleMatch[1].trim() : '',
        content: contentMatch ? contentMatch[1].trim() : ''
    };
};

export default function Lessons() {
    const [currentLesson, setCurrentLesson] = useState(0);
    const [lessonData, setLessonData] = useState<{ title: string; content: string }>({ title: '', content: '' });
    const [loading, setLoading] = useState(false);

    const totalLessons = 1;

    const userData = JSON.parse(localStorage?.getItem('userData') || '{}');
    console.log(userData);

    const requestLessons = useCallback(async (lesson: Lesson) => {
        try {
            setLoading(true);
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: `I am a ${userData.ageGroup} ${userData.learningStyle} ${userData.experienceLevel}, "Start ${lesson}"`,
                    agentId: '7accb91f-3953-0421-9a2a-6eb46708451e',
                }),
            });
            const data = await response.json();
            const parsedLesson = parseLesson(data[0].text);
            setLessonData(parsedLesson);
            setLoading(false);
        } catch (error) {
            console.error('Error requesting lessons:', error);
        }
    }, [userData.ageGroup, userData.learningStyle, userData.experienceLevel]);

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
            <div className="cyber-box w-full max-w-5xl min-h-[60vh] p-16 mb-8">
                {loading ? (
                    <div className="flex items-center justify-center h-[40vh]">
                        <div className="text-xl text-gray-400">Loading lesson content...</div>
                    </div>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold mb-8 neon-text">
                            {lessonData.title}
                        </h1>
                        <div className="prose prose-invert whitespace-pre-line">
                            {lessonData.content}
                        </div>
                    </>
                )}
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

                <button
                    onClick={() => requestLessons(Lesson.LESSON_1)}
                    className={`neon-button px-8 py-3 rounded-lg font-semibold text-base inline-flex items-center gap-2
            ${currentLesson === totalLessons - 1 ? 'opacity-50' : 'hover:opacity-90'}`}
                >
                    Start Lesson
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
}