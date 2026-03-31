"use client";

import styles from "@/app/page.module.css";
import { useState, useRef } from "react";
import { useHighlights, type Highlight } from "@/lib/useHighlights";
import { HighlightableMessage } from "../HighlightableMessage";
import type { ChatHistoryItem } from "@/lib/chatContract";
import type { ChatMode, RoleId } from "@/lib/prompts";


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


const ROLES: { id: RoleId; label: string }[] = [
  { id: "MathTutor", label: "Math Tutor" },
  { id: "WritingGrammarExpert", label: "Writing / Grammar Expert" },
  { id: "SeniorSoftwareEngineerDebugger", label: "Senior Software Engineer (Debugging)" },
  { id: "EmailCoach", label: "Write an email to a recruiter"},
  { id: "ConceptCoach", label: "Explain something you know well"},
  { id: "InvestmentPortfolio", label: "Develop an investment portfolio" },
];

function formatTime(ts: number): string {
  try {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

export default function ChatSection() {

  const [showCommentsSidebar, setShowCommentsSidebar] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [role, setRole] = useState<RoleId>(ROLES[0].id);
  const [mode, setMode] = useState<ChatMode>("plain");

  function clearChat() {
    setError(null);
    setMessages([
      {
        id: crypto.randomUUID(),
        role: "assistant" as const,
        content: "Chat cleared. Ask another question whenever you're ready.",
        ts: Date.now(),
      },
    ]);
  }


  const listRef = useRef<HTMLDivElement | null>(null);
  const {
    highlights,
    addHighlight,
    removeHighlight,
    updateHighlight,
    getHighlightsForMessage,
  } = useHighlights();


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
    setInput("");

    const history: ChatHistoryItem[] = messages
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

      const data = (await res.json().catch(() => null)) as ChatApiResponseBody | null;
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
          role: "assistant" as const,
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
          role: "assistant" as const,
          content: "Sorry — something went wrong sending that message.",
          ts: Date.now(),
        },
      ]);
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
                  className={`${styles.messageRow} ${m.role === "user" ? styles.userRow : styles.assistantRow
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