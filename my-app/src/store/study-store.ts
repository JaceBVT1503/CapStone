"use client";

import { create } from "zustand";

import type {
    Participant,
    AIStudy,
    AIHistory,
    ChatHistory,
    WizardStep,
} from "@/lib/types";

interface UserState {
    participant: Participant | null;
}

interface StudyState {
    currentStep: WizardStep;
    setStep: (step: WizardStep) => void;

    user: UserState;
    setUserInfo: (participant: UserState) => void;

}

export const useStudyStore = create<StudyState>((set, get) => ({
    currentStep: "initial-prompt",
    setStep: (step) => set({ currentStep: step }),
    user: null,
    setUserInfo: (participant) => set({ user: participant }),
}));