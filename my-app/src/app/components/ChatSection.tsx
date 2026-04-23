"use client";

import styles from "@/app/page.module.css";
import { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";

import { useHighlights, type Highlight } from "@/lib/useHighlights";
import { HighlightableMessage } from "../HighlightableMessage";
import type { ChatHistoryItem } from "@/lib/chatContract";
import type { ChatMode, RoleId } from "@/lib/prompts";


import type { AIStudy, AIHistory, ChatMessage } from "@/lib/types";
//import { createChatbot } from "@/utils/prompt-generator";
import { useStudyStore } from "@/store/study-store";





type ChatApiResponseBody = {
  assistant?: { content?: unknown };
  error?: { message?: string };
};

// type ChatMessage = {
//   id: string;
//   role: "user" | "assistant";
//   content: string;
//   ts: number;
// };


const ROLES: { id: RoleId; label: string }[] = [
  { id: "MathTutor", label: "Math Tutor" },
  { id: "WritingGrammarExpert", label: "Writing / Grammar Expert" },
  { id: "SeniorSoftwareEngineerDebugger", label: "Senior Software Engineer (Debugging)" },
  { id: "EmailCoach", label: "Write an email to a recruiter" },
  { id: "ConceptCoach", label: "Explain something you know well" },
  { id: "InvestmentPortfolio", label: "Develop an investment portfolio" },
];

function formatTime(ts: number): string {
  try {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

interface ChatSectionParams {
  studyNum: number
};

export default function ChatSection({ studyNum } : ChatSectionParams) {


  const {
    userObj,
    currentStudy,
    setStudyObj,
    setStep,
  } = useStudyStore();




  //const [chatHistoryObj, setChatHistoryObj] = useState<ChatMessage[]>([]);


  const [showCommentsSidebar, setShowCommentsSidebar] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(currentStudy.history.messageLog);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [task, setTask] = useState(currentStudy.task);
  const [mode, setMode] = useState(currentStudy.mode);








  const listRef = useRef<HTMLDivElement | null>(null);
  const {
    highlights,
    addHighlight,
    removeHighlight,
    updateHighlight,
    getHighlightsForMessage,
  } = useHighlights();


  function endStudy() {
    setError(null);
    console.log("Here are the highlights", highlights);

    const finalChatLog: ChatMessage[] = messages.map((m) => {
      const hl = getHighlightsForMessage(m.id!);
      return {
        content: m.content,
        role: m.role,
        hightlight: hl?.[0]?.selectedText ?? null,
        comment: hl?.[0]?.comment ?? null,
        id: m.id,
        time: m.time,
      }
    });

    
    const finalHistoryObj: AIHistory = {
      ...currentStudy.history,
      messageLog: finalChatLog,
    };

    const finalStudyObj: AIStudy = {
      ...currentStudy,
      history: finalHistoryObj
    };

    setStudyObj(finalStudyObj);
    setStep("survey-section");

  }



  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    setError(null);
    setIsSending(true);
    setInput("");

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      time: Date.now(),
      comment: null,
      hightlight: null,
    };

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        message: trimmed,
        mode: mode,
        task: task,
        history: messages,
      })
    });

    const aiResponse = await res.json();
    const aiMsg = {

      id: crypto.randomUUID(),
      role: "model",
      hightlight: null,
      comment: null,
      content: aiResponse.data,
      time: Date.now(),
    }

    setMessages((prev) => [
      ...prev,
      userMsg,
      aiMsg,
    ]);

    
    setIsSending(false);


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
            <p className={styles.subtitle}>Please review the chatbot's response below. Highlight any text you want and add comments to explain your thoughts. You may continue the conversation with the chatbot by sending as many follow-up messages as you would like. When you are finished, please proceed by selecting 'End Study'.</p>
          </div>

          <div className={styles.controls}>
            <button className={styles.ghostButton} type="button" onClick={() => setShowCommentsSidebar(!showCommentsSidebar)}>
              {showCommentsSidebar ? "Hide" : "Show"} Comments
            </button>
            <button className={styles.ghostButton} type="button" onClick={endStudy}>
              End Study
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
                    <span className={styles.timeTag}>{formatTime(m.time)}</span>
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
                        <span className={styles.msgTime}>{formatTime(message.time)}</span>
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