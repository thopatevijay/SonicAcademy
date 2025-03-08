import type { Action, IAgentRuntime, Memory, State } from "@elizaos/core";
import {
    composeContext,
    ModelClass,
    generateText,
} from "@elizaos/core";

// Updated lesson template with explicit instructions for detailed content
export const LESSON_TEMPLATE = `
You are SonicTutor, an AI educator for Sonic Agent Academy. Your task is to generate a detailed, personalized lesson for the user.

**Instructions:**
- Create a lesson titled "Lesson {{lessonId}}: {{lessonTopic}}".
- Tailor the content to the user's profile: age {{state.userProfile.age}}, learning ability {{state.userProfile.learningAbility}}.
- Include:
  - An engaging introduction to hook the user.
  - 3-5 key points with explanations and Sonic blockchain examples (e.g., basics, transactions, DeFAI).
  - A conclusion with a teaser for the next lesson.
- Use a friendly, educational tone and aim for 200-300 words.
- Respond ONLY with the markdown structure below, no additional text.

**Output Format:**
\`\`\`
<lesson>
  <lesson_title>Lesson {{lessonId}}: {{lessonTopic}}</lesson_title>
  <lesson_content>
    [Your detailed lesson content here]
  </lesson_content>
</lesson>
\`\`\`

**User Request:** "{{message.text}}"
`;

export const createLesson: Action = {
    name: "CREATE_LESSON",
    description: "Create a personalized, detailed lesson about the Sonic blockchain",
    similes: ["CREATE_LESSON", "START_LESSON", "LESSON"],
    validate: async (runtime: IAgentRuntime, message: Memory) => {
        return !!message.content.text.toLowerCase().includes("lesson");
    },
    suppressInitialMessage: true,
    handler: async (runtime, message, state, _options, callback) => {
        const lessonMatch = message.content.text.match(/lesson\s*(\d+)/i);
        const lessonId = lessonMatch ? `lesson${lessonMatch[1]}` : "lesson1";
        const lessonTopics = {
            lesson1: "Sonic Overview",
            lesson2: "What Makes Sonic Unique",
            lesson3: "Sonic Network Architecture",
            lesson4: " Introduction to Sonic Common Tools",
        };


        state.lessonId = lessonId;
        state.lessonTopic = lessonTopics[lessonId] || "Sonic Basics";
        state.message = message; // Ensure message.text is available
        if (!state.userProfile) {
            state.userProfile = { age: 3, learningAbility: "beginner" }; // Fetch real data here
        }

        const lessonContext = composeContext({
            state,
            template: LESSON_TEMPLATE,
        });

        const content = await generateText({
            runtime,
            context: lessonContext,
            modelClass: ModelClass.LARGE,
        });
        console.log("content", content);

        if (callback) {
            callback({ text: content, content: { success: true, lesson: content } });
        }
        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: { text: "Start Lesson 1" }
            },
            {
                user: "SonicTutor",
                content: {
                    text: `
                    \`\`\`
                    <lesson>
                      <lesson_title>Lesson 1: Sonic Overview</lesson_title>
                      <lesson_content>
                      Content for Lesson 1
                      </lesson_content>
                    </lesson>
                    \`\`\`
                    `
                }
            }
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "Start Lesson 2" }
            },
            {
                user: "SonicTutor",
                content: {
                    text: `
                    \`\`\`
                    <lesson>
                      <lesson_title>Lesson 2: What Makes Sonic Unique </lesson_title>
                      <lesson_content>
                      Content for Lesson 2
                      </lesson_content>
                    </lesson>
                    \`\`\`
                    `
                }
            }
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "Start Lesson 3" }
            },
            {
                user: "SonicTutor",
                content: {
                    text: `
                    \`\`\`
                    <lesson>
                      <lesson_title>Lesson 3: Sonic Network Architecture</lesson_title>
                      <lesson_content>
                      Content for Lesson 3
                      </lesson_content>
                    </lesson>
                    \`\`\`
                    `
                }
            }
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "Start Lesson 4" }
            },
            {
                user: "SonicTutor",
                content: {
                    text: `
                    \`\`\`
                    <lesson>
                      <lesson_title>Lesson 4: Introduction to Sonic Common Tools</lesson_title>
                      <lesson_content>
                      Content for Lesson 4
                      </lesson_content>
                    </lesson>
                    \`\`\`
                    `
                }
            }
        ]
    ],
};