import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("bizplan_research_papers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Generate signed download URLs (valid for 1 hour)
  const papers = await Promise.all(
    (data || []).map(async (paper) => {
      const { data: urlData } = await supabaseAdmin.storage
        .from("research-papers")
        .createSignedUrl(paper.file_path, 3600);

      return {
        ...paper,
        download_url: urlData?.signedUrl || null,
      };
    })
  );

  return NextResponse.json(papers);
}
