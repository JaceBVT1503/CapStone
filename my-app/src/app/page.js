"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.css";

const ROLES = [
  { id: "MathTutor", label: "Math Tutor" },
  { id: "WritingGrammarExpert", label: "Writing / Grammar Expert" },
  { id: "SeniorSoftwareEngineerDebugger", label: "Senior Software Engineer (Debugging)" },
];

function formatTime(ts) {
  try {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

export default function Home() {
  const [roleMode, setRoleMode] = useState(true);
  const [role, setRole] = useState(ROLES[0].id);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => [
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Ask a question, or toggle Role Mode to switch between persona-based and regular chat.",
      ts: Date.now(),
    },
  ]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const listRef = useRef(null);

  const mode = roleMode ? "role" : "plain";
  const activeRole = useMemo(() => ROLES.find((r) => r.id === role) ?? ROLES[0], [role]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length]);

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

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.titleBlock}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>AI Chatbot</h1>
              <span className={styles.badge}>Milestone 1</span>
            </div>
            <p className={styles.subtitle}>
              Toggle Role Mode to apply one of the preset personas before your question is sent.
            </p>
          </div>

          <div className={styles.controls}>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={roleMode}
                onChange={(e) => setRoleMode(e.target.checked)}
              />
              <span className={styles.toggleTrack} aria-hidden="true">
                <span className={styles.toggleThumb} />
              </span>
              <span className={styles.toggleLabel}>Role Mode</span>
            </label>

            <div className={styles.selectWrap}>
              <label className={styles.selectLabel} htmlFor="roleSelect">
                Role
              </label>
              <select
                id="roleSelect"
                className={styles.select}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={!roleMode}
                aria-disabled={!roleMode}
                title={roleMode ? "" : "Enable Role Mode to choose a role"}
              >
                {ROLES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
              <div className={styles.activeHint}>
                {roleMode ? `Active: ${activeRole.label}` : "Active: Regular chat"}
              </div>
            </div>

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
                <div className={styles.bubble}>{m.content}</div>
              </div>
            ))}
          </div>

          <div className={styles.composer}>
            <textarea
              className={styles.textarea}
              value={input}
              placeholder={
                roleMode
                  ? `Ask a ${activeRole.label} question…`
                  : "Ask a question (no role prompt)…"
              }
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
      </main>
    </div>
  );
}
