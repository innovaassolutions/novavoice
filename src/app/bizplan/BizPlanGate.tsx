"use client";

import { useBizplanAuth } from "./hooks/useBizplanAuth";
import TokenEntryForm from "./components/TokenEntryForm";
import BizPlanClient from "./BizPlanClient";

export default function BizPlanGate() {
  const { auth, loading, error, validate } = useBizplanAuth();

  // Still checking sessionStorage
  if (loading && !auth) {
    return null;
  }

  // Authenticated — render the business plan
  if (auth) {
    return <BizPlanClient viewId={auth.viewId} investorId={auth.investorId} />;
  }

  // Show token entry form
  return <TokenEntryForm onSubmit={validate} loading={loading} error={error} />;
}
