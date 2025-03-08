import type { Provider, IAgentRuntime, Memory, State } from "@elizaos/core";

export const userLessonProvider: Provider = {
    async get(runtime: IAgentRuntime, message: Memory, _state?: State): Promise<string> {
        // Hardcoded user for testing
        const user = { age: 3, learningAbility: "beginner" };

        // Define a set of hardcoded lessons for testing variety
        const lessons = {
            lesson1: "Sonic Overview",
            lesson2: "What Makes Sonic Unique",
            lesson3: "Sonic Network Architecture",
            lesson4: " Introduction to Sonic Common Tools",
        };

        // Select lesson based on message content (for testing flexibility)
        const lessonMatch = message.content.text.match(/lesson\s*(\d+)/i);
        const lessonId = lessonMatch ? `lesson${lessonMatch[1]}` : "lesson1";
        const lesson = lessons[lessonId] || lessons["lesson1"];

        // Return structured JSON string with user and lesson data
        return JSON.stringify({ user, lesson });
    },
};