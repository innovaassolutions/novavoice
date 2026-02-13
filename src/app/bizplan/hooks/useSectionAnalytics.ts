"use client";

import { useEffect, useRef, useCallback } from "react";
import { sections } from "../data/bizplanData";

interface SectionTiming {
  sectionId: string;
  timeSpent: number;
  enteredAt: string;
  exitedAt: string | null;
}

const FLUSH_INTERVAL = 10_000; // 10 seconds

export function useSectionAnalytics(viewId: string | null, investorId: string | null) {
  const timingsRef = useRef<Map<string, SectionTiming>>(new Map());
  const activeRef = useRef<Set<string>>(new Set());
  const intervalTimersRef = useRef<Map<string, ReturnType<typeof setInterval>>>(new Map());

  const flush = useCallback(() => {
    if (!viewId || !investorId) return;

    const entries = Array.from(timingsRef.current.values()).filter((t) => t.timeSpent > 0);
    if (entries.length === 0) return;

    const payload = {
      viewId,
      investorId,
      sections: entries.map((t) => ({
        sectionId: t.sectionId,
        timeSpent: t.timeSpent,
        enteredAt: t.enteredAt,
        exitedAt: t.exitedAt || new Date().toISOString(),
      })),
    };

    // Reset timings after flush
    timingsRef.current = new Map();

    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
    navigator.sendBeacon("/api/bizplan/analytics", blob);
  }, [viewId, investorId]);

  useEffect(() => {
    if (!viewId || !investorId) return;

    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              activeRef.current.add(id);
              if (!timingsRef.current.has(id)) {
                timingsRef.current.set(id, {
                  sectionId: id,
                  timeSpent: 0,
                  enteredAt: new Date().toISOString(),
                  exitedAt: null,
                });
              }
              // Start counting time
              if (!intervalTimersRef.current.has(id)) {
                const timer = setInterval(() => {
                  const timing = timingsRef.current.get(id);
                  if (timing) {
                    timing.timeSpent += 1;
                  }
                }, 1000);
                intervalTimersRef.current.set(id, timer);
              }
            } else {
              activeRef.current.delete(id);
              const timing = timingsRef.current.get(id);
              if (timing) {
                timing.exitedAt = new Date().toISOString();
              }
              // Stop counting
              const timer = intervalTimersRef.current.get(id);
              if (timer) {
                clearInterval(timer);
                intervalTimersRef.current.delete(id);
              }
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    // Periodic flush
    const flushTimer = setInterval(flush, FLUSH_INTERVAL);

    // Flush on page unload
    const handleUnload = () => flush();
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      observers.forEach((o) => o.disconnect());
      clearInterval(flushTimer);
      window.removeEventListener("beforeunload", handleUnload);
      intervalTimersRef.current.forEach((timer) => clearInterval(timer));
      intervalTimersRef.current.clear();
      flush();
    };
  }, [viewId, investorId, flush]);
}
