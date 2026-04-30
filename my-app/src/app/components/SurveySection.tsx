"use client";



import { useState, useEffect } from "react";
import { useStudyStore } from "@/store/study-store";
import styles from "@/app/page.module.css";
import type { SurveyResponse } from "@/lib/types";

interface SurveySectionParams {
  studyNum: number
};

const SURVEY_QUESTIONS = [
  {
    id: "helpfulness",
    label: "How helpful was the AI's response for completing the task?",
    scale: { min: 1, minLabel: "Not helpful at all", max: 10, maxLabel: "Extremely helpful" },
  },
  {
    id: "clarity",
    label: "How clear and easy was it to understand the AI's explanation?",
    scale: { min: 1, minLabel: "Very confusing", max: 10, maxLabel: "Extremely clear" },
  },
  {
    id: "confidence",
    label: "How confident are you that the AI's answer or explanation was correct?",
    scale: { min: 1, minLabel: "Not confident at all", max: 10, maxLabel: "Completely confident" },
  },
  {
    id: "understanding",
    label: "How much did the AI help you understand how to solve the problem?",
    scale: { min: 1, minLabel: "Did not help me understand", max: 10, maxLabel: "Helped me understand very well" },
  },
  {
    id: "speed",
    label: "How quickly did the AI help you reach a solution?",
    scale: { min: 1, minLabel: "Slowed me down", max: 10, maxLabel: "Helped me solve it very quickly" },
  },
  {
    id: "satisfaction",
    label: "Overall, how satisfied were you with the AI's response?",
    scale: { min: 1, minLabel: "Very dissatisfied", max: 10, maxLabel: "Very satisfied" },
  },
  {
    id: "likelyToUse",
    label: "If you had a similar task in the future, how likely would you be to use this AI response style again?",
    scale: { min: 1, minLabel: "Very unlikely", max: 10, maxLabel: "Very likely" },
  },
];

