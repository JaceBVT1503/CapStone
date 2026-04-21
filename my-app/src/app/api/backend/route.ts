import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { parseStudyMessages } from "@/utils/prompt-generator";

export async function POST(request: NextRequest) {

  const body = await request.json();

  
  const { userObj, studyOne, studyTwo } = body;


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
          ai_knowledge: aiUse === "yes" ? true : false,
        },
      )
      .select("study_id")
      .single();

    if (!userRow?.study_id) {
      throw userError ?? new Error("Error with adding user");
    }

    const studyId = userRow?.study_id;

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
    }
    const surveyOne = studyOne?.surveyResponse;
    const surveyTwo = studyTwo?.surveyResponse;

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

    const parsedSurveys = [parsedSurveyOne, parsedSurveyTwo];

    if (parsedSurveys.length > 0) {
      const { error: surveyError } = await supabase
        .from("survey_info")
        .insert(parsedSurveys);

      if (surveyError) {
        console.error("survey insert error", surveyError);
        throw surveyError;
      }
    }

    return NextResponse.json({
      status: 200
    });





  } catch (err) {
    return NextResponse.json(
      { error: { code: "backend_failure", message: err } },
      { status: 400 }
    );
  }


}