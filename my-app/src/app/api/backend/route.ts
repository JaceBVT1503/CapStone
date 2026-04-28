import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { parseStudyMessages } from "@/utils/prompt-generator";

export async function POST(request: NextRequest) {

  const body = await request.json();

  
  const { userObj, studyOne, studyTwo } = body;

  // Log incoming data for research purposes
  console.log("=== BACKEND DATA SUBMISSION ===");
  console.log("User Object:", userObj);
  console.log("Study One:", studyOne);
  console.log("Study Two:", studyTwo);

  try {

    const { name, grade, major, aiUse } = userObj;

    const supabase = getSupabaseServerClient();

    const { data: userRow, error: userError } = await supabase
      .from("user_info")
      .insert(
        {
          name: name,
          year: grade,
          major: major,
          ai_knowledge: aiUse,
        },
      )
      .select("study_id")
      .single();

    if (!userRow?.study_id) {
      throw userError ?? new Error("Error with adding user");
    }

    const studyId = userRow?.study_id;
    console.log("✓ User inserted with study_id:", studyId);

    const parsedStudyOne = parseStudyMessages(studyOne, studyId, 1);
    const parsedStudyTwo = parseStudyMessages(studyTwo, studyId, 2);
    const parsedChats = [...parsedStudyOne, ...parsedStudyTwo];

    if (parsedChats.length > 0) {
      const { error: aiError } = await supabase
        .from("ai_info")
        .insert(parsedChats);

      if (aiError) {
        throw aiError;
      }
      console.log("✓ AI chat history inserted:", parsedChats.length, "messages");
    }
    const surveyOne = studyOne?.surveyResponse;
    const surveyTwo = studyTwo?.surveyResponse;

    console.log("Survey One data:", surveyOne);
    console.log("Survey Two data:", surveyTwo);

    const parsedSurveyOne = {
      survey_id: studyId,
      final_answer: surveyOne?.finalAnswer,
      helpfulness: surveyOne?.helpfulness,
      clarity: surveyOne?.clarity,
      confidence: surveyOne?.confidence,
      understanding: surveyOne?.understanding,
      speed: surveyOne?.speed,
      satisfaction: surveyOne?.satisfaction,
      likely_to_use: surveyOne?.likelyToUse,
      highlight_helpfulness: surveyOne?.highlightHelpfulness,
      highlight_reason: surveyOne?.highlightReason,
      study_number: 1
    };

    const parsedSurveyTwo = {
      survey_id: studyId,
      final_answer: surveyTwo?.finalAnswer,
      helpfulness: surveyTwo?.helpfulness,
      clarity: surveyTwo?.clarity,
      confidence: surveyTwo?.confidence,
      understanding: surveyTwo?.understanding,
      speed: surveyTwo?.speed,
      satisfaction: surveyTwo?.satisfaction,
      likely_to_use: surveyTwo?.likelyToUse,
      highlight_helpfulness: surveyTwo?.highlightHelpfulness,
      highlight_reason: surveyTwo?.highlightReason,
      study_number: 2
    };

    console.log("Parsed Survey One for DB:", parsedSurveyOne);
    console.log("Parsed Survey Two for DB:", parsedSurveyTwo);

    const parsedSurveys = [parsedSurveyOne, parsedSurveyTwo];

    if (parsedSurveys.length > 0) {
      const { error: surveyError } = await supabase
        .from("survey_info")
        .insert(parsedSurveys);

      if (surveyError) {
        console.error("survey insert error", surveyError);
        throw surveyError;
      }
      console.log("✓ Survey responses inserted successfully");
    }

    return NextResponse.json({
      status: 200
    });

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("❌ Backend submission failed:", errorMessage);
    console.error("Full error:", err);
    
    return NextResponse.json(
      { error: { code: "backend_failure", message: errorMessage } },
      { status: 400 }
    );
  }


}