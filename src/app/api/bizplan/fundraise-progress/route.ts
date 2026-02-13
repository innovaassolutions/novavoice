import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("investors")
    .select("commitment_amount");

  if (error) {
    return NextResponse.json({ committed: 0, goal: 25000 });
  }

  const committed = (data || []).reduce(
    (sum, inv) => sum + (inv.commitment_amount || 0),
    0
  );

  return NextResponse.json({ committed, goal: 25000 });
}
