"use client";

import { useState } from "react";
import { useStudyStore } from "@/store/study-store";
import styles from "@/app/page.module.css";
import type { ChatMode, RoleId } from "@/lib/prompts";

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

const FOLLOW_UPS: { id: RoleId; label: string }[] = [
  { id: "EmailCoach", label: "What is a company that you would be interested in working at?" },
  { id: "ConceptCoach", label: "What is a subject that you know a lot about?" },
];

const ROLES: { id: RoleId; label: string }[] = [
  { id: "MathTutor", label: "Math Tutor" },
  { id: "WritingGrammarExpert", label: "Writing / Grammar Expert" },
  { id: "SeniorSoftwareEngineerDebugger", label: "Senior Software Engineer (Debugging)" },
  { id: "EmailCoach", label: "Write an email to a recruiter"},
  { id: "ConceptCoach", label: "Explain something you know well"},
  { id: "InvestmentPortfolio", label: "Develop an investment portfolio" },
];


function isUserInfoComplete(userInfo: {
  name?: string;
  grade?: string;
  major?: string;
  aiExperience?: string;
  tasks?: RoleId[];
} | null | undefined) {
  const { name, grade, major, aiExperience, tasks } = userInfo ?? {};
  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedMajor = typeof major === "string" ? major.trim() : "";
  const gradeSet = new Set(GRADE_OPTIONS.map((g) => g.id));

  const isValidGrade = typeof grade === "string" && gradeSet.has(grade);
  const isValidAiExperience = aiExperience === "yes" || aiExperience === "no";

  const isValidTasks = tasks && tasks.length === 2;
  

  return Boolean(trimmedName && trimmedMajor && isValidGrade && isValidAiExperience && isValidTasks);
}


export default function InitialPrompt() {

  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [major, setMajor] = useState("");
  const [aiExperience, setAiExperience] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [tasks, setStudyTasks] = useState<RoleId[]>([]);
  const [followUpAnswers, setFollowUpAnswers] = useState<Partial<Record<RoleId, string>>>({});
  const isUserInfoCompleteValue = isUserInfoComplete({ name, grade, major, aiExperience, tasks });

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.titleBlock}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>AI Chatbot Experiment</h1>
              <span className={styles.badge}>Setup</span>
            </div>
            <p className={styles.subtitle}>Configure the experiment and enter the initial prompt.</p>
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
                <label className={styles.configLabel}>AI Experience</label>
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

            <div className={styles.setupSection}>
              <h2 className={styles.sectionTitle}>Task Configuration</h2>

              <div className={styles.configGroup}>
                <label className={styles.selectLabel} htmlFor="taskSelect">
                  Select Two Tasks
                </label>
                <div className={styles.radioGroup}>
                  {ROLES.map((r) => (
                    <label key={r.id} className={styles.radioLabel}>
                      <input
                        type="checkbox"
                        value={r.id}
                        checked={tasks.includes(r.id)}
                        disabled={isSending}
                        onChange={(e) => {
                          const { value, checked } = e.target;
                          const roleId = value as RoleId;
                          setStudyTasks((prev) => {
                            if (checked) {
                              if (prev.length < 2) {
                                return [...prev, roleId];
                              }
                              return prev;
                            }
                            else {
                              return prev.filter((id) => id !== roleId);
                            }
                          })
                        }}
                      >
                      </input>
                      <span>{r.label}</span>
                    </label>

                  ))}
                </div>
              </div>
              {tasks.map((taskId) => {
                const followUp = FOLLOW_UPS.find((f) => f.id === taskId);
                if (followUp) {
                  return (
                    <div key={taskId} className={styles.configGroup}>
                      <label className={styles.configLabel} htmlFor={`followUp-${taskId}`}>
                        {followUp.label}
                      </label>
                      <input
                        id={`followUp-${taskId}`}
                        className={styles.textarea}
                        type="text"
                        value={followUpAnswers[taskId] || ""}
                        placeholder="Enter your answer..."
                        onChange={(e) =>
                          setFollowUpAnswers((prev) => ({
                            ...prev,
                            [taskId]: e.target.value,
                          }))
                        }
                        disabled={isSending}
                        required
                      />
                    </div>
                  );
                }
                return null;
              })}


            </div>

            <button
              className={styles.primaryButton}
              type="button"
              //onClick={handleSetup}
              disabled={isSending || !isUserInfoCompleteValue}
            >
              {isSending ? "Starting Experiment…" : "Start Experiment"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );



}