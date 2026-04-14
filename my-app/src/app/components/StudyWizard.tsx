"use client";

import styles from "@/app/page.module.css";
import { useEffect } from "react";
import { useStudyStore } from "@/store/study-store";
import type { WizardStep, TaskId } from "@/lib/types";
import InitialPrompt from "./InitialPrompt";
import ChatSection from "./ChatSection";
import SurveySection from "./SurveySection";
import CompletionPage from "./CompletionPage";

export default function StudyWizard() {
  const currentStep = useStudyStore((s) => s.currentStep);
  const currentTaskIndex = useStudyStore((s) => s.currentTaskIndex);
  const setStep = useStudyStore((s) => s.setStep);
  const setCurrentTaskIndex = useStudyStore((s) => s.setCurrentTaskIndex);
  const setCurrentTaskId = useStudyStore((s) => s.setCurrentTaskId);
  const participant = useStudyStore((s) => s.participant);
  const currentTaskId = useStudyStore((s) => s.currentTaskId);
  const updateParticipant = useStudyStore((s) => s.updateParticipant);
  const currentSurveyResponses = useStudyStore((s) => s.currentSurveyResponses);
  const clearChatHistory = useStudyStore((s) => s.clearChatHistory);
  const clearSurveyResponses = useStudyStore((s) => s.clearSurveyResponses);

  // Handle survey completion
  function handleSurveyComplete() {
    if (!participant) return;

    // Save current task's survey to participant
    if (currentTaskIndex === 0) {
      // First task complete - move to second task
      // Create AIStudy for task one
      const taskOneStudy = {
        taskId: currentTaskId as TaskId,
        role: "with-role", // First task uses role
        initialQuestion: "", // Would be set from actual initial message
        chatHistory: [],
        surveyResponses: currentSurveyResponses as any,
      };

      updateParticipant({
        taskOne: taskOneStudy,
      });

      // Move to second task
      setCurrentTaskIndex(1);
      clearChatHistory();
      clearSurveyResponses();

      // Get and set second task
      const selectedTasks = useStudyStore.getState().selectedTasks;
      if (selectedTasks) {
        setCurrentTaskId(selectedTasks[1]);
      }

      setStep("chat-section");
    } else {
      // Second task complete - show completion page
      const taskTwoStudy = {
        taskId: currentTaskId as TaskId,
        role: null,
        initialQuestion: "",
        chatHistory: [],
        surveyResponses: currentSurveyResponses as any,
      };

      updateParticipant({
        taskTwo: taskTwoStudy,
      });

      setStep("completion");
    }
  }

  if (currentStep === "initial-prompt") {
    return <InitialPrompt />;
  }

  if (currentStep === "chat-section") {
    return <ChatSection />;
  }

  if (currentStep === "survey-section") {
    return <SurveySection taskIndex={currentTaskIndex} onComplete={handleSurveyComplete} />;
  }

  if (currentStep === "completion") {
    return <CompletionPage />;
  }

  // Default fallback
  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <p>Loading...</p>
      </main>
    </div>
  );
}
