"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { supabaseBrowser } from "@/lib/supabase/browser";
import TokenManager from "../../components/TokenManager";
import InvestorForm from "../../components/InvestorForm";
import AnalyticsDashboard from "../../components/AnalyticsDashboard";
import type { Investor, InvestorToken, BizplanView, BizplanSectionAnalytic } from "@/types/supabase";

interface InvestorDetail extends Investor {
  investor_tokens: InvestorToken[];
  bizplan_views: BizplanView[];
}

export default function InvestorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [investor, setInvestor] = useState<InvestorDetail | null>(null);
  const [sectionData, setSectionData] = useState<BizplanSectionAnalytic[]>([]);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState("");
  const [commitmentAmount, setCommitmentAmount] = useState<string>("0");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const getAuthToken = useCallback(async () => {
    const { data } = await supabaseBrowser.auth.getSession();
    const token = data.session?.access_token || "";
    setAuthToken(token);
    return token;
  }, []);

  const fetchData = useCallback(async () => {
    const token = await getAuthToken();
    if (!token) return;

    const [investorRes, analyticsRes] = await Promise.all([
      fetch(`/api/bizplan/admin/investors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`/api/bizplan/admin/analytics?investor_id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    if (investorRes.ok) {
      const inv = await investorRes.json();
      setInvestor(inv);
      setCommitmentAmount(String(inv.commitment_amount || 0));
    }

    if (analyticsRes.ok) {
      setSectionData(await analyticsRes.json());
    }

    setLoading(false);
  }, [id, getAuthToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleUpdate = async (data: { name: string; email: string; phone: string; notes: string }) => {
    const token = await getAuthToken();
    const res = await fetch(`/api/bizplan/admin/investors/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update investor");
    }

    fetchData();
  };

  const handleCommitmentBlur = async () => {
    const amount = Number(commitmentAmount) || 0;
    if (amount === (investor?.commitment_amount || 0)) return;
    const token = await getAuthToken();
    const res = await fetch(`/api/bizplan/admin/investors/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ commitment_amount: amount }),
    });
    if (res.ok) {
      toast({ title: "Commitment updated", status: "success", duration: 2000 });
      fetchData();
    } else {
      toast({ title: "Failed to update commitment", status: "error", duration: 3000 });
    }
  };

  if (loading) return null;

  if (!investor) {
    return (
      <Box textAlign="center" py={20}>
        <Text color="#64748b">Investor not found.</Text>
        <Button mt={4} onClick={() => router.push("/bizplan/admin")}>
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        variant="ghost"
        size="sm"
        mb={4}
        color="#64748b"
        onClick={() => router.push("/bizplan/admin")}
      >
        &larr; Back to Dashboard
      </Button>

      <Flex justify="space-between" align="start" mb={8} flexWrap="wrap" gap={4}>
        <Box>
          <Heading
            as="h2"
            size="lg"
            fontFamily="'Montserrat', sans-serif"
            color="#1e293b"
          >
            {investor.name}
          </Heading>
          <Text color="#64748b" fontSize="sm">{investor.email}</Text>
          {investor.phone && <Text color="#94a3b8" fontSize="sm">{investor.phone}</Text>}
          {investor.notes && (
            <Text color="#94a3b8" fontSize="sm" mt={2} fontStyle="italic">
              {investor.notes}
            </Text>
          )}
          <Box mt={3}>
            <Text fontSize="xs" fontWeight="600" color="#64748b" textTransform="uppercase" mb={1}>
              Commitment Amount
            </Text>
            <InputGroup size="sm" maxW="180px">
              <InputLeftElement pointerEvents="none" color="#64748b" fontSize="sm">$</InputLeftElement>
              <Input
                type="number"
                value={commitmentAmount}
                onChange={(e) => setCommitmentAmount(e.target.value)}
                onBlur={handleCommitmentBlur}
                onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
                borderColor="#e2e8f0"
                _hover={{ borderColor: "#cbd5e1" }}
                _focus={{ borderColor: "#F25C05", boxShadow: "0 0 0 1px #F25C05" }}
              />
            </InputGroup>
          </Box>
        </Box>
        <Button
          size="sm"
          variant="outline"
          borderColor="#e2e8f0"
          onClick={onOpen}
        >
          Edit
        </Button>
      </Flex>

      <VStack spacing={8} align="stretch">
        <TokenManager
          tokens={investor.investor_tokens || []}
          investorId={investor.id}
          authToken={authToken}
          onRefresh={fetchData}
        />

        <AnalyticsDashboard
          views={investor.bizplan_views || []}
          sectionData={sectionData}
        />
      </VStack>

      <InvestorForm
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleUpdate}
        investor={investor}
      />
    </Box>
  );
}
