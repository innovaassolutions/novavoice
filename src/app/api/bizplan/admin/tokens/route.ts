import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { verifyAdmin } from "@/lib/supabase/auth-guard";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const { error: authError } = await verifyAdmin(req);
  if (authError) return authError;

  const body = await req.json();
  const { investor_id, expires_at } = body;

  if (!investor_id) {
    return NextResponse.json({ error: "investor_id is required" }, { status: 400 });
  }

  const token = crypto.randomUUID();

  const { data, error } = await supabaseAdmin
    .from("investor_tokens")
    .insert({
      investor_id,
      token,
      is_active: true,
      expires_at: expires_at || null,
      last_used_at: null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
