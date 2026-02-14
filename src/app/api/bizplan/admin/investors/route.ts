import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { verifyAdmin } from "@/lib/supabase/auth-guard";

export async function GET(req: NextRequest) {
  const { error: authError } = await verifyAdmin(req);
  if (authError) return authError;

  const { data, error } = await supabaseAdmin
    .from("investors")
    .select("*, investor_tokens(id, token, is_active, created_at, expires_at, last_used_at), bizplan_views(id)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { error: authError } = await verifyAdmin(req);
  if (authError) return authError;

  const body = await req.json();
  const { name, email, phone, notes } = body;

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("investors")
    .insert({ name, email, phone: phone || null, notes: notes || null })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "An investor with this email already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
