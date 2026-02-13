import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token || typeof token !== "string") {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  // Look up token
  const { data: tokenRow, error: tokenError } = await supabaseAdmin
    .from("investor_tokens")
    .select("id, investor_id, is_active, expires_at")
    .eq("token", token.trim())
    .single();

  if (tokenError || !tokenRow) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (!tokenRow.is_active) {
    return NextResponse.json({ error: "Token has been deactivated" }, { status: 401 });
  }

  if (tokenRow.expires_at && new Date(tokenRow.expires_at) < new Date()) {
    return NextResponse.json({ error: "Token has expired" }, { status: 401 });
  }

  // Update last_used_at
  await supabaseAdmin
    .from("investor_tokens")
    .update({ last_used_at: new Date().toISOString() })
    .eq("id", tokenRow.id);

  // Create view record
  const userAgent = req.headers.get("user-agent") || null;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;

  const { data: view, error: viewError } = await supabaseAdmin
    .from("bizplan_views")
    .insert({
      investor_id: tokenRow.investor_id,
      token_id: tokenRow.id,
      user_agent: userAgent,
      ip_address: ip,
    })
    .select("id")
    .single();

  if (viewError) {
    return NextResponse.json({ error: "Failed to create view" }, { status: 500 });
  }

  return NextResponse.json({
    viewId: view.id,
    investorId: tokenRow.investor_id,
  });
}
