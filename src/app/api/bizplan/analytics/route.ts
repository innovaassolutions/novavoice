import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { viewId, investorId, sections } = body;

  if (!viewId || !investorId || !Array.isArray(sections) || sections.length === 0) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const rows = sections.map((s: { sectionId: string; timeSpent: number; enteredAt: string; exitedAt: string | null }) => ({
    view_id: viewId,
    investor_id: investorId,
    section_id: s.sectionId,
    time_spent: s.timeSpent,
    entered_at: s.enteredAt,
    exited_at: s.exitedAt,
  }));

  const { error } = await supabaseAdmin
    .from("bizplan_section_analytics")
    .insert(rows);

  if (error) {
    return NextResponse.json({ error: "Failed to save analytics" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
