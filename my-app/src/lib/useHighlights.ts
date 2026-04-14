import { useState, useCallback } from "react";

export type HighlightColorId = "yellow" | "pink" | "blue" | "green";

export interface Highlight {
  id: string;
  selectedText: string; // The actual text that was highlighted
  color: HighlightColorId;
  comment: string;
  createdAt: number;
}

export type HighlightsState = Record<string, Highlight[]>;

export interface ColorOption {
  id: HighlightColorId;
  label: string;
  hex: string;
}

const COLOR_OPTIONS: ColorOption[] = [
  { id: "yellow", label: "Yellow", hex: "#fef3c7" },
  { id: "pink", label: "Pink", hex: "#fbcfe8" },
  { id: "blue", label: "Blue", hex: "#bfdbfe" },
  { id: "green", label: "Green", hex: "#bbf7d0" },
];

export function useHighlights() {
  const [highlights, setHighlights] = useState<HighlightsState>({});

  const addHighlight = useCallback(
    (
      messageId: string,
      selectedText: string,
      color: HighlightColorId,
      comment: string
    ) => {
      const highlightId = crypto.randomUUID();
      setHighlights((prev) => ({
        ...prev,
        [messageId]: [
          ...(prev[messageId] || []),
          {
            id: highlightId,
            selectedText,
            color,
            comment,
            createdAt: Date.now(),
          },
        ],
      }));
      return highlightId;
    },
    []
  );

  const removeHighlight = useCallback((messageId: string, highlightId: string) => {
    setHighlights((prev) => ({
      ...prev,
      [messageId]: (prev[messageId] || []).filter((h) => h.id !== highlightId),
    }));
  }, []);

  const updateHighlight = useCallback(
    (messageId: string, highlightId: string, updates: Partial<Highlight>) => {
      setHighlights((prev) => ({
        ...prev,
        [messageId]: (prev[messageId] || []).map((h) =>
          h.id === highlightId ? { ...h, ...updates } : h
        ),
      }));
    },
    []
  );

  const getHighlightsForMessage = useCallback(
    (messageId: string) => highlights[messageId] || [],
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
