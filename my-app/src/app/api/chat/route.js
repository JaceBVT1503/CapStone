import { parseChatRequest } from "../../../lib/chatContract";
import { getSystemPrompt, isValidRoleId } from "../../../lib/prompts";
import { OpenAI } from "openai";
import {GoogleGenAI} from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const geminiAI = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

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


  // GEMINI API REQUEST BELOW
  // ------------------------
  const gemResponse = await geminiAI.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: message,
    config: {
      systemInstruction: systemPrompt,
    },
  });

  //const gemOutput = await gemResponse.json();
  console.log("Here is the gemini response:", gemResponse.text);




  return json({
    assistant: { role: "assistant", content: gemResponse.text },
    meta: {
      mode,
      role: mode === "role" ? role : null,
      stub: true,
      // Helpful for debugging / later provider swap.
      promptPackage: gemResponse,
    },
  });
}

