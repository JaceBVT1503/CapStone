
import {GoogleGenAI} from '@google/genai';



export interface Participant {
    name: string;
    grade: string;
    major: string;
    aiUse: boolean;
    studyOne: AIStudy | null;
    studyTwo: AIStudy | null;
}

export interface AIStudy {
    codeVer: string;
    company: string;
    aiModel: string;
    mode: string;
    task: string;
    history: AIHistory;
    surveyResponse: SurveyResponse | null;
}

export interface AIHistory {
    task: string;
    initialQuestion: string;
    messageLog: ChatMessage[] | null;
}

export interface ChatMessage {
    content: string;
    role: string;
    hightlight: string | null;
    comment: string | null;
    id: string | null;
    time: number | null;
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
    | "second-prompt"
    | "second-chat"
    | "second-survey"
    | "completion-page";


export type grade = 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Other';
export type task = 'EmailRecruiter' | 'ConceptExplain' | 'InvestmentPortfolio';
