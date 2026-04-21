"use client";

import styles from "@/app/page.module.css";
import { useEffect, useRef, useMemo, useState } from "react";
import { useStudyStore } from "@/store/study-store";
import type { WizardStep } from "@/lib/types";
import InitialPrompt from "./InitialPrompt";
import ChatSection from "./ChatSection";
import SurveySection from "./SurveySection";
import CompletionPage from "./CompletionPage";



export default function StudyWizard() {
  const currentStep = useStudyStore((s) => s.currentStep);
  const studyNum = useStudyStore((s) => s.studyNum);

  

  return (
    <div className={styles.page}>

      {currentStep == "initial-prompt" && (
        <InitialPrompt studyNum={studyNum}/>
      )}
      {currentStep == "chat-section" && (
        <ChatSection studyNum={studyNum}/>
      )}
      {currentStep == "survey-section" && (
        <SurveySection studyNum={studyNum}/>
      )}
      {currentStep == "completion-page" && (
        <CompletionPage />
      )}
    </div>
  );
}