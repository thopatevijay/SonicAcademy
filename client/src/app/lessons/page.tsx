'use client';
import { useState, useCallback, useEffect } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { Lesson, TOTAL_LESSONS } from '../constant';
import { usePrivy } from '@privy-io/react-auth';

interface LessonData {
    title: string;
    content: string;
}

interface UserData {
    ageGroup: string;
    learningStyle: string;
    experienceLevel: string;
}

type NavigationDirection = 'next' | 'previous';
interface LessonState {
    current: number;
    data: LessonData;
    loading: boolean;
}

const parseLesson = (xmlString: string): LessonData => {
    const cleanXml = xmlString.replace(/```/g, '').trim();
    const titleMatch = cleanXml.match(/<lesson_title>([\s\S]*?)<\/lesson_title>/);
    const contentMatch = cleanXml.match(/<lesson_content>([\s\S]*?)<\/lesson_content>/);

    return {
        title: titleMatch?.[1]?.trim() ?? '',
        content: contentMatch?.[1]?.trim() ?? ''
    };
};

// Navigation button component
const NavigationButton = ({
    direction,
    disabled,
    onClick,
    currentLesson,
    totalLessons
}: {
    direction: NavigationDirection;
    disabled: boolean;
    onClick: () => void;
    currentLesson: number;
    totalLessons: number;
}) => (
    <button
        onClick={onClick}
        className={`neon-button px-8 py-3 rounded-lg font-semibold text-base inline-flex items-center gap-2 text-white
            ${disabled ? 'opacity-50' : 'hover:opacity-90'}`}
        disabled={disabled}
    >
        {direction === 'previous' ? (
            <>
                <FaChevronLeft />
                Previous Lesson
            </>
        ) : (
            <>
                {currentLesson === totalLessons ? 'Go to AI Builder' : 'Next Lesson'}
                <FaChevronRight />
            </>
        )}
    </button>
);

export default function Lessons() {
    const router = useRouter();
    const [lessonState, setLessonState] = useState<LessonState>({
        current: 0,
        data: { title: '', content: '' },
        loading: false
    });
    const [userData, setUserData] = useState<UserData>({ ageGroup: '', learningStyle: '', experienceLevel: '' });
    const { user, ready, authenticated } = usePrivy();

    const requestLessons = useCallback(async (lesson: Lesson) => {
        try {
            setLessonState(prev => ({ ...prev, loading: true }));
            const response = await fetch('/api/create-lesson', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: `I am a ${userData.ageGroup} ${userData.learningStyle} ${userData.experienceLevel}, "Start ${lesson}"`,
                }),
            });

            if (!response.ok) throw new Error('Failed to fetch lesson');

            const data = await response.json();
            setLessonState(prev => ({
                ...prev,
                data: parseLesson(data[0].text),
                loading: false
            }));
        } catch (error) {
            console.error('Error requesting lessons:', error);
            setLessonState(prev => ({ ...prev, loading: false }));
        }
    }, [userData]);

    useEffect(() => {
        if (ready && !authenticated) {
            router.push("/");
            return;
        }

        const initializeLesson = async () => {
            if (user?.id) {
                const response = await fetch(`/api/get-user?userId=${user.id}`);
                const data = await response.json();
                setUserData(data.user);

                if (lessonState.current === 0) {
                    requestLessons(Lesson.LESSON_1);
                    setLessonState(prev => ({ ...prev, current: 1 }));
                }
            }
        };

        initializeLesson();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id, router, requestLessons, ready, authenticated, lessonState.current]);

    const handleLessonNavigation = (direction: NavigationDirection) => {
        if (lessonState.current === TOTAL_LESSONS && direction === 'next') {
            router.push('/ai-builder');
            return;
        }

        const nextLesson = direction === 'next'
            ? (lessonState.current % TOTAL_LESSONS) + 1
            : ((lessonState.current - 2 + TOTAL_LESSONS) % TOTAL_LESSONS) + 1;

        requestLessons(Lesson[`LESSON_${nextLesson}` as keyof typeof Lesson]);
        setLessonState(prev => ({ ...prev, current: nextLesson }));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full p-8 bg-gradient-to-b from-gray-900 to-black">
            {/* Progress Bar */}
            <div className="w-full max-w-5xl mb-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Progress</span>
                    <span className="text-sm text-gray-400">
                        {lessonState.current}/{TOTAL_LESSONS} Lessons
                    </span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-bar-fill h-2 transition-all duration-300"
                        style={{ width: `${((lessonState.current) / TOTAL_LESSONS) * 100}%` }}
                    />
                </div>
            </div>

            {/* Lesson Content */}
            <div className="cyber-box w-full max-w-5xl min-h-[60vh] p-16 mb-8">
                {lessonState.loading ? (
                    <div className="flex items-center justify-center h-[40vh]">
                        <div className="text-xl text-white">Crafting your mission… Get ready to explore!</div>
                    </div>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold mb-8 neon-text text-white">
                            {lessonState.data.title}
                        </h1>
                        <div className="prose prose-invert whitespace-pre-line text-white">
                            {lessonState.data.content}
                        </div>
                    </>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between w-full max-w-5xl">
                <NavigationButton
                    direction="previous"
                    disabled={lessonState.current <= 1 || lessonState.loading}
                    onClick={() => handleLessonNavigation('previous')}
                    currentLesson={lessonState.current}
                    totalLessons={TOTAL_LESSONS}
                />
                <NavigationButton
                    direction="next"
                    disabled={lessonState.loading}
                    onClick={() => handleLessonNavigation('next')}
                    currentLesson={lessonState.current}
                    totalLessons={TOTAL_LESSONS}
                />
            </div>
        </div>
    );
}