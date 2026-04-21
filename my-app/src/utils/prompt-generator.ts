

export function createInitialPrompt(role: string, followAnswer?: string): string {
  if (role === "ConceptCoach" && followAnswer) {
    return `Can you help me write a short paragraph explaining ${followAnswer}?`;
  }
  else if (role === "InvestmentPortfolio") {
    return `Can you help me build a simple investment portfolio with $10,000?`;
  }
  else if (role === "MobileApp" && followAnswer) {
    return `Can you help me design a social media app about ${followAnswer}?`;
  }
  else if (role === "FitnessProg") {
    return `Can you help me design a fitness plan?`;
  }
  else if (role === "PlantHunger") {
    return `Can you explain photosynthesis to me?`;
  }
  else {
    return "";
  }

}

export function createGemRole(task: string) {

  switch (task) {
    case "ConceptCoach":
      return [
        "Persona: A master educator and communications export who believes in 'Feynman Technique' - if you can explain it simply, you don't understand it well enough.",
        "The Goal: Transform complex jargon into clear, relatable, and engaging explanations.",
        "The Process: 1. Use analogies and metaphors to anchor the concept in real-world terms. 3. Structure the paragraph with a hook, the core 'how-to' and a concluding impact statement.",
        "Guidance: Avoid 'fluff' and keep the explanation clear.",
      ].join("\n");
    case "InvestmentPortfolio":
      return "Imagine you have $10,000 to invest. Choose five stocks that you would include in a simple investment portfolio. Decide how much of the $10,000 you would invest in each stock. For each stock, write one or two sentences explaining why you chose that company as an investment.";
    case "MobileApp":
      return "Imagine you are creating a new mobile app that solves a common everyday problem. Describe what the app would do and list three key features it would include. Briefly explain why those features would be useful to users.";
    case "FitnessProg":
      return "Imagine you are creating a fitness program of your choice. Decide what exercises and activities you would include and briefly explain why you chose them. Your goal is to create a simple program that makes good use of the time.";
    case "PlantHunger":
      return "Imagine you are a student learning about photosynthesis. Your task is to explain how photosynthesis works to someone who is a beginner and learning about the topic for the first time.";
    default:
      return "";

  }
}

type ParsedChatRow = {
  user_prompt: string | null;
  ai_response: string | null;
  role: string | null;
  highlighted_text: string | null;
  comment: string | null;
  study_id: number | string;
  study_number: number;
};

export function parseStudyMessages(
  study: any,
  studyId: number | string,
  studyNumber: number
): ParsedChatRow[] {
  const logs = study?.history?.messageLog ?? [];

  return logs.reduce((rows: ParsedChatRow[], msg: any, idx: number, arr: any[]) => {
    // Build one DB row per user turn, optionally paired with following model turn.
    if (msg?.role !== "user") return rows;

    const nextMsg = arr[idx + 1];
    const aiMsg = nextMsg?.role === "model" ? nextMsg : null;

    rows.push({
      user_prompt: msg?.content ?? null,
      ai_response: aiMsg?.content ?? null,
      role: study?.mode ?? null, // plain or role mode for this study
      highlighted_text: msg?.hightlight ?? aiMsg?.hightlight ?? null,
      comment: msg?.comment ?? aiMsg?.comment ?? null,
      study_id: studyId,
      study_number: studyNumber,
    });

    return rows;
  }, []);
}

