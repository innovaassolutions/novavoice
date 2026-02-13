import type { Metadata } from "next";
import BizPlanGate from "./BizPlanGate";

export const metadata: Metadata = {
  title: "Business Plan — NovaVoice Investment Opportunity",
  robots: { index: false, follow: false },
};

export default function BizPlanPage() {
  return <BizPlanGate />;
}
