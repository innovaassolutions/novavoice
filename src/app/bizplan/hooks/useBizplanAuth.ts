"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "bizplan_auth";

interface BizplanAuth {
  token: string;
  viewId: string;
  investorId: string;
}

export function useBizplanAuth() {
  const [auth, setAuth] = useState<BizplanAuth | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setAuth(JSON.parse(stored));
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const validate = useCallback(async (token: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/bizplan/validate-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid token");
        setLoading(false);
        return false;
      }

      const authData: BizplanAuth = {
        token,
        viewId: data.viewId,
        investorId: data.investorId,
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
      setAuth(authData);
      setLoading(false);
      return true;
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
      return false;
    }
  }, []);

  return { auth, loading, error, validate };
}
