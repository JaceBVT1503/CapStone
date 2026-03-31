import type { NextRequest } from "next/server";
import { parseChatRequest } from "../../../lib/chatContract";
import { getSystemPrompt } from "../../../lib/prompts";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const geminiAI = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

function json(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
}

/** Minimal shape used from Gemini generateContent response */
interface GeminiGenerateContentResult {
  text?: string;
}

export async function POST(request: NextRequest) {
  let body: unknown = null;
  try {
    body = await request.json();
  } catch {
    return json(
      {
        error: {
          code: "invalid_json",
          message: "Request body must be valid JSON.",
        },
      },
      { status: 400 }
    );
  }

  const parsed = parseChatRequest(body);
  if (!parsed.ok) {
    return json({ error: parsed }, { status: 400 });
  }

  const { message, mode, role } = parsed.value;
  const systemPrompt = getSystemPrompt(mode, role);

  const gemResponse = (await geminiAI.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: message,
    config: {
      systemInstruction: systemPrompt,
    },
  })) as GeminiGenerateContentResult;

  console.log("Here is the gemini response:", gemResponse.text);

  return json({
    assistant: { role: "assistant" as const, content: gemResponse.text },
    meta: {
      mode,
      role: mode === "role" ? role : null,
      stub: true,
      promptPackage: gemResponse,
    },
  });
}
