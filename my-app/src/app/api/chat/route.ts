import { NextRequest, NextResponse } from "next/server";
import { parseChatRequest } from "../../../lib/chatContract";
import { getSystemPrompt } from "../../../lib/prompts";
import { GoogleGenAI } from "@google/genai";
import { createGemRole } from "@/utils/prompt-generator";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const geminiAI = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});




export async function POST(request: NextRequest) {

  const body = await request.json();

  try {

    const { message, mode, task, history } = body;

    const modelInstructions = mode == "role" ? createGemRole(task) : "";


    const parsedHistory = history ? history.map((chat) => {
      return {
        role: chat.role,
        parts: [{ text: chat.content }]
      }
    }) : [];

    const chat = geminiAI.chats.create({
      model: "gemini-3.1-flash-lite-preview",
      config: {
        systemInstruction: modelInstructions
      },
      history: parsedHistory,
    });

    const response = await chat.sendMessage({
      message: message,
    });

    const responseText = response.text;

    return NextResponse.json({
      status: 200,
      data: responseText,
    });








  } catch (error) {
    const status = error?.status ?? 500;
    return NextResponse.json(
      { error: error?.message ?? "Unknown error" },
      { status }
    );
  }


}
