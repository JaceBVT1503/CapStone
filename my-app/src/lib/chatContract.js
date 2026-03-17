import { isValidRoleId } from "./prompts";

export const MODES = /** @type {const} */ (["plain", "role"]);

/**
 * @typedef {{ role: "user"|"assistant", content: string }} ChatHistoryItem
 * @typedef {{
 *   message: string,
 *   mode: "plain"|"role",
 *   role?: string | null,
 *   history?: ChatHistoryItem[]
 * }} ChatRequest
 */

/**
 * @param {any} body
 * @returns {{ ok: true, value: ChatRequest } | { ok: false, error: { code: string, message: string, details?: any } }}
 */
export function parseChatRequest(body) {
  if (!body || typeof body !== "object") {
    return { ok: false, error: { code: "invalid_body", message: "Body must be a JSON object." } };
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    return { ok: false, error: { code: "missing_message", message: "Message is required." } };
  }

  /** @type {"plain"|"role"} */
  const mode = MODES.includes(body.mode) ? body.mode : "plain";

  const role = body.role ?? null;
  if (mode === "role" && !isValidRoleId(role)) {
    return {
      ok: false,
      error: { code: "invalid_role", message: "Role is required when mode is 'role'." },
    };
  }

  const historyRaw = Array.isArray(body.history) ? body.history : [];
  /** @type {ChatHistoryItem[]} */
  const history = historyRaw
    .slice(-24)
    .map((item) => {
      const r = item?.role === "user" || item?.role === "assistant" ? item.role : null;
      const c = typeof item?.content === "string" ? item.content : "";
      if (!r || !c) return null;
      return { role: r, content: c };
    })
    .filter(Boolean);

  return { ok: true, value: { message, mode, role, history } };
}

