import { useState, useCallback } from 'react';

const COLOR_OPTIONS = [
  { id: 'yellow', label: 'Yellow', hex: '#fef3c7' },
  { id: 'pink', label: 'Pink', hex: '#fbcfe8' },
  { id: 'blue', label: 'Blue', hex: '#bfdbfe' },
  { id: 'green', label: 'Green', hex: '#bbf7d0' },
];

export function useHighlights() {
  const [highlights, setHighlights] = useState({});

  const addHighlight = useCallback((messageId, startOffset, endOffset, color, comment) => {
    const highlightId = crypto.randomUUID();
    setHighlights((prev) => ({
      ...prev,
      [messageId]: [
        ...(prev[messageId] || []),
        {
          id: highlightId,
          startOffset,
          endOffset,
          color,
          comment,
          createdAt: Date.now(),
        },
      ],
    }));
    return highlightId;
  }, []);

  const removeHighlight = useCallback((messageId, highlightId) => {
    setHighlights((prev) => ({
      ...prev,
      [messageId]: (prev[messageId] || []).filter((h) => h.id !== highlightId),
    }));
  }, []);

  const updateHighlight = useCallback((messageId, highlightId, updates) => {
    setHighlights((prev) => ({
      ...prev,
      [messageId]: (prev[messageId] || []).map((h) =>
        h.id === highlightId ? { ...h, ...updates } : h
      ),
    }));
  }, []);

  const getHighlightsForMessage = useCallback(
    (messageId) => highlights[messageId] || [],
    [highlights]
  );

  return {
    highlights,
    addHighlight,
    removeHighlight,
    updateHighlight,
    getHighlightsForMessage,
    COLOR_OPTIONS,
  };
}
