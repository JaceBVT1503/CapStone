"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.css";
import { HighlightableMessage } from "./HighlightableMessage";
import { useHighlights } from "../lib/useHighlights";




const ROLES = [
  { id: "MathTutor", label: "Math Tutor" },
  { id: "WritingGrammarExpert", label: "Writing / Grammar Expert" },
  { id: "SeniorSoftwareEngineerDebugger", label: "Senior Software Engineer (Debugging)" },
];

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

const USER_INFO_STORAGE_KEY = "aiChatbotExperiment.userInfo.v1";

function isUserInfoComplete(userInfo) {
  const { name, grade, major, aiExperience } = userInfo ?? {};
  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedMajor = typeof major === "string" ? major.trim() : "";
  const gradeSet = new Set(GRADE_OPTIONS.map((g) => g.id));

  const isValidGrade = typeof grade === "string" && gradeSet.has(grade);
  const isValidAiExperience = aiExperience === "yes" || aiExperience === "no";

  return Boolean(trimmedName && trimmedMajor && isValidGrade && isValidAiExperience);
}

function formatTime(ts) {
  try {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

export default function Home() {
  const [setupComplete, setSetupComplete] = useState(false);
  const [mode, setMode] = useState("plain");
  const [role, setRole] = useState(ROLES[0].id);
  const [setupInput, setSetupInput] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [major, setMajor] = useState("");
  const [aiExperience, setAiExperience] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [showCommentsSidebar, setShowCommentsSidebar] = useState(true);

  const listRef = useRef(null);
  const {
    highlights,
    addHighlight,
    removeHighlight,
    updateHighlight,
    getHighlightsForMessage,
  } = useHighlights();

  const activeRole = useMemo(() => ROLES.find((r) => r.id === role) ?? ROLES[0], [role]);
  const isUserInfoCompleteValue = isUserInfoComplete({ name, grade, major, aiExperience });

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  useEffect(() => {
    // Restore saved user info so the user doesn't need to retype it on refresh.
    try {
      const raw = localStorage.getItem(USER_INFO_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return;

      setName(typeof parsed.name === "string" ? parsed.name : "");
      setGrade(typeof parsed.grade === "string" ? parsed.grade : "");
      setMajor(typeof parsed.major === "string" ? parsed.major : "");
      setAiExperience(typeof parsed.aiExperience === "string" ? parsed.aiExperience : "");
    } catch {
      // If localStorage is unavailable or data is malformed, just start blank.
    }
  }, []);

  async function handleSetup() {
    const trimmed = setupInput.trim();
    if (!trimmed || isSending) return;

    const userInfo = { name, grade, major, aiExperience };
    if (!isUserInfoComplete(userInfo)) {
      setError("Please complete all required user information fields before starting.");
      return;
    }

    console.log(`EXPERIMENT SETUP: Mode = ${mode.toUpperCase()}, Role = ${role}`);

    // Persist user info after validation succeeds.
    try {
      localStorage.setItem(USER_INFO_STORAGE_KEY, JSON.stringify(userInfo));
    } catch {
      // Non-fatal: allow setup to continue even if storage fails.
    }


    try {

      const backRes = await fetch("/api/backend", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          codeVer: "1.1",
          aiModel: "gemini-3-flash-preview",
          company: "Google",
          mode: mode,
          role: mode === "role" ? role : "none",
          name: name,
          grade: grade,
          major: major,
          aiUse: aiExperience,
        }),
      });

      const backData = await backRes.json().catch(() => null);
      if (!backRes.ok) {
        const message = data?.error?.message || `Request failed (${backRes.status})`;
        throw new Error(message);
      }

    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unexpected error sending user info to backend.";
      setError(msg);
    }

    setError(null);
    setIsSending(true);

    const userMsg = { id: crypto.randomUUID(), role: "user", content: trimmed, ts: Date.now() };
    setMessages([userMsg]);
    setSetupComplete(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          mode,
          role: mode === "role" ? role : null,
          history: [],
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        const message = data?.error?.message || `Request failed (${res.status})`;
        throw new Error(message);
      }

      const assistantText = data?.assistant?.content;
      if (typeof assistantText !== "string" || assistantText.trim().length === 0) {
        throw new Error("Invalid response from server.");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: assistantText,
          ts: Date.now(),
        },
      ]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unexpected error sending message.";
      setError(msg);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Sorry — something went wrong sending that message.",
          ts: Date.now(),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    setError(null);
    setIsSending(true);

    const userMsg = { id: crypto.randomUUID(), role: "user", content: trimmed, ts: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const history = messages
      .slice(-12)
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          mode,
          role: mode === "role" ? role : null,
          history,
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        const message = data?.error?.message || `Request failed (${res.status})`;
        throw new Error(message);
      }

      const assistantText = data?.assistant?.content;
      if (typeof assistantText !== "string" || assistantText.trim().length === 0) {
        throw new Error("Invalid response from server.");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: assistantText,
          ts: Date.now(),
        },
      ]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unexpected error sending message.";
      setError(msg);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Sorry — something went wrong sending that message.",
          ts: Date.now(),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function clearChat() {
    setError(null);
    setMessages([
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Chat cleared. Ask another question whenever you're ready.",
        ts: Date.now(),
      },
    ]);
  }

  // Setup screen for experimenters
  if (!setupComplete) {
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
                <h2 className={styles.sectionTitle}>Experiment Configuration</h2>

                <div className={styles.configGroup}>
                  <label className={styles.configLabel}>Chat Mode</label>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="mode"
                        value="plain"
                        checked={mode === "plain"}
                        onChange={(e) => setMode(e.target.value)}
                      />
                      <span>Plain Mode (No Role)</span>
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="mode"
                        value="role"
                        checked={mode === "role"}
                        onChange={(e) => setMode(e.target.value)}
                      />
                      <span>Role Mode (with Persona)</span>
                    </label>
                  </div>
                </div>

                {mode === "role" && (
                  <div className={styles.configGroup}>
                    <label className={styles.selectLabel} htmlFor="roleSelect">
                      Select Role
                    </label>
                    <select
                      id="roleSelect"
                      className={styles.select}
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      {ROLES.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className={styles.setupSection}>
                <h2 className={styles.sectionTitle}>Initial Prompt</h2>
                <textarea
                  className={styles.textarea}
                  value={setupInput}
                  placeholder="Enter the first prompt to send to the chatbot..."
                  onChange={(e) => setSetupInput(e.target.value)}
                  rows={5}
                  disabled={isSending}
                />
              </div>

              <button
                className={styles.primaryButton}
                type="button"
                onClick={handleSetup}
                disabled={isSending || setupInput.trim().length === 0 || !isUserInfoCompleteValue}
              >
                {isSending ? "Starting Experiment…" : "Start Experiment"}
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // Chat screen for users (after setup)
  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.titleBlock}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>AI Chatbot</h1>
              <span className={styles.badge}>Chat</span>
            </div>
            <p className={styles.subtitle}>Ask questions and chat with the assistant.</p>
          </div>

          <div className={styles.controls}>
            <button className={styles.ghostButton} type="button" onClick={() => setShowCommentsSidebar(!showCommentsSidebar)}>
              {showCommentsSidebar ? "Hide" : "Show"} Comments
            </button>
            <button className={styles.ghostButton} type="button" onClick={clearChat}>
              Clear
            </button>
          </div>
        </header>

        {error ? (
          <div className={styles.errorBanner} role="alert">
            <strong className={styles.errorTitle}>Error</strong>
            <span className={styles.errorText}>{error}</span>
          </div>
        ) : null}

        <div className={styles.chatWrapper}>
          <section className={styles.chat}>
          <div className={styles.messageList} ref={listRef} aria-label="Chat transcript">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`${styles.messageRow} ${
                  m.role === "user" ? styles.userRow : styles.assistantRow
                }`}
              >
                <div className={styles.messageMeta}>
                  <span className={styles.roleTag}>{m.role === "user" ? "You" : "Assistant"}</span>
                  <span className={styles.timeTag}>{formatTime(m.ts)}</span>
                </div>
                <HighlightableMessage
                  messageId={m.id}
                  content={m.content}
                  highlights={getHighlightsForMessage(m.id)}
                  onAddHighlight={addHighlight}
                  onRemoveHighlight={removeHighlight}
                  onUpdateHighlight={updateHighlight}
                />
              </div>
            ))}
          </div>

          <div className={styles.composer}>
            <textarea
              className={styles.textarea}
              value={input}
              placeholder="Ask a question…"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              rows={3}
              disabled={isSending}
            />

            <div className={styles.composerBar}>
              <div className={styles.tip}>
                Press <kbd className={styles.kbd}>Enter</kbd> to send,{" "}
                <kbd className={styles.kbd}>Shift</kbd> + <kbd className={styles.kbd}>Enter</kbd>{" "}
                for a new line.
              </div>
              <button
                className={styles.primaryButton}
                type="button"
                onClick={sendMessage}
                disabled={isSending || input.trim().length === 0}
              >
                {isSending ? "Sending…" : "Send"}
              </button>
            </div>
          </div>
        </section>

        {showCommentsSidebar && (
          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <h2 className={styles.sidebarTitle}>Highlights & Comments</h2>
            </div>
            <div className={styles.sidebarContent}>
              {messages.length === 0 ? (
                <p className={styles.emptySidebar}>No messages yet. Start chatting to highlight and comment on text.</p>
              ) : null}
              {messages.map((message) => {
                const msgHighlights = getHighlightsForMessage(message.id);
                if (msgHighlights.length === 0) return null;
                return (
                  <div key={message.id} className={styles.messageHighlights}>
                    <div className={styles.msgLabel}>
                      <span className={styles.msgRole}>
                        {message.role === "user" ? "Your message" : "Assistant"}
                      </span>
                      <span className={styles.msgTime}>{formatTime(message.ts)}</span>
                    </div>
                    <div className={styles.highlights}>
                      {msgHighlights.map((highlight) => (
                        <div key={highlight.id} className={styles.highlightCard}>
                          <div
                            className={styles.colorDot}
                            style={{
                              backgroundColor:
                                highlight.color === "yellow"
                                  ? "#fef3c7"
                                  : highlight.color === "pink"
                                  ? "#fbcfe8"
                                  : highlight.color === "blue"
                                  ? "#bfdbfe"
                                  : "#bbf7d0",
                            }}
                          />
                          <div className={styles.highlightDetails}>
                            <p className={styles.highlightQuote}>
                              "{message.content.substring(highlight.startOffset, highlight.endOffset)}"
                            </p>
                            {highlight.comment && (
                              <p className={styles.highlightComment}>{highlight.comment}</p>
                            )}
                          </div>
                          <button
                            className={styles.removeHighlightBtn}
                            onClick={() => removeHighlight(message.id, highlight.id)}
                            title="Remove highlight"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        )}
        </div>
      </main>
    </div>
  );
}
