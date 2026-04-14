

export interface Participant {
    name: string;
    grade: string;
    major: string;
    aiUse: boolean;
    taskOne: AIStudy | null;
    taskTwo: AIStudy | null;
}

export interface AIStudy {
    taskId: TaskId;
    role: string | null; // null for second task (no role)
    initialQuestion: string;
    chatHistory: ChatHistoryItem[];
    surveyResponses: SurveyResponse;
}

export interface ChatHistoryItem {
    role: "user" | "assistant";
    content: string;
    highlights?: Highlight[];
}

export interface Highlight {
    id: string;
    messageId: string;
    text: string;
    comment: string;
}

export interface SurveyResponse {
    finalAnswer: string; // file path or content
    helpfulness: number; // 1-10
    clarity: number; // 1-10
    confidence: number; // 1-10
    understanding: number; // 1-10
    speed: number; // 1-10
    satisfaction: number; // 1-10
    likelyToUse: number; // 1-10
    highlightHelpfulness?: number; // 1-10, optional
    highlightReason?: string; // why they highlighted
}

export type WizardStep = 
    | "initial-prompt"
    | "chat-section"
    | "survey-section"
    | "completion";

export type grade = 'freshman' | 'sophomore' | 'junior' | 'senior' | 'other';
export type TaskId = 
    | 'explain-concept'
    | 'investment-portfolio'
    | 'mobile-app'
    | 'fitness-program'
    | 'photosynthesis';
