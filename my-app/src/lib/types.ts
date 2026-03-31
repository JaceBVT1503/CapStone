

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
    task: task;
    history: AIHistory;
}

export interface AIHistory {
    task: task;
    initialQuestion: string;
    followQuestion: string | null;
    history: ChatHistory[];
}

export interface ChatHistory {
    prompt: string;
    response: string;
    hightlight: string;
    comment: string;
}


export type WizardStep = 
    | "initial-prompt"
    | "chat-section"
    | "survey-section"
    | "second-prompt"
    | "second-chat"
    | "second-survey";


export type grade = 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Other';
export type task = 'EmailRecruiter' | 'ConceptExplain' | 'InvestmentPortfolio';
