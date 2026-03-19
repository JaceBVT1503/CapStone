'use client';

import { useRef, useState } from 'react';
import styles from './HighlightableMessage.module.css';

const COLOR_OPTIONS = [
  { id: 'yellow', label: 'Yellow', hex: '#fef3c7' },
  { id: 'pink', label: 'Pink', hex: '#fbcfe8' },
  { id: 'blue', label: 'Blue', hex: '#bfdbfe' },
  { id: 'green', label: 'Green', hex: '#bbf7d0' },
];

function getCharOffsetInText(node, offset) {
  let charOffset = 0;

  function traverse(n) {
    if (n === node) {
      return false;
    }

    if (n.nodeType === Node.TEXT_NODE) {
      charOffset += n.textContent.length;
    } else {
      for (let child of n.childNodes) {
        if (traverse(child)) return true;
      }
    }
    return false;
  }

  traverse(node.parentElement);
  if (node.nodeType === Node.TEXT_NODE) {
    charOffset += offset;
  }

  return charOffset;
}

export function HighlightableMessage({
  messageId,
  content,
  highlights = [],
  onAddHighlight,
  onRemoveHighlight,
}) {
  const contentRef = useRef(null);
  const [selectedText, setSelectedText] = useState('');
  const [selectionRange, setSelectionRange] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [comment, setComment] = useState('');

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (!selectedText || selection.rangeCount === 0) {
      setSelectedText('');
      setSelectionRange(null);
      setShowColorPicker(false);
      return;
    }

    const range = selection.getRangeAt(0);
    if (!contentRef.current || !contentRef.current.contains(range.commonAncestorContainer)) {
      return;
    }

    // Calculate start and end offsets within the message content
    let startOffset = 0;
    let endOffset = 0;

    function countCharsBeforeNode(node, targetNode, offset) {
      let count = 0;

      for (let child of node.childNodes) {
        if (child === targetNode) {
          return count + offset;
        }

        if (child.nodeType === Node.TEXT_NODE) {
          count += child.textContent.length;
        } else {
          const result = countCharsBeforeNode(child, targetNode, offset);
          if (result !== null) {
            return result;
          }
          count += child.textContent.length;
        }
      }

      return null;
    }

    startOffset = countCharsBeforeNode(contentRef.current, range.startContainer, range.startOffset) || 0;
    endOffset = countCharsBeforeNode(contentRef.current, range.endContainer, range.endOffset) || 0;

    if (startOffset === endOffset) {
      setShowColorPicker(false);
      return;
    }

    // Ensure proper order
    if (startOffset > endOffset) {
      [startOffset, endOffset] = [endOffset, startOffset];
    }

    setSelectedText(selectedText);
    setSelectionRange({ startOffset, endOffset });
    setShowColorPicker(true);
  };

  const handleAddHighlight = (color) => {
    if (selectionRange && selectedText) {
      onAddHighlight(messageId, selectionRange.startOffset, selectionRange.endOffset, color, comment);
      cancelSelection();
    }
  };

  const cancelSelection = () => {
    setShowColorPicker(false);
    setSelectedText('');
    setSelectionRange(null);
    setComment('');
    window.getSelection().removeAllRanges();
  };

  const getHighlightedContent = () => {
    if (!highlights || highlights.length === 0) {
      return content;
    }

    // Sort highlights by startOffset
    const sortedHighlights = [...highlights].sort((a, b) => a.startOffset - b.startOffset);

    const elements = [];
    let lastIndex = 0;

    for (const highlight of sortedHighlights) {
      const { startOffset, endOffset, id, color } = highlight;

      // Add text before highlight
      if (lastIndex < startOffset) {
        elements.push(content.substring(lastIndex, startOffset));
      }

      // Add highlighted text
      const colorHex = COLOR_OPTIONS.find((c) => c.id === color)?.hex || '#fef3c7';
      elements.push(
        <span
          key={`highlight-${id}`}
          className={styles.highlighted}
          style={{ backgroundColor: colorHex }}
          data-highlight-id={id}
          title={highlight.comment ? `Comment: ${highlight.comment}` : 'Highlighted'}
        >
          {content.substring(startOffset, endOffset)}
        </span>
      );

      lastIndex = endOffset;
    }

    // Add remaining text
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
              Selected: "<span className={styles.preview}>{selectedText.substring(0, 30)}</span>{selectedText.length > 30 ? '...' : ''}"
            </div>

            <div className={styles.colorButtons}>
              {COLOR_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  className={styles.colorButton}
                  style={{ backgroundColor: option.hex }}
                  onClick={() => handleAddHighlight(option.id)}
                  title={`Highlight as ${option.label}`}
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
