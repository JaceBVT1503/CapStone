import type { TaskId } from "./types";

export type RoleId = TaskId;
export type ChatMode = "role" | "no-role";

export const TASKS: { id: TaskId; label: string; description: string }[] = [
  {
    id: "explain-concept",
    label: "Explain something you know well",
    description: "Help me explain something I'm knowledgeable about. I will explain a concept or subject to you, and you should help me present it clearly.",
  },
  {
    id: "investment-portfolio",
    label: "Develop an investment portfolio",
    description: "Create an investment portfolio strategy with specific recommendations.",
  },
  {
    id: "mobile-app",
    label: "Design a mobile app idea",
    description: "Design and conceptualize a mobile application idea.",
  },
  {
    id: "fitness-program",
    label: "Design a fitness program",
    description: "Create a fitness program tailored to specific goals.",
  },
  {
    id: "photosynthesis",
    label: "Explain Photosynthesis",
    description: "Provide an explanation of photosynthesis.",
  },
];

export const TASK_ROLES: Record<TaskId, string> = {
  "explain-concept": "Editor",
  "investment-portfolio": "Financial Planner",
  "mobile-app": "Mobile app developer",
  "fitness-program": "Personal Trainer",
  "photosynthesis": "Beginner-friendly science teacher",
};

export const BASE_SYSTEM_PROMPT =
  "IMPORTANT: Format all your responses in plain text only. Do not use markdown formatting (no ###, **, --, *, etc.). Use simple punctuation and line breaks instead.";

export function getSystemPrompt(
  mode: ChatMode,
  taskId: TaskId | null | undefined
): string {
  if (mode !== "role" || !taskId) return BASE_SYSTEM_PROMPT;

  const role = TASK_ROLES[taskId];
  return `Act like a ${role} and help me with this task. IMPORTANT: Format all your responses in plain text only. Do not use markdown formatting (no ###, **, --, *, etc.). Use simple punctuation and line breaks instead.`;
}
