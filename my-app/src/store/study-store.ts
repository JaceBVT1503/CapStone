"use client";

import { create } from "zustand";

import type {
    Participant,
    AIStudy,
    AIHistory,
    ChatMessage,
    WizardStep,
    SurveyResponse,
} from "@/lib/types";



const getProgress = (state: StudyState, step: Number) => {
  switch (step) {
    case 1:
      return {currentStudy: state.studyOne};
    case 2:
      return {currentStudy: state.studyTwo};
    default:
      return state;
  }
}

type StudyState = {

    userObj: Participant | null;
    studyOne: AIStudy | null;
    studyTwo: AIStudy | null;
    currentStep: WizardStep;

    studyNum: number;
    currentStudy: AIStudy | null;

    currentSurveyResponse: SurveyResponse | null;

    
    
}

type StudyAction = {
    setStep: (step: StudyState['currentStep']) => void;
    setUserObj: (user: StudyState['userObj']) => void;
    setStudyOneObj: (studyOne: StudyState['studyOne']) => void;
    setStudyTwoObj: (studyTwo: StudyState['studyTwo']) => void;

    setStudyObj: (studyObj: AIStudy) => void;

    setStudyNum: (num: number) => void;
    setCurrentStudy: (studyNum: number) => void;

    setCurrentSurveyResponse: (key: keyof SurveyResponse, value: any) => void;

    setSurveyToStudy: (survey: SurveyResponse) => void;
}


export const useStudyStore = create<StudyState & StudyAction>((set, get) => ({

    currentStep: "initial-prompt",
    userObj: null,
    studyOne: null,
    studyTwo: null,
    currentStudy: null,
    studyNum: 1,

    currentSurveyResponse: null,


    



    setStep: (step) => set(() => ({ currentStep: step })),
    setUserObj: (user) => set({ userObj: user }),
    setStudyOneObj: (studyObj) => set({ studyOne: studyObj }),
    setStudyTwoObj: (studyObjTwo) => set({ studyTwo: studyObjTwo }),


    setStudyObj: (studyObj) => set((state) => {
      return state.studyNum === 1
        ? { studyOne: studyObj, currentStudy: studyObj }
        : { studyTwo: studyObj, currentStudy: studyObj };
    }),

    setStudyNum: (num) => set(() => ({ studyNum: num })),
    setCurrentStudy: (studyNum) => set((state) => getProgress(state, studyNum)),

    setCurrentSurveyResponse: (key, value) =>
        set((state) => ({
            currentSurveyResponse: {
                ...(state.currentSurveyResponse || {}),
                [key]: value,
            },
        })),

    setSurveyToStudy: (survey) => set((state) => {
      const study = state.currentStudy;
      if (!study) return {};
      const updated = { ...study, surveyResponse: survey };
      return { currentStudy: updated };
    }),


}));