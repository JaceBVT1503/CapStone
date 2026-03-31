import { isValidRoleId } from "./prompts";
import type { ChatMode } from "./prompts";

export const MODES = ["plain", "role"] as const;

export interface ChatHistoryItem {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  message: string;
  mode: ChatMode;
  role: string | null;
  history: ChatHistoryItem[];
}

export interface ParseErrorBody {
  code: string;
  message: string;
  details?: unknown;
}

export type ParseResult =
  | { ok: true; value: ChatRequest }
  | { ok: false; error: ParseErrorBody };

export function parseChatRequest(body: unknown): ParseResult {
  if (!body || typeof body !== "object") {
    return {
      ok: false,
      error: { code: "invalid_body", message: "Body must be a JSON object." },
    };
  }

  const o = body as Record<string, unknown>;

  const message = typeof o.message === "string" ? o.message.trim() : "";
  if (!message) {
    return {
      ok: false,
      error: { code: "missing_message", message: "Message is required." },
    };
  }

  const mode: ChatMode =
    typeof o.mode === "string" && (MODES as readonly string[]).includes(o.mode)
      ? (o.mode as ChatMode)
      : "plain";

  const role = o.role as string ?? null;
  if (mode === "role" && !isValidRoleId(role)) {
    return {
      ok: false,
      error: {
        code: "invalid_role",
        message: "Role is required when mode is 'role'.",
      },
    };
  }

  const historyRaw = Array.isArray(o.history) ? o.history : [];
  const history: ChatHistoryItem[] = historyRaw
    .slice(-24)
    .map((item): ChatHistoryItem | null => {
      const row = item as { role?: unknown; content?: unknown } | null;
      const r =
        row?.role === "user" || row?.role === "assistant" ? row.role : null;
      const c = typeof row?.content === "string" ? row.content : "";
      if (!r || !c) return null;
      return { role: r, content: c };
    })
    .filter((item): item is ChatHistoryItem => item !== null);

  return { ok: true, value: { message, mode, role, history } };
}
