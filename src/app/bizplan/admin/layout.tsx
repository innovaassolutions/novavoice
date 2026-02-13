"use client";

import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { supabaseBrowser } from "@/lib/supabase/browser";
import AdminLogin from "./components/AdminLogin";
import AdminNav from "./components/AdminNav";
import type { Session } from "@supabase/supabase-js";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabaseBrowser.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: { subscription } } = supabaseBrowser.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;

  if (!session) {
    return <AdminLogin onLogin={() => {}} />;
  }

  return (
    <Box minH="100vh" bg="#f8fafc">
      <AdminNav />
      <Box maxW="1200px" mx="auto" px={6} py={8}>
        {children}
      </Box>
    </Box>
  );
}
