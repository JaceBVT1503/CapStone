"use client";

import { create } from "zustand";
import type {
    Participant,
    AIStudy,
    SurveyResponse,
    WizardStep,
    TaskId,
} from "@/lib/types";

interface StudyState {
    currentStep: WizardStep;
    setStep: (step: WizardStep) => void;

    participant: Participant | null;
    setParticipant: (participant: Participant) => void;
    updateParticipant: (updates: Partial<Participant>) => void;

    selectedTasks: [TaskId, TaskId] | null;
    setSelectedTasks: (tasks: [TaskId, TaskId]) => void;

    currentTaskIndex: number; // 0 or 1
    setCurrentTaskIndex: (index: number) => void;

    currentTaskId: TaskId | null;
    setCurrentTaskId: (taskId: TaskId | null) => void;

    currentChatHistory: Array<{ role: "user" | "assistant"; content: string }>;
    addChatMessage: (role: "user" | "assistant", content: string) => void;
    clearChatHistory: () => void;

    currentSurveyResponses: Partial<SurveyResponse>;
    setSurveyResponse: (key: keyof SurveyResponse, value: any) => void;
    clearSurveyResponses: () => void;
}

export const useStudyStore = create<StudyState>((set, get) => ({
    currentStep: "initial-prompt",
    setStep: (step) => set({ currentStep: step }),

    participant: null,
    setParticipant: (participant) => set({ participant }),
    updateParticipant: (updates) =>
        set((state) => ({
            participant: state.participant ? { ...state.participant, ...updates } : null,
        })),

    selectedTasks: null,
    setSelectedTasks: (tasks) => set({ selectedTasks: tasks }),

    currentTaskIndex: 0,
    setCurrentTaskIndex: (index) => set({ currentTaskIndex: index }),

    currentTaskId: null,
    setCurrentTaskId: (taskId) => set({ currentTaskId: taskId }),

    currentChatHistory: [],
    addChatMessage: (role, content) =>
        set((state) => ({
            currentChatHistory: [
                ...state.currentChatHistory,
                { role, content },
            ],
        })),
    clearChatHistory: () => set({ currentChatHistory: [] }),

    currentSurveyResponses: {},
    setSurveyResponse: (key, value) =>
        set((state) => ({
            currentSurveyResponses: {
                ...state.currentSurveyResponses,
                [key]: value,
            },
        })),
    clearSurveyResponses: () => set({ currentSurveyResponses: {} }),
}));