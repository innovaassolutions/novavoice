import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const { investorId, amount } = await req.json();

  if (!investorId || typeof investorId !== "string") {
    return NextResponse.json({ error: "Invalid investor" }, { status: 400 });
  }

  const parsedAmount = Number(amount);
  if (!parsedAmount || parsedAmount < 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  // Verify investor exists
  const { data: investor, error: lookupError } = await supabaseAdmin
    .from("investors")
    .select("id")
    .eq("id", investorId)
    .single();

  if (lookupError || !investor) {
    return NextResponse.json({ error: "Investor not found" }, { status: 404 });
  }

  const { error: updateError } = await supabaseAdmin
    .from("investors")
    .update({
      commitment_amount: parsedAmount,
      committed_at: new Date().toISOString(),
    })
    .eq("id", investorId);

  if (updateError) {
    return NextResponse.json({ error: "Failed to save commitment" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
