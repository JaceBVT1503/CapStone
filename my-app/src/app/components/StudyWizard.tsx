"use client";

import styles from "@/app/page.module.css";
import { useEffect, useRef, useMemo } from "react";
import { useStudyStore } from "@/store/study-store";
import type { WizardStep } from "@/lib/types";
import InitialPrompt from "./InitialPrompt";
import ChatSection from "./ChatSection";
import { Chat } from "openai/resources/index";

function getProgress(step: WizardStep): number {
  switch (step) {
    case "initial-prompt":
      return 0;
    case "chat-section":
      return 1;
    case "survey-section":
      return 2;
    case "second-prompt":
      return 3;
    case "second-chat":
      return 4;
    case "second-survey":
      return 5
    default:
      return 0;
  }
}

export default function StudyWizard() {
  const currentStep = useStudyStore((s) => s.currentStep);
  const setStep = useStudyStore((s) => s.setStep);
  const progressIndex = getProgress(currentStep);

  return (
    <div className={styles.page}>
      {currentStep == "initial-prompt" && (
        <InitialPrompt />
      )}
      {currentStep == "chat-section" && (
        <ChatSection />
      )}
    </div>
  );
}