import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { verifyAdmin } from "@/lib/supabase/auth-guard";

export async function GET(req: NextRequest) {
  const { error: authError } = await verifyAdmin(req);
  if (authError) return authError;

  const { searchParams } = new URL(req.url);
  const investorId = searchParams.get("investor_id");

  let query = supabaseAdmin
    .from("bizplan_section_analytics")
    .select("*, bizplan_views(viewed_at, user_agent, ip_address)")
    .order("created_at", { ascending: false });

  if (investorId) {
    query = query.eq("investor_id", investorId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
