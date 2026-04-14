"use client";

import { useRef, useState } from "react";
import styles from "./HighlightableMessage.module.css";
import type { Highlight, HighlightColorId } from "../lib/useHighlights";

const COLOR_OPTIONS: { id: HighlightColorId; label: string; hex: string }[] = [
  { id: "yellow", label: "Yellow", hex: "#fef3c7" },
  { id: "pink", label: "Pink", hex: "#fbcfe8" },
  { id: "blue", label: "Blue", hex: "#bfdbfe" },
  { id: "green", label: "Green", hex: "#bbf7d0" },
];

export interface HighlightableMessageProps {
  messageId: string;
  content: string;
  highlights?: Highlight[];
  onAddHighlight: (
    messageId: string,
    selectedText: string,
    color: HighlightColorId,
    comment: string
  ) => void;
  onRemoveHighlight: (messageId: string, highlightId: string) => void;
  onUpdateHighlight?: (
    messageId: string,
    highlightId: string,
    updates: Partial<Highlight>
  ) => void;
}

export function HighlightableMessage({
  messageId,
  content,
  highlights = [],
  onAddHighlight,
  onRemoveHighlight,
}: HighlightableMessageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedText, setSelectedText] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [comment, setComment] = useState("");
  const [toolbarPos, setToolbarPos] = useState<{ x: number; y: number } | null>(null);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selected = selection?.toString().trim() ?? "";

    if (!selected) {
      setSelectedText("");
      setShowColorPicker(false);
      setToolbarPos(null);
      return;
    }

    // Check if selection is within this message container
    if (!containerRef.current || !selection?.rangeCount) {
      return;
    }

    const range = selection.getRangeAt(0);
    if (!containerRef.current.contains(range.commonAncestorContainer)) {
      return;
    }

    setSelectedText(selected);
    setShowColorPicker(true);

    // Get the position of the selection/mouse
    const rects = range.getClientRects();
    if (rects.length > 0) {
      const rect = rects[rects.length - 1]; // Get the last rect (end of selection)
      const x = rect.right + 10; // Offset from right edge of selection
      const y = rect.top - 10; // Offset from top of selection

      setToolbarPos({ x, y });
    }
  };

  function handleAddHighlight(color: HighlightColorId) {
    if (!selectedText) return;
    onAddHighlight(messageId, selectedText, color, comment);
    cancelSelection();
  }

  function cancelSelection() {
    setSelectedText("");
    setShowColorPicker(false);
    setComment("");
    setToolbarPos(null);
    window.getSelection()?.removeAllRanges();
  }

  const renderHighlightedContent = (): React.ReactNode => {
    if (!highlights || highlights.length === 0) {
      return content;
    }

    // Process highlights in order of appearance in the text
    let sortedHighlights = [...highlights].sort((a, b) => {
      return content.indexOf(a.selectedText) - content.indexOf(b.selectedText);
    });

    const parts: React.ReactNode[] = [];
    let remaining = content;

    for (const highlight of sortedHighlights) {
      const index = remaining.indexOf(highlight.selectedText);
      if (index === -1) continue;

      // Add text before this highlight
      if (index > 0) {
        parts.push(remaining.substring(0, index));
      }

      // Add the highlight
      const colorHex =
        COLOR_OPTIONS.find((c) => c.id === highlight.color)?.hex || "#fef3c7";
      const title = highlight.comment ? `Comment: ${highlight.comment}` : "Highlighted";

      parts.push(
        <span
          key={`${highlight.id}-${Date.now()}`}
          className={styles.highlighted}
          style={{ backgroundColor: colorHex }}
          data-highlight-id={highlight.id}
          title={title}
        >
          {highlight.selectedText}
        </span>
      );

      // Move forward in remaining text
      remaining = remaining.substring(index + highlight.selectedText.length);
    }

    // Add any remaining text
    if (remaining) {
      parts.push(remaining);
    }

    // Return wrapped in fragment
    return <>{parts}</>;
  };

  return (
    <div className={styles.container}>
      <div
        ref={containerRef}
        className={styles.bubble}
        onMouseUp={handleTextSelection}
        onTouchEnd={handleTextSelection}
      >
        {renderHighlightedContent()}
      </div>

      {showColorPicker && selectedText && toolbarPos && (
        <div
          className={styles.highlightToolbar}
          style={{
            position: "fixed",
            left: `${toolbarPos.x}px`,
            top: `${toolbarPos.y}px`,
            zIndex: 10000,
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className={styles.toolbarContent}>
            <div className={styles.selectedTextPreview}>
              Selected: "<span className={styles.preview}>{selectedText.substring(0, 30)}</span>
              {selectedText.length > 30 ? "..." : ""}"
            </div>

            <div className={styles.colorButtons}>
              {COLOR_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  className={styles.colorButton}
                  style={{ backgroundColor: option.hex }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddHighlight(option.id);
                  }}
                  title={`Highlight as ${option.label}`}
                  type="button"
                />
              ))}
            </div>

            <textarea
              className={styles.commentInput}
              placeholder="Add a comment (optional)..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={2}
              onMouseDown={(e) => e.preventDefault()}
            />

            <button
              className={styles.cancelButton}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                cancelSelection();
              }}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {highlights && highlights.length > 0 && (
        <div className={styles.highlightsList}>
          {highlights.map((highlight) => (
            <div key={highlight.id} className={styles.highlightItem}>
              <div
                className={styles.colorIndicator}
                style={{
                  backgroundColor: COLOR_OPTIONS.find((c) => c.id === highlight.color)?.hex,
                }}
              />
              <div className={styles.highlightContent}>
                <div className={styles.highlightText}>{highlight.comment || highlight.selectedText}</div>
                {highlight.comment && (
                  <div className={styles.highlightComment}>{highlight.comment}</div>
                )}
              </div>
              <button
                className={styles.deleteButton}
                onClick={() => onRemoveHighlight(messageId, highlight.id)}
                title="Remove highlight"
                type="button"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
