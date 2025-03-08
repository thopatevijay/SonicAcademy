'use client';
import { useState, useCallback, useEffect } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export enum Lesson {
    LESSON_1 = "Lesson 1",
    LESSON_2 = "Lesson 2",
    LESSON_3 = "Lesson 3",
}

export const TOTAL_LESSONS = Object.keys(Lesson).length;

// Types
interface LessonData {
    title: string;
    content: string;
}

interface UserData {
    ageGroup: string;
    learningStyle: string;
    experienceLevel: string;
}

const parseLesson = (xmlString: string): LessonData => {
    const cleanXml = xmlString.replace(/```/g, '').trim();
    const titleMatch = cleanXml.match(/<lesson_title>(.*?)<\/lesson_title>/s);
    const contentMatch = cleanXml.match(/<lesson_content>(.*?)<\/lesson_content>/s);

    return {
        title: titleMatch?.[1]?.trim() ?? '',
        content: contentMatch?.[1]?.trim() ?? ''
    };
};

export default function Lessons() {
    const router = useRouter();
    const [currentLesson, setCurrentLesson] = useState(0);
    const [lessonData, setLessonData] = useState<LessonData>({ title: '', content: '' });
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState<UserData>({ ageGroup: '', learningStyle: '', experienceLevel: '' });

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage?.getItem('userData') ?? '{}');
        setUserData(storedUserData);
    }, []);

    const requestLessons = useCallback(async (lesson: Lesson) => {
        try {
            setLoading(true);
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: `I am a ${userData.ageGroup} ${userData.learningStyle} ${userData.experienceLevel}, "Start ${lesson}"`,
                    agentId: '7accb91f-3953-0421-9a2a-6eb46708451e',
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch lesson');
            }

            const data = await response.json();
            setLessonData(parseLesson(data[0].text));
        } catch (error) {
            console.error('Error requesting lessons:', error);
        } finally {
            setLoading(false);
        }
    }, [userData]);

    useEffect(() => {
        if (!userData.ageGroup) {
            return; // Don't redirect immediately, wait for userData to be loaded
        }

        if (currentLesson === 0) {
            requestLessons(Lesson.LESSON_1);
            setCurrentLesson(1);
        }
    }, [currentLesson, userData, router, requestLessons]);

    const handleLessonNavigation = (direction: 'next' | 'previous') => {
        if (currentLesson === TOTAL_LESSONS && direction === 'next') {
            router.push('/ai-builder');
            return;
        }

        const nextLesson = direction === 'next'
            ? (currentLesson % TOTAL_LESSONS) + 1
            : ((currentLesson - 2 + TOTAL_LESSONS) % TOTAL_LESSONS) + 1;

        requestLessons(Lesson[`LESSON_${nextLesson}` as keyof typeof Lesson]);
        setCurrentLesson(nextLesson);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full p-8">
            {/* Progress Bar */}
            <div className="w-full max-w-5xl mb-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Progress</span>
                    <span className="text-sm text-gray-400">
                        {currentLesson}/{TOTAL_LESSONS} Lessons
                    </span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-bar-fill h-2 transition-all duration-300"
                        style={{ width: `${((currentLesson) / TOTAL_LESSONS) * 100}%` }}
                    />
                </div>
            </div>

            {/* Lesson Content */}
            <div className="cyber-box w-full max-w-5xl min-h-[60vh] p-16 mb-8">
                {loading ? (
                    <div className="flex items-center justify-center h-[40vh]">
                        <div className="text-xl text-gray-400">Crafting your mission… Get ready to explore!</div>
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
                    onClick={() => handleLessonNavigation('previous')}
                    className={`neon-button px-8 py-3 rounded-lg font-semibold text-base inline-flex items-center gap-2 
            ${(currentLesson <= 1 || loading) ? 'opacity-50' : 'hover:opacity-90'}`}
                    disabled={currentLesson <= 1 || loading}
                >
                    Previous Lesson
                </button>

                <button
                    onClick={() => handleLessonNavigation('next')}
                    className={`neon-button px-8 py-3 rounded-lg font-semibold text-base inline-flex items-center gap-2
            ${(loading) ? 'opacity-50' : 'hover:opacity-90'}`}
                    disabled={loading}
                >
                    {currentLesson === TOTAL_LESSONS ? 'Go to AI Builder' : 'Next Lesson'}
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
}