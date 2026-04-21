"use client";

import { useRef, useState, type ReactNode } from "react";
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
    startOffset: number,
    endOffset: number,
    color: HighlightColorId,
    comment: string,
    text: string,
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
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedText, setSelectedText] = useState("");
  const [selectionRange, setSelectionRange] = useState<{
    startOffset: number;
    endOffset: number;
  } | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [comment, setComment] = useState("");

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim() ?? "";

    if (!selectedText || !selection || selection.rangeCount === 0) {
      setSelectedText("");
      setSelectionRange(null);
      setShowColorPicker(false);
      return;
    }

    const range = selection.getRangeAt(0);
    if (!contentRef.current || !contentRef.current.contains(range.commonAncestorContainer)) {
      return;
    }

    let startOffset = 0;
    let endOffset = 0;

    function countCharsBeforeNode(
      node: Node,
      targetNode: Node,
      offset: number
    ): number | null {
      let count = 0;

      for (const child of Array.from(node.childNodes)) {
        if (child === targetNode) {
          return count + offset;
        }

        if (child.nodeType === Node.TEXT_NODE) {
          count += child.textContent?.length ?? 0;
        } else {
          const result = countCharsBeforeNode(child, targetNode, offset);
          if (result !== null) {
            return result;
          }
          count += child.textContent?.length ?? 0;
        }
      }

      return null;
    }

    startOffset =
      countCharsBeforeNode(contentRef.current, range.startContainer, range.startOffset) ?? 0;
    endOffset =
      countCharsBeforeNode(contentRef.current, range.endContainer, range.endOffset) ?? 0;

    if (startOffset === endOffset) {
      setShowColorPicker(false);
      return;
    }

    if (startOffset > endOffset) {
      [startOffset, endOffset] = [endOffset, startOffset];
    }

    setSelectedText(selectedText);
    setSelectionRange({ startOffset, endOffset });
    setShowColorPicker(true);
  };

  const handleAddHighlight = (color: HighlightColorId) => {
    if (selectionRange && selectedText) {
      onAddHighlight(messageId, selectionRange.startOffset, selectionRange.endOffset, color, comment, selectedText);
      cancelSelection();
    }
  };

  const cancelSelection = () => {
    setShowColorPicker(false);
    setSelectedText("");
    setSelectionRange(null);
    setComment("");
    window.getSelection()?.removeAllRanges();
  };

  const getHighlightedContent = () => {
    if (!highlights || highlights.length === 0) {
      return content;
    }

    const sortedHighlights = [...highlights].sort((a, b) => a.startOffset - b.startOffset);

    const elements: ReactNode[] = [];
    let lastIndex = 0;

    for (const highlight of sortedHighlights) {
      const { startOffset, endOffset, id, color } = highlight;

      if (lastIndex < startOffset) {
        elements.push(content.substring(lastIndex, startOffset));
      }

      const colorHex = COLOR_OPTIONS.find((c) => c.id === color)?.hex || "#fef3c7";
      elements.push(
        <span
          key={`highlight-${id}`}
          className={styles.highlighted}
          style={{ backgroundColor: colorHex }}
          data-highlight-id={id}
          title={highlight.comment ? `Comment: ${highlight.comment}` : "Highlighted"}
        >
          {content.substring(startOffset, endOffset)}
        </span>
      );

      lastIndex = endOffset;
    }

    if (lastIndex < content.length) {
      elements.push(content.substring(lastIndex));
    }

    return elements;
  };

  return (
    <div className={styles.container}>
      <div
        ref={contentRef}
        className={styles.bubble}
        onMouseUp={handleTextSelection}
        onTouchEnd={handleTextSelection}
      >
        {getHighlightedContent()}
      </div>

      {showColorPicker && selectedText && (
        <div className={styles.highlightToolbar}>
          <div className={styles.toolbarContent}>
            <div className={styles.selectedTextPreview}>
              Selected: "<span className={styles.preview}>{selectedText.substring(0, 30)}</span>{selectedText.length > 30 ? "..." : ""}"
            </div>

            <div className={styles.colorButtons}>
              {COLOR_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  className={styles.colorButton}
                  style={{ backgroundColor: option.hex }}
                  onClick={() => handleAddHighlight(option.id)}
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
            />

            <button
              className={styles.cancelButton}
              onClick={cancelSelection}
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
                <div className={styles.highlightText}>
                  {highlight.comment || content.substring(highlight.startOffset, highlight.endOffset)}
                </div>
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
