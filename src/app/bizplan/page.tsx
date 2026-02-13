import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BizPlanClient from "./BizPlanClient";

export const metadata: Metadata = {
  title: "Business Plan — NovaVoice Investment Opportunity",
  robots: { index: false, follow: false },
};

export default async function BizPlanPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  if (!params.token || params.token !== process.env.BIZPLAN_ACCESS_TOKEN) {
    notFound();
  }
  return <BizPlanClient />;
}
