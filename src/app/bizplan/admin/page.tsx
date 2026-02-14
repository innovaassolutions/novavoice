"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Progress,
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
import ResearchPapersManager from "./components/ResearchPapersManager";
import type { Investor, InvestorToken } from "@/types/supabase";

interface InvestorWithTokens extends Investor {
  investor_tokens: InvestorToken[];
  bizplan_views: { id: string }[];
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

  const handleToggleShared = async (id: string, value: boolean) => {
    const token = await getAuthToken();
    await fetch(`/api/bizplan/admin/investors/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ token_shared: value }),
    });
    fetchData();
  };

  const activeTokenCount = investors.reduce(
    (acc, inv) => acc + (inv.investor_tokens?.filter((t) => t.is_active).length || 0),
    0
  );

  const FUNDRAISE_GOAL = 25000;
  const totalCommitted = investors.reduce(
    (acc, inv) => acc + (inv.commitment_amount || 0),
    0
  );
  const commitPct = Math.min((totalCommitted / FUNDRAISE_GOAL) * 100, 100);
  const commitColor = totalCommitted >= FUNDRAISE_GOAL ? "#22c55e" : "#F25C05";

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

      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mb={4}>
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
        <Box bg="white" p={5} borderRadius="12px" border="1px solid #e2e8f0">
          <Stat>
            <StatLabel color="#64748b">Committed</StatLabel>
            <StatNumber color={commitColor}>
              {loading ? "—" : `$${totalCommitted.toLocaleString()}`}
            </StatNumber>
            <Text fontSize="xs" color="#94a3b8" mt={1}>of $25,000 goal</Text>
          </Stat>
        </Box>
      </SimpleGrid>

      {/* Fundraise Progress Bar */}
      {!loading && (
        <Box bg="white" p={4} borderRadius="12px" border="1px solid #e2e8f0" mb={8}>
          <Flex justify="space-between" align="center" mb={2}>
            <Text fontSize="sm" fontWeight="600" color="#1e293b">Fundraise Progress</Text>
            <Text fontSize="sm" fontWeight="700" color={commitColor}>
              {commitPct.toFixed(0)}%
            </Text>
          </Flex>
          <Progress
            value={commitPct}
            size="lg"
            borderRadius="full"
            bg="#e2e8f0"
            sx={{ "& > div": { background: commitColor, transition: "width 0.5s ease" } }}
          />
          <Flex justify="space-between" mt={1}>
            <Text fontSize="xs" color="#94a3b8">$0</Text>
            <Text fontSize="xs" color="#94a3b8">$25,000</Text>
          </Flex>
        </Box>
      )}

      {/* Recent Commitments Alert */}
      {!loading && investors.filter((inv) => inv.commitment_amount > 0).length > 0 && (
        <Box bg="white" p={5} borderRadius="12px" border="1px solid #e2e8f0" mb={8}>
          <Flex align="center" gap={2} mb={4}>
            <Box w={3} h={3} borderRadius="full" bg="#22c55e" />
            <Text fontWeight="700" color="#1e293b" fontSize="md">
              Investment Interest
            </Text>
          </Flex>
          <Box display="flex" flexDirection="column" gap={2}>
            {investors
              .filter((inv) => inv.commitment_amount > 0)
              .sort((a, b) => {
                const aTime = a.committed_at ? new Date(a.committed_at).getTime() : 0;
                const bTime = b.committed_at ? new Date(b.committed_at).getTime() : 0;
                return bTime - aTime;
              })
              .map((inv) => (
                <Flex
                  key={inv.id}
                  justify="space-between"
                  align="center"
                  py={2}
                  px={3}
                  bg="#f0fdf4"
                  borderRadius="8px"
                  border="1px solid #bbf7d0"
                  cursor="pointer"
                  _hover={{ bg: "#dcfce7" }}
                  onClick={() => window.location.href = `/bizplan/admin/investors/${inv.id}`}
                >
                  <Box>
                    <Text fontWeight="600" fontSize="sm" color="#1e293b">
                      {inv.name}
                    </Text>
                    <Text fontSize="xs" color="#64748b">
                      {inv.committed_at
                        ? new Date(inv.committed_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })
                        : "Date unknown"}
                    </Text>
                  </Box>
                  <Text fontWeight="800" fontFamily="'Montserrat', sans-serif" fontSize="lg" color="#166534">
                    ${inv.commitment_amount.toLocaleString()}
                  </Text>
                </Flex>
              ))}
          </Box>
        </Box>
      )}

      {!loading && (
        <Box>
          <Text fontWeight="700" color="#1e293b" mb={4} fontSize="lg">
            Investors
          </Text>
          <InvestorTable investors={investors} onDelete={handleDelete} onToggleShared={handleToggleShared} />
        </Box>
      )}

      <InvestorForm isOpen={isOpen} onClose={onClose} onSave={handleCreate} />

      {/* Research Papers Management */}
      <Box mt={8}>
        <ResearchPapersManager />
      </Box>
    </Box>
  );
}