export default function SurveySection({ studyNum }: SurveySectionParams) {


  const [finalAnswer, setFinalAnswer] = useState("");
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [highlightHelpfulness, setHighlightHelpfulness] = useState<number | null>(null);
  const [highlightReason, setHighlightReason] = useState("");
  const [error, setError] = useState<string | null>(null);

  const {
    setCurrentSurveyResponse,
    currentStudy,
    studyOne,
    studyTwo,
    userObj,
    setStudyObj,
    setStep,
    setStudyNum,

  } = useStudyStore()

  useEffect(() => {
    console.log("Here is the current study:", currentStudy);
    console.log("Here is study one:", studyOne);
  }, []);

  //const setSurveyResponse = useStudyStore((s) => s.setCurrentSurveyResponse);
  // const participant = useStudyStore((s) => s.participant);

  const allRatingsComplete = SURVEY_QUESTIONS.every((q) => ratings[q.id] !== undefined);

  function handleRatingChange(questionId: string, value: number) {
    setRatings((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    setError(null);
  }

  function validateSurveyData(data: SurveyResponse): boolean {
    // Validate required fields
    if (!data.finalAnswer || typeof data.finalAnswer !== "string") return false;
    
    // Validate all required rating fields are numbers between 1-10
    const requiredRatings = ["helpfulness", "clarity", "confidence", "understanding", "speed", "satisfaction", "likelyToUse"];
    for (const field of requiredRatings) {
      const value = data[field as keyof SurveyResponse];
      if (typeof value !== "number" || value < 1 || value > 10) {
        console.error(`Invalid rating for ${field}: ${value}`);
        return false;
      }
    }

    // Validate optional fields if present
    if (data.highlightHelpfulness !== undefined && (typeof data.highlightHelpfulness !== "number" || data.highlightHelpfulness < 1 || data.highlightHelpfulness > 10)) {
      return false;
    }

    return true;
  }

  async function handleSubmit() {
    // Validate all required fields
    if (!finalAnswer.trim()) {
      setError("Please enter your final answer.");
      return;
    }

    if (!allRatingsComplete) {
      setError("Please answer all rating questions.");
      return;
    }

    // Build survey data locally to ensure all values are correct
    const surveyData: SurveyResponse = {
      finalAnswer,
      helpfulness: ratings.helpfulness,
      clarity: ratings.clarity,
      confidence: ratings.confidence,
      understanding: ratings.understanding,
      speed: ratings.speed,
      satisfaction: ratings.satisfaction,
      likelyToUse: ratings.likelyToUse,
      ...(highlightHelpfulness !== null && { highlightHelpfulness }),
      ...(highlightReason.trim() && { highlightReason }),
    };

    // Validate survey data before storing
    if (!validateSurveyData(surveyData)) {
      setError("Survey data validation failed. Please ensure all ratings are valid numbers.");
      console.error("Invalid survey data:", surveyData);
      return;
    }

    // Update the current study with survey response
    const updatedStudy = { ...currentStudy!, surveyResponse: surveyData };
    setStudyObj(updatedStudy);

    // Log the data being saved for research purposes
    console.log("Survey data collected for study", studyNum, ":", surveyData);

    // If this is study 1, move to study 2
    if (studyNum === 1) {
      setStudyNum(2);
      setStep("initial-prompt");
      return;
    }

    // For study 2, submit all data to backend
    try {
      const snapshot = useStudyStore.getState();

      // Validate that we have both studies
      if (!snapshot.studyOne || !snapshot.studyTwo) {
        throw new Error("Missing study data. Both studies must be completed.");
      }

      // Validate user object
      if (!snapshot.userObj) {
        throw new Error("Missing user information.");
      }

      const backendPayload = {
        userObj: snapshot.userObj,
        studyOne: snapshot.studyOne,
        studyTwo: snapshot.studyTwo,
      };

      console.log("Sending data to backend:", backendPayload);

      const sendToBack = await fetch("/api/backend", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(backendPayload),
      });

      if (!sendToBack.ok) {
        const errorData = await sendToBack.json();
        throw new Error(`Backend error: ${JSON.stringify(errorData)}`);
      }

      const backendData = await sendToBack.json();
      console.log("Backend insert successful:", backendData);
      
      setError(null);
      setStep("completion-page");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      console.error("Failed to submit data to backend:", errorMessage);
      setError(`Failed to save data: ${errorMessage}. Please try again or contact support.`);
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.titleBlock}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>Survey</h1>
              <span className={styles.badge}>Task 1</span>
            </div>
            <p className={styles.subtitle}>
              Please complete the survey below based on your experience with the chatbot for this task. Rate each question using the scale provided, where 1 indicates a very negative rating and 10 indicates a very positive rating. If you highlighted any part of the response, answer the final questions based on the section(s) you selected.
            </p>
          </div>
        </header>

        {error && (
          <div className={styles.errorBanner} role="alert">
            <strong className={styles.errorTitle}>Error</strong>
            <span className={styles.errorText}>{error}</span>
          </div>
        )}

        <section className={styles.chat}>
          <div className={styles.setupForm}>
            {/* Final Answer Upload */}
            <div className={styles.setupSection}>
              <h2 className={styles.sectionTitle}>Your Response</h2>
              <div className={styles.configGroup}>
                <label className={styles.configLabel} htmlFor="finalAnswer">
                  Enter your final answer to the chosen task: (paste text or describe your solution)
                </label>
                <textarea
                  id="finalAnswer"
                  className={styles.textarea}
                  value={finalAnswer}
                  onChange={(e) => setFinalAnswer(e.target.value)}
                  placeholder="Paste your final answer here or describe your solution..."
                  rows={6}
                />
                <small className={styles.helperText}>
                  You can paste text here or upload a file later. For now, describe your solution.
                </small>
              </div>
            </div>

            {/* Rating Questions */}
            <div className={styles.setupSection}>
              <h2 className={styles.sectionTitle}>Rate Your Experience</h2>
              {SURVEY_QUESTIONS.map((question) => (
                <div key={question.id} className={styles.configGroup}>
                  <label className={styles.configLabel}>{question.label}</label>
                  <div className={styles.sliderContainer}>
                    <div className={styles.sliderLabels}>
                      <span className={styles.sliderLabelLeft}>
                        {question.scale.minLabel}
                      </span>
                      <span className={styles.sliderValue}>
                        {ratings[question.id] || "-"}
                      </span>
                      <span className={styles.sliderLabelRight}>
                        {question.scale.maxLabel}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={ratings[question.id] || 0}
                      onChange={(e) =>
                        handleRatingChange(question.id, parseInt(e.target.value))
                      }
                      className={styles.slider}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Highlight Questions (Optional) */}
            <div className={styles.setupSection}>
              <h2 className={styles.sectionTitle}>Highlighted Text (Optional)</h2>
              <div className={styles.configGroup}>
                <label className={styles.configLabel} htmlFor="highlightHelpfulness">
                  How helpful was the portion of the response that you highlighted?
                </label>
                <div className={styles.sliderContainer}>
                  <div className={styles.sliderLabels}>
                    <span className={styles.sliderLabelLeft}>Not helpful</span>
                    <span className={styles.sliderValue}>
                      {highlightHelpfulness || "-"}
                    </span>
                    <span className={styles.sliderLabelRight}>Extremely helpful</span>
                  </div>
                  <input
                    type="range"
                    id="highlightHelpfulness"
                    min="1"
                    max="10"
                    value={highlightHelpfulness || 0}
                    onChange={(e) =>
                      setHighlightHelpfulness(parseInt(e.target.value))
                    }
                    className={styles.slider}
                  />
                </div>
                <small className={styles.helperText}>
                  Only answer if you highlighted text in the conversation.
                </small>
              </div>

              <div className={styles.configGroup}>
                <label className={styles.configLabel} htmlFor="highlightReason">
                  Why did you highlight that part of the response?
                </label>
                <textarea
                  id="highlightReason"
                  className={styles.textarea}
                  value={highlightReason}
                  onChange={(e) => setHighlightReason(e.target.value)}
                  placeholder="Explain why you found this part important or useful..."
                  rows={4}
                />
                <small className={styles.helperText}>
                  Only answer if you highlighted text in the conversation.
                </small>
              </div>
            </div>

            <button
              className={styles.primaryButton}
              onClick={handleSubmit}
              disabled={!allRatingsComplete}
            >
              Continue
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}