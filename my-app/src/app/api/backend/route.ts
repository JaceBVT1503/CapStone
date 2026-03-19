import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {

    const body = await request.json();

    const { codeVer, aiModel, company, mode, role, name, grade, major, aiUse } = body;

    try {

        const supabase = getSupabaseServerClient();
        const { data: studyRow, error: genError } = await supabase
            .from("general_info")
            .insert(
                {
                    code_ver: codeVer,
                    ai_model: aiModel,
                    company: company,
                    mode: mode,
                    role: role,
                },
            )
            .select("test_id")
            .single();
        
        if (!studyRow?.test_id) {
            throw genError ?? new Error("Error with adding to general info table");
        }
        const testId = studyRow?.test_id;

        const { data: userRow, error: userError} = await supabase
            .from("user_info")
            .insert(
                {
                    test_id: testId,
                    name: name,
                    year: grade,
                    major: major,
                    ai_knowledge: aiUse === "yes" ? true : false,
                },
            )
            .select("test_id")
            .single();

        if (!userRow?.test_id) {
            throw userError ?? new Error("Error with adding to user info table");
        }





    } catch (err) {
        return NextResponse.json(
        { error: { code: "backend_failure", message: err } },
        { status: 400 }
        );
    }






}