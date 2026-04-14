"use client";

import { useState } from "react";
import { useStudyStore } from "@/store/study-store";
import styles from "@/app/page.module.css";
import { TASKS } from "@/lib/prompts";
import type { TaskId } from "@/lib/types";
import type { Participant } from "@/lib/types";

const GRADE_OPTIONS = [
  { id: "freshman", label: "Freshman" },
  { id: "sophomore", label: "Sophomore" },
  { id: "junior", label: "Junior" },
  { id: "senior", label: "Senior" },
  { id: "other", label: "Other" },
];

const AI_EXPERIENCE_OPTIONS = [
  { id: "yes", label: "Yes" },
  { id: "no", label: "No" },
];

function isUserInfoComplete(userInfo: {
  name?: string;
  grade?: string;
  major?: string;
  aiExperience?: string;
} | null | undefined) {
  const { name, grade, major, aiExperience } = userInfo ?? {};
  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedMajor = typeof major === "string" ? major.trim() : "";
  const gradeSet = new Set(GRADE_OPTIONS.map((g) => g.id));

  const isValidGrade = typeof grade === "string" && gradeSet.has(grade);
  const isValidAiExperience = aiExperience === "yes" || aiExperience === "no";

  return Boolean(trimmedName && trimmedMajor && isValidGrade && isValidAiExperience);
}

function selectRandomTasks(): [TaskId, TaskId] {
  const shuffled = [...TASKS].sort(() => Math.random() - 0.5);
  return [shuffled[0].id, shuffled[1].id];
}

export default function InitialPrompt() {
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [major, setMajor] = useState("");
  const [aiExperience, setAiExperience] = useState("");
  const [isSending, setIsSending] = useState(false);

  const setStep = useStudyStore((s) => s.setStep);
  const setParticipant = useStudyStore((s) => s.setParticipant);
  const setCurrentTaskIndex = useStudyStore((s) => s.setCurrentTaskIndex);
  const setCurrentTaskId = useStudyStore((s) => s.setCurrentTaskId);
  const setSelectedTasks = useStudyStore((s) => s.setSelectedTasks);
  const clearChatHistory = useStudyStore((s) => s.clearChatHistory);
  const clearSurveyResponses = useStudyStore((s) => s.clearSurveyResponses);

  const isUserInfoCompleteValue = isUserInfoComplete({
    name,
    grade,
    major,
    aiExperience,
  });

  async function handleStart() {
    setError(null);

    if (!isUserInfoCompleteValue) {
      setError("Please complete all required fields.");
      return;
    }

    setIsSending(true);

    try {
      // Select random tasks
      const [taskOne, taskTwo] = selectRandomTasks();

      // Create participant record
      const participant: Participant = {
        name: name.trim(),
        grade,
        major: major.trim(),
        aiUse: aiExperience === "yes",
        taskOne: null,
        taskTwo: null,
      };

      // Save to store
      setParticipant(participant);
      setSelectedTasks([taskOne, taskTwo]);
      setCurrentTaskIndex(0);
      setCurrentTaskId(taskOne);
      clearChatHistory();
      clearSurveyResponses();

      // Move to chat section for first task
      setStep("chat-section");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unexpected error starting experiment.";
      setError(msg);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.titleBlock}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>AI Chatbot Study</h1>
              <span className={styles.badge}>Setup</span>
            </div>
            <p className={styles.subtitle}>
              Please complete the fields below to begin the experiment. Enter your information. 
              When everything is filled out, continue to start.
            </p>
          </div>
        </header>

        {error ? (
          <div className={styles.errorBanner} role="alert">
            <strong className={styles.errorTitle}>Error</strong>
            <span className={styles.errorText}>{error}</span>
          </div>
        ) : null}

        <section className={styles.chat}>
          <div className={styles.setupForm}>
            <div className={styles.setupSection}>
              <h2 className={styles.sectionTitle}>Your Information</h2>

              <div className={styles.configGroup}>
                <label className={styles.configLabel} htmlFor="nameInput">
                  Name
                </label>
                <input
                  id="nameInput"
                  className={styles.textarea}
                  value={name}
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSending}
                  required
                  type="text"
                />
              </div>

              <div className={styles.configGroup}>
                <label className={styles.configLabel} htmlFor="gradeSelect">
                  Grade
                </label>
                <select
                  id="gradeSelect"
                  className={styles.select}
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  disabled={isSending}
                  required
                >
                  <option value="" disabled>
                    Select grade...
                  </option>
                  {GRADE_OPTIONS.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.configGroup}>
                <label className={styles.configLabel} htmlFor="majorInput">
                  Major
                </label>
                <input
                  id="majorInput"
                  className={styles.textarea}
                  value={major}
                  placeholder="Enter your major"
                  onChange={(e) => setMajor(e.target.value)}
                  disabled={isSending}
                  required
                  type="text"
                />
              </div>

              <div className={styles.configGroup}>
                <label className={styles.configLabel}>Have you used AI before?</label>
                <div className={styles.radioGroup}>
                  {AI_EXPERIENCE_OPTIONS.map((opt) => (
                    <label key={opt.id} className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="aiExperience"
                        value={opt.id}
                        checked={aiExperience === opt.id}
                        onChange={(e) => setAiExperience(e.target.value)}
                        disabled={isSending}
                        required
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button
              className={styles.primaryButton}
              type="button"
              onClick={handleStart}
              disabled={isSending || !isUserInfoCompleteValue}
            >
              {isSending ? "Starting Study…" : "Start Study"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
