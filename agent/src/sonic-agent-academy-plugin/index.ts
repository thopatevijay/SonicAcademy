import type { Plugin } from "@elizaos/core";
// import { userLessonProvider } from "./providers/userLessonProvider.ts";
import { createLesson } from "./actions/createLesson.ts";

export const sonicAgentAcademyPlugin: Plugin = {
    name: "sonicAgentAcademy",
    description: "Sonic Agent Academy plugin",
    actions: [createLesson],
    clients: [],
    // comment out for now
    // providers: [userLessonProvider],
};

export default sonicAgentAcademyPlugin;