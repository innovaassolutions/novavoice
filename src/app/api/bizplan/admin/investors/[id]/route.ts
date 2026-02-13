import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { verifyAdmin } from "@/lib/supabase/auth-guard";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error: authError } = await verifyAdmin(req);
  if (authError) return authError;

  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("investors")
    .select("*, investor_tokens(*), bizplan_views(*)")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: "Investor not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error: authError } = await verifyAdmin(req);
  if (authError) return authError;

  const { id } = await params;
  const body = await req.json();
  const { name, email, phone, notes } = body;

  const updates: Record<string, string | null> = {};
  if (name !== undefined) updates.name = name;
  if (email !== undefined) updates.email = email;
  if (phone !== undefined) updates.phone = phone || null;
  if (notes !== undefined) updates.notes = notes || null;

  const { data, error } = await supabaseAdmin
    .from("investors")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error: authError } = await verifyAdmin(req);
  if (authError) return authError;

  const { id } = await params;

  const { error } = await supabaseAdmin
    .from("investors")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
