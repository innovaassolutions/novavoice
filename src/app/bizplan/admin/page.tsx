"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { supabaseBrowser } from "@/lib/supabase/browser";
import InvestorTable from "./components/InvestorTable";
import InvestorForm from "./components/InvestorForm";
import type { Investor, InvestorToken } from "@/types/supabase";

interface InvestorWithTokens extends Investor {
  investor_tokens: InvestorToken[];
}

export default function AdminDashboard() {
  const [investors, setInvestors] = useState<InvestorWithTokens[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getAuthToken = useCallback(async () => {
    const { data } = await supabaseBrowser.auth.getSession();
    return data.session?.access_token || "";
  }, []);

  const fetchData = useCallback(async () => {
    const token = await getAuthToken();
    if (!token) return;

    const [investorsRes, viewsRes] = await Promise.all([
      fetch("/api/bizplan/admin/investors", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch("/api/bizplan/admin/analytics", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    if (investorsRes.ok) {
      const data = await investorsRes.json();
      setInvestors(data);
    }

    if (viewsRes.ok) {
      const data = await viewsRes.json();
      // Count unique view_ids
      const uniqueViews = new Set(data.map((d: { view_id: string }) => d.view_id));
      setTotalViews(uniqueViews.size);
    }

    setLoading(false);
  }, [getAuthToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = async (data: { name: string; email: string; phone: string; notes: string }) => {
    const token = await getAuthToken();
    const res = await fetch("/api/bizplan/admin/investors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create investor");
    }

    fetchData();
  };

  const handleDelete = async (id: string) => {
    const token = await getAuthToken();
    await fetch(`/api/bizplan/admin/investors/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchData();
  };

  const activeTokenCount = investors.reduce(
    (acc, inv) => acc + (inv.investor_tokens?.filter((t) => t.is_active).length || 0),
    0
  );

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading
          as="h2"
          size="lg"
          fontFamily="'Montserrat', sans-serif"
          color="#1e293b"
        >
          Investor Dashboard
        </Heading>
        <Button
          bg="#F25C05"
          color="white"
          _hover={{ bg: "#d94e04" }}
          onClick={onOpen}
        >
          Add Investor
        </Button>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={8}>
        <Box bg="white" p={5} borderRadius="12px" border="1px solid #e2e8f0">
          <Stat>
            <StatLabel color="#64748b">Total Investors</StatLabel>
            <StatNumber color="#1e293b">{loading ? "—" : investors.length}</StatNumber>
          </Stat>
        </Box>
        <Box bg="white" p={5} borderRadius="12px" border="1px solid #e2e8f0">
          <Stat>
            <StatLabel color="#64748b">Active Tokens</StatLabel>
            <StatNumber color="#1e293b">{loading ? "—" : activeTokenCount}</StatNumber>
          </Stat>
        </Box>
        <Box bg="white" p={5} borderRadius="12px" border="1px solid #e2e8f0">
          <Stat>
            <StatLabel color="#64748b">Total Views</StatLabel>
            <StatNumber color="#1e293b">{loading ? "—" : totalViews}</StatNumber>
          </Stat>
        </Box>
      </SimpleGrid>

      {!loading && (
        <Box>
          <Text fontWeight="700" color="#1e293b" mb={4} fontSize="lg">
            Investors
          </Text>
          <InvestorTable investors={investors} onDelete={handleDelete} />
        </Box>
      )}

      <InvestorForm isOpen={isOpen} onClose={onClose} onSave={handleCreate} />
    </Box>
  );
}
