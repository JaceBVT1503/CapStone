import type { NextRequest } from "next/server";
import { parseChatRequest } from "../../../lib/chatContract";
import { getSystemPrompt } from "../../../lib/prompts";
import { OpenAI } from "openai";

const ARC_API_KEY = process.env.ARC_API_KEY;

const arcClient = new OpenAI({
  apiKey: ARC_API_KEY,
  baseURL: "https://llm-api.arc.vt.edu/api/v1",
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

  const { message, mode, taskId, history } = parsed.value;
  const systemPrompt = getSystemPrompt(mode, taskId);

  try {
    // Build messages array with system prompt + history + current message
    const messages = [
      {
        role: "system" as const,
        content: systemPrompt,
      },
      ...history.map((h) => ({
        role: h.role === "user" ? ("user" as const) : ("assistant" as const),
        content: h.content,
      })),
      {
        role: "user" as const,
        content: message,
      },
    ];

    const arcResponse = await arcClient.chat.completions.create({
      model: "gpt-oss-120b",
      messages,
    });

    const responseText = arcResponse.choices[0]?.message?.content;

    console.log("Here is the ARC/VT API response:", responseText);

    if (!responseText) {
      console.error("ARC/VT API returned no text:", arcResponse);
      return json(
        {
          error: {
            code: "invalid_response",
            message: "ARC/VT API returned no content.",
          },
        },
        { status: 500 }
      );
    }

    return json({
      assistant: { role: "assistant" as const, content: responseText },
      meta: {
        mode,
        taskId: mode === "role" ? taskId : null,
        stub: true,
        promptPackage: arcResponse,
      },
    });
  } catch (error) {
    console.error("Error calling ARC/VT API:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return json(
      {
        error: {
          code: "arc_error",
          message: `Failed to call ARC/VT API: ${errorMessage}`,
        },
      },
      { status: 500 }
    );
  }
}
