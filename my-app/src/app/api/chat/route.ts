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

    console.log("Chat request received. Message:", message.substring(0, 50) + "...", "History length:", history?.length ?? 0);

    // Validate and parse history - only include messages with valid role and content
    const parsedHistory = history ? history
      .filter((chat: any) => {
        // Filter out any messages that don't have proper structure
        if (!chat || typeof chat !== 'object') return false;
        if (!chat.role || !chat.content) {
          console.warn("Skipping invalid message in history:", chat);
          return false;
        }
        return true;
      })
      .map((chat: any) => {
        // Validate role is either 'user' or 'model'
        const role = chat.role === 'model' || chat.role === 'assistant' ? 'model' : 'user';
        const content = String(chat.content).trim();
        
        if (!content) {
          console.warn("Skipping message with empty content, role:", chat.role);
          return null;
        }
        
        return {
          role: role,
          parts: [{ text: content }]
        };
      })
      .filter((msg: any) => msg !== null)
      : [];

    console.log("Parsed history:", parsedHistory.length, "messages");

    const modelInstructions = mode == "role" ? createGemRole(task) : "";

    const formatInstructions = modelInstructions
      ? modelInstructions + ". Important: Format your response in plain text only..."
      : "Important: Format your response in plain text only...";

    const chat = geminiAI.chats.create({
      model: "gemini-3.1-flash-lite-preview",
      config: {
        systemInstruction: formatInstructions
      },
      history: parsedHistory,
    });

    const response = await chat.sendMessage({
      message: message,
    });

    // Extract text from the Gemini response
    // response.text is a getter property that returns the text content
    let responseText: string;
    
    if (typeof response === 'string') {
      responseText = response;
    } else if (typeof response?.text === 'string') {
      // response.text is a string getter property from GenerateContentResponse
      responseText = response.text;
    } else {
      console.error("Unexpected Gemini response structure:", response);
      throw new Error("Could not extract text from API response. Response structure: " + JSON.stringify(response));
    }

    // Validate that we got actual text
    if (!responseText || typeof responseText !== 'string' || responseText.trim().length === 0) {
      console.error("API returned empty or invalid response:", responseText);
      throw new Error("API returned an empty response");
    }

    console.log("✓ Chat API response received:", responseText.substring(0, 100) + "...");

    return NextResponse.json({
      status: 200,
      data: responseText,
    });








  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ Chat API Error:", errorMessage);
    console.error("Full error details:", error);
    
    // Extract status code if available
    let status = 500;
    let userMessage = "An error occurred while processing your message. Please try again.";
    
    if (error instanceof Error && (error as any)?.status) {
      status = (error as any).status;
    }
    
    // Provide specific user messages based on error type
    if (status === 503) {
      userMessage = "The AI service is currently experiencing high demand. This is temporary. Please try again in a few moments.";
    } else if (status === 400 || errorMessage.includes("INVALID_ARGUMENT")) {
      userMessage = "There was a formatting error with the message. Please try again with a different question.";
      console.error("Data validation error - check message history structure");
    } else if (status === 429) {
      userMessage = "Too many requests. Please wait a moment before trying again.";
    } else if (status === 401 || status === 403) {
      userMessage = "Authentication error with AI service. Please contact support.";
      console.error("Auth error - check GEMINI_API_KEY");
    }
    
    return NextResponse.json(
      { error: { message: userMessage, details: errorMessage } },
      { status }
    );
  }


}
