import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { verifyAdmin } from "@/lib/supabase/auth-guard";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error: authError } = await verifyAdmin(req);
  if (authError) return authError;

  const { id } = await params;

  // Fetch the paper to get the file path
  const { data: paper, error: fetchError } = await supabaseAdmin
    .from("bizplan_research_papers")
    .select("file_path")
    .eq("id", id)
    .single();

  if (fetchError || !paper) {
    return NextResponse.json({ error: "Paper not found" }, { status: 404 });
  }

  // Delete from storage
  await supabaseAdmin.storage
    .from("research-papers")
    .remove([paper.file_path]);

  // Delete from database
  const { error: deleteError } = await supabaseAdmin
    .from("bizplan_research_papers")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
