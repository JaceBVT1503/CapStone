"use client";

import styles from "@/app/page.module.css";
import { useState, useRef, useEffect } from "react";
import { useHighlights, type Highlight } from "@/lib/useHighlights";
import { HighlightableMessage } from "../HighlightableMessage";
import { useStudyStore } from "@/store/study-store";
import { TASKS, TASK_ROLES } from "@/lib/prompts";
import type { ChatHistoryItem } from "@/lib/chatContract";
import type { ChatMode } from "@/lib/prompts";

type ChatApiResponseBody = {
  assistant?: { content?: unknown };
  error?: { message?: string };
};

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  ts: number;
};

function formatTime(ts: number): string {
  try {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

function LoadingBubble() {
  return (
    <div className={styles.loadingBubble}>
      <div className={styles.loadingDot}></div>
      <div className={styles.loadingDot}></div>
      <div className={styles.loadingDot}></div>
    </div>
  );
}

export default function ChatSection() {
  const [showCommentsSidebar, setShowCommentsSidebar] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const currentTaskId = useStudyStore((s) => s.currentTaskId);
  const currentTaskIndex = useStudyStore((s) => s.currentTaskIndex);
  const setStep = useStudyStore((s) => s.setStep);
  const addChatMessage = useStudyStore((s) => s.addChatMessage);

  const listRef = useRef<HTMLDivElement | null>(null);
  const isInitializedRef = useRef(false);
  const {
    highlights,
    addHighlight,
    removeHighlight,
    updateHighlight,
    getHighlightsForMessage,
  } = useHighlights();

  // Get task details
  const task = TASKS.find((t) => t.id === currentTaskId);
  const mode: ChatMode = currentTaskIndex === 0 ? "role" : "no-role";

  // Reset chat state when task changes
  useEffect(() => {
    setMessages([]);
    setError(null);
    isInitializedRef.current = false;
  }, [currentTaskId]);

  // Initialize chat with current task
  useEffect(() => {
    if (isInitializedRef.current || !currentTaskId || !task) return;

    isInitializedRef.current = true;
    sendInitialMessage();
  }, [currentTaskId, task]);

  // Auto-scroll to bottom
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length, isSending]);

  async function sendInitialMessage() {
    let initialPrompt = "";
    if (mode === "role") {
      const role = TASK_ROLES[currentTaskId!];
      initialPrompt = `Act like a ${role} and help me with the following task: ${task?.description}`;
    } else {
      initialPrompt = task?.description || "";
    }

    // Store the initial prompt in study store but don't display it
    addChatMessage("user", initialPrompt);
    setIsSending(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          message: initialPrompt,
          mode,
          taskId: currentTaskId,
          history: [],
        }),
      });

      const data = (await res.json().catch(() => null)) as ChatApiResponseBody | null;
      if (!res.ok) {
        const message = data?.error?.message || `Request failed (${res.status})`;
        throw new Error(message);
      }

      const assistantText = data?.assistant?.content;
      if (typeof assistantText !== "string" || assistantText.trim().length === 0) {
        throw new Error("Invalid response from server.");
      }

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: assistantText,
        ts: Date.now(),
      };

      // Only add the assistant message, not the user's initial prompt
      setMessages([assistantMsg]);
      addChatMessage("assistant", assistantText);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unexpected error sending message.";
      setError(msg);
      const errorMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry — something went wrong. Please try again.",
        ts: Date.now(),
      };
      setMessages([errorMsg]);
    } finally {
      setIsSending(false);
    }
  }

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    setError(null);
    setIsSending(true);

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      ts: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    addChatMessage("user", trimmed);
    setInput("");

    const history: ChatHistoryItem[] = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          mode,
          taskId: currentTaskId,
          history,
        }),
      });

      const data = (await res.json().catch(() => null)) as ChatApiResponseBody | null;
      if (!res.ok) {
        const message = data?.error?.message || `Request failed (${res.status})`;
        throw new Error(message);
      }

      const assistantText = data?.assistant?.content;
      if (typeof assistantText !== "string" || assistantText.trim().length === 0) {
        throw new Error("Invalid response from server.");
      }

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: assistantText,
        ts: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      addChatMessage("assistant", assistantText);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unexpected error sending message.";
      setError(msg);
      const errorMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry — something went wrong sending that message.",
        ts: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  }

  function handleContinue() {
    setStep("survey-section");
  }

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.titleBlock}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{task?.label}</h1>
              <span className={styles.badge}>Task {currentTaskIndex + 1}</span>
            </div>
            <p className={styles.subtitle}>
              Please review the chatbot's response below. Highlight any text you want and add comments to explain your thoughts. You may continue the conversation with the chatbot by sending as many follow-up messages as you would like. When you are finished, please proceed by selecting 'Continue'.
            </p>
          </div>

          <div className={styles.controls}>
            <button
              className={styles.ghostButton}
              type="button"
              onClick={() => setShowCommentsSidebar(!showCommentsSidebar)}
            >
              {showCommentsSidebar ? "Hide" : "Show"} Comments
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
              {messages.length === 0 && isSending ? (
                <div className={`${styles.messageRow} ${styles.assistantRow}`}>
                  <div className={styles.messageMeta}>
                    <span className={styles.roleTag}>Assistant</span>
                  </div>
                  <LoadingBubble />
                </div>
              ) : (
                messages.map((m) => (
                  <div
                    key={m.id}
                    className={`${styles.messageRow} ${
                      m.role === "user" ? styles.userRow : styles.assistantRow
                    }`}
                  >
                    <div className={styles.messageMeta}>
                      <span className={styles.roleTag}>
                        {m.role === "user" ? "You" : "Assistant"}
                      </span>
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
                ))
              )}
              {messages.length > 0 && isSending && (
                <div className={`${styles.messageRow} ${styles.assistantRow}`}>
                  <div className={styles.messageMeta}>
                    <span className={styles.roleTag}>Assistant</span>
                  </div>
                  <LoadingBubble />
                </div>
              )}
            </div>

            <div className={styles.composer}>
              <textarea
                className={styles.textarea}
                value={input}
                placeholder="Ask a follow-up question…"
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
                <div className={styles.buttonGroup}>
                  <button
                    className={styles.primaryButton}
                    type="button"
                    onClick={sendMessage}
                    disabled={isSending || input.trim().length === 0}
                  >
                    {isSending ? "Sending…" : "Send"}
                  </button>
                  <button
                    className={styles.primaryButton}
                    type="button"
                    onClick={handleContinue}
                  >
                    Continue
                  </button>
                </div>
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
                  <p className={styles.emptySidebar}>
                    No messages yet. Start chatting to highlight and comment on text.
                  </p>
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
                        {msgHighlights.map((highlight: Highlight) => (
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
                                "{highlight.selectedText}"
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
