"use client";

import { useState, useEffect, useMemo } from "react";
import { useStudyStore } from "@/store/study-store";
import { createInitialPrompt } from "@/utils/prompt-generator";
import styles from "@/app/page.module.css";
import type { AIStudy, Participant, AIHistory, ChatMessage } from "@/lib/types";
import { Chat } from "openai/resources/index";

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

const FOLLOW_UPS: { id: string; label: string }[] = [
  { id: "MobileApp", label: "What would you like your app to focus on?" },
  { id: "ConceptCoach", label: "What is a subject that you know a lot about?" },
];

const TASKS: { id: string; label: string }[] = [
  { id: "ConceptCoach", label: "Explain something you know well" },
  { id: "InvestmentPortfolio", label: "Develop an investment portfolio" },
  { id: "MobileApp", label: "Design a mobile app idea" },
  { id: "FitnessProg", label: "Design a fitness program" },
  { id: "PlantHunger", label: "Explain Photosynthesis" },
];


interface InitialPromptParams {
  studyNum: number
};



export default function InitialPrompt({ studyNum }: InitialPromptParams) {


  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [major, setMajor] = useState("");
  const [aiExperience, setAiExperience] = useState("");
  const [firstTask, setFirstTask] = useState("");
  const [hasFollowUp, setHasFollowUp] = useState(false);
  const [followUpQuestion, setFollowUpQuestion] = useState("");
  const [followUpAnswer, setFollowUpAnswer] = useState("");
  const [isSending, setIsSending] = useState(false);

  const {
    userObj,
    studyOne,
    setUserObj,
    setStudyOneObj,
    setStep,
    setCurrentStudy,
    setStudyObj,
    setStudyNum,
  } = useStudyStore();

  const usedTaskId = studyNum === 2 ? studyOne?.task ?? "" : "";

  const availableTasks = useMemo(
    () => TASKS.filter((t) => t.id !== usedTaskId),
    [usedTaskId]
  );

  useEffect(() => {
    // Clear stale selection if it is no longer available
    if (firstTask && !availableTasks.some((t) => t.id === firstTask)) {
      setFirstTask("");
      setFollowUpAnswer("");
      setFollowUpQuestion("");
      setHasFollowUp(false);
    }
  }, [firstTask, availableTasks]);



  const requiresFollow = (prompt: String) => {
    const followUpVar = FOLLOW_UPS.find((f) => f.id === prompt);
    if (followUpVar) {
      setFollowUpQuestion(followUpVar.label);
      setHasFollowUp(true);
    }
    else {
      setFollowUpQuestion("");
      setHasFollowUp(false);
    }
  }



  const handleSetup = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setIsSending(true);

    if (studyNum === 1) {
      console.log("Its study 1");
      const userObj: Participant = {
        name: name,
        grade: grade,
        major: major,
        aiUse: aiExperience === "yes" ? true : false,
        studyOne: null,
        studyTwo: null,
      };
      setUserObj(userObj);
    }

    const aiMode =
      studyNum === 2 && studyOne?.mode
        ? (studyOne.mode === "plain" ? "role" : "plain")
        : (Math.random() < 0.5 ? "plain" : "role");

    const firstQuestion = createInitialPrompt(firstTask, followUpAnswer);



    const firstRes = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        message: firstQuestion,
        mode: aiMode,
        task: firstTask,
        history: null,
      }),
    });

    const aiResponse = await firstRes.json();
    console.log("Here is the first chat response:", aiResponse);

    const userChatObj: ChatMessage = {
      content: firstQuestion,
      role: "user",
      hightlight: null,
      comment: null,
      id: crypto.randomUUID(),
      time: Date.now(),
    }

    const aiChatObj: ChatMessage = {
      content: aiResponse.data,
      role: "model",
      hightlight: null,
      comment: null,
      time: Date.now(),
      id: crypto.randomUUID(),
    }


    const historyObj: AIHistory = {
      task: firstTask,
      initialQuestion: firstQuestion,
      messageLog: [userChatObj, aiChatObj],
    }

    const studyObj: AIStudy = {
      codeVer: "9fd6bcc-commit",
      company: "Google",
      aiModel: "gemini-3-flash-preview",
      mode: aiMode,
      task: firstTask,
      history: historyObj,
      surveyResponse: null,
    }


    setStudyNum(studyNum);
    setStudyObj(studyObj);
    //setCurrentStudy(studyNum);
    setStep("chat-section");
    setHasFollowUp(true);

  };


  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.titleBlock}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>AI Chatbot Experiment</h1>
              <span className={styles.badge}>Setup</span>
            </div>
            <p className={styles.subtitle}>{studyNum === 1 ? "In this study, you will complete two short tasks using an AI chatbot and then answer a brief survey about your experience. \n\n Please follow the steps on each page carefully. For each task, interact with the chatbot as naturally as you would if you were using AI for help. You may ask follow-up questions, request clarification, or continue the conversation until you feel you have enough information to answer the survey. \n\nYou will be asked to enter your final response to the chosen task, so please keep track of any key information, decisions, or answers you develop during your conversation with the chatbot.\n\nAfter each task, you will be asked to rate your experience based on factors such as helpfulness, clarity, satisfaction, and overall usefulness. There are no right or wrong answers. Please respond honestly based on your own experience.\n\nThe study should only take a few minutes to complete. Thank you for your time and feedback." : "Please select your second task below to continue the experiment. Once you have chosen a task, proceed to begin."}</p>
          </div>
        </header>

        {error ? (
          <div className={styles.errorBanner} role="alert">
            <strong className={styles.errorTitle}>Error</strong>
            <span className={styles.errorText}>{error}</span>
          </div>
        ) : null}

        <section className={styles.chat}>
          <form onSubmit={handleSetup}>
            <div className={styles.setupForm}>
              {studyNum === 1 && (
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
                    <label className={styles.configLabel}>Do you have experience with AI?</label>
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
              )}
              {/* <div className={styles.setupSection}>
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
              </div> */}

              <div className={styles.setupSection}>
                <h2 className={styles.sectionTitle}>Task Configuration</h2>

                <div className={styles.configGroup}>
                  <label className={styles.selectLabel} htmlFor="taskSelect">
                    Select One Task
                  </label>
                  <div className={styles.radioGroup}>
                    {availableTasks.map((r) => (
                      <label key={r.id} className={styles.radioLabel}>
                        <input
                          type="checkbox"
                          value={r.id}
                          checked={firstTask === r.id}
                          disabled={isSending}
                          onChange={(e) => {
                            const tempTask = e.target.value;
                            setFirstTask(tempTask);
                            requiresFollow(tempTask)
                          }}
                        >
                        </input>
                        <span>{r.label}</span>
                      </label>

                    ))}

                    {firstTask && hasFollowUp && (
                      <div key={firstTask} className={styles.configGroup}>
                        <label className={styles.configLabel} htmlFor={`followUp-${firstTask}`}>
                          {followUpQuestion}
                        </label>
                        <input
                          id={`followUp-${firstTask}`}
                          className={styles.textarea}
                          type="text"
                          value={followUpAnswer}
                          placeholder="Enter your answer..."
                          onChange={(e) =>
                            setFollowUpAnswer(e.target.value)
                          }
                          disabled={isSending}
                          required
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                className={styles.primaryButton}
                type="submit"
                disabled={isSending}
              >
                {isSending ? "Starting Experiment…" : "Start Experiment"}
              </button>
              {isSending && (
                <p className={styles.loadingDisclaimer}>
                  Loading. Please do not close or refresh this page.
                </p>
              )}
            </div>
          </form>
        </section>
      </main>
    </div>
  );



}