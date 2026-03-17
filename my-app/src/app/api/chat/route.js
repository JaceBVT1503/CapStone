import { parseChatRequest } from "../../../lib/chatContract";
import { getSystemPrompt, isValidRoleId } from "../../../lib/prompts";
import { OpenAI } from "openai";

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init.headers || {}),
    },
  });
}

/**
 * Deterministic stub generator so the UI works end-to-end
 * without selecting an AI provider yet.
 *
 * @param {{ mode: "plain"|"role", role: string | null, message: string, history: {role:"user"|"assistant",content:string}[] }} req
 */
function generateStubAssistant(req) {
  const roleLabel =
    req.mode === "role" && isValidRoleId(req.role) ? req.role : "RegularChat";

  const lastUserMessages = req.history.filter((m) => m.role === "user").slice(-3);
  const contextLine =
    lastUserMessages.length > 0
      ? `Recent context: ${lastUserMessages.map((m) => m.content).join(" | ")}`
      : "Recent context: (none)";

  // Keep it short but clearly demonstrates that the role prompt is applied.
  if (roleLabel === "MathTutor") {
    return [
      "Math Tutor (stub):",
      `You asked: "${req.message}"`,
      "",
      "1) Identify what is being asked.",
      "2) List known values/constraints.",
      "3) Choose a method/formula and compute step-by-step.",
      "",
      "If you paste the full problem statement (including given numbers), I can walk through it cleanly.",
      "",
      contextLine,
    ].join("\n");
  }

  if (roleLabel === "WritingGrammarExpert") {
    return [
      "Writing / Grammar Expert (stub):",
      `You asked: "${req.message}"`,
      "",
      "If you want edits, paste the exact text you want improved.",
      "",
      "Format I’ll use:",
      "- Corrected version",
      "- Key changes (brief bullets)",
      "- Optional alternatives",
      "",
      contextLine,
    ].join("\n");
  }

  if (roleLabel === "SeniorSoftwareEngineerDebugger") {
    return [
      "Senior Software Engineer (Debugging) (stub):",
      `You asked: "${req.message}"`,
      "",
      "Quick triage questions:",
      "- What language/framework?",
      "- Exact error message + stack trace?",
      "- Steps to reproduce?",
      "",
      "Suggested debugging plan:",
      "1) Reproduce reliably and capture logs",
      "2) Minimize the failing case",
      "3) Validate assumptions with small experiments",
      "4) Apply a targeted fix + regression check",
      "",
      contextLine,
    ].join("\n");
  }

  return [
    "Assistant (stub):",
    `You asked: "${req.message}"`,
    "",
    "I’m currently running in stub mode (AI provider not connected yet).",
    "Your request was received successfully via /api/chat.",
    "",
    contextLine,
  ].join("\n");
}

export async function POST(request) {
  let body = null;
  try {
    body = await request.json();
  } catch {
    return json(
      { error: { code: "invalid_json", message: "Request body must be valid JSON." } },
      { status: 400 }
    );
  }

  const parsed = parseChatRequest(body);
  if (!parsed.ok) {
    return json({ error: parsed.error }, { status: 400 });
  }

  const { message, mode, role, history } = parsed.value;
  const systemPrompt = getSystemPrompt(mode, role);

  // Provider-agnostic payload (what we’d send to an AI provider later).
  const promptPackage = {
    system: systemPrompt,
    messages: [
      ...(Array.isArray(history) ? history : []),
      { role: "user", content: message },
    ],
  };



  const assistantText = generateStubAssistant({ mode, role, message, history: history ?? [] });


  const response = await client.responses.create({
    model: "gpt-5",
    reasoning: {effort: "low"},
    input: [
      {
        role: "developer",
        content: systemPrompt,
      },
      {
        role: "user",
        content: message
      },
    ],
  });

  const aiJson = await response.json();
  console.log(aiJson);


  // return json({
  //   assistant: { role: "assistant", content: assistantText },
  //   meta: {
  //     mode,
  //     role: mode === "role" ? role : null,
  //     stub: true,
  //     // Helpful for debugging / later provider swap.
  //     promptPackage,
  //   },
  // });
}

