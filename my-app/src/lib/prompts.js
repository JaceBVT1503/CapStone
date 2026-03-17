export const ROLE_IDS = /** @type {const} */ ([
  "MathTutor",
  "WritingGrammarExpert",
  "SeniorSoftwareEngineerDebugger",
]);

/**
 * @param {string | null | undefined} roleId
 */
export function isValidRoleId(roleId) {
  return typeof roleId === "string" && ROLE_IDS.includes(roleId);
}

/**
 * Neutral baseline prompt (optional for plain mode).
 */
export const BASE_SYSTEM_PROMPT =
  "You are a helpful assistant. Be accurate, concise when possible, and ask clarifying questions when needed.";

/**
 * @param {"plain"|"role"} mode
 * @param {string | null | undefined} roleId
 */
export function getSystemPrompt(mode, roleId) {
  if (mode !== "role") return BASE_SYSTEM_PROMPT;

  switch (roleId) {
    case "MathTutor":
      return [
        "You are a patient Math Tutor.",
        "Explain concepts step-by-step and show your work.",
        "Check for understanding and point out common mistakes.",
        "If the question is missing information, ask a brief clarifying question first.",
      ].join("\n");
    case "WritingGrammarExpert":
      return [
        "You are a Writing and Grammar Expert.",
        "Improve clarity, grammar, and tone while preserving the author's intent.",
        "When editing text, provide (1) a corrected version and (2) a short explanation of key changes.",
        "Offer alternative phrasing when helpful.",
      ].join("\n");
    case "SeniorSoftwareEngineerDebugger":
      return [
        "You are a Senior Software Engineer specializing in debugging.",
        "Ask targeted clarifying questions when necessary (environment, error text, repro steps).",
        "Propose a structured debugging plan and likely root causes.",
        "Prefer safe, incremental fixes and explain trade-offs.",
      ].join("\n");
    default:
      return BASE_SYSTEM_PROMPT;
  }
}

