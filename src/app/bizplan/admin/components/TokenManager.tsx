"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Badge,
  IconButton,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import type { InvestorToken } from "@/types/supabase";

interface TokenManagerProps {
  tokens: InvestorToken[];
  investorId: string;
  authToken: string;
  onRefresh: () => void;
}

export default function TokenManager({ tokens, investorId, authToken, onRefresh }: TokenManagerProps) {
  const [generating, setGenerating] = useState(false);
  const toast = useToast();

  const generateToken = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/bizplan/admin/tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ investor_id: investorId }),
      });
      if (!res.ok) throw new Error("Failed to generate token");
      toast({ title: "Token generated", status: "success", duration: 2000 });
      onRefresh();
    } catch {
      toast({ title: "Failed to generate token", status: "error", duration: 3000 });
    } finally {
      setGenerating(false);
    }
  };

  const toggleToken = async (tokenId: string, currentActive: boolean) => {
    try {
      const res = await fetch(`/api/bizplan/admin/tokens/${tokenId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ is_active: !currentActive }),
      });
      if (!res.ok) throw new Error("Failed to toggle token");
      onRefresh();
    } catch {
      toast({ title: "Failed to update token", status: "error", duration: 3000 });
    }
  };

  const deleteToken = async (tokenId: string) => {
    if (!confirm("Delete this token? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/bizplan/admin/tokens/${tokenId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!res.ok) throw new Error("Failed to delete token");
      toast({ title: "Token deleted", status: "success", duration: 2000 });
      onRefresh();
    } catch {
      toast({ title: "Failed to delete token", status: "error", duration: 3000 });
    }
  };

  const copyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    toast({ title: "Token copied", status: "info", duration: 1500 });
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontWeight="700" color="#1e293b">Access Tokens</Text>
        <Button
          size="sm"
          bg="#F25C05"
          color="white"
          _hover={{ bg: "#d94e04" }}
          isLoading={generating}
          onClick={generateToken}
        >
          Generate Token
        </Button>
      </Flex>

      <VStack spacing={3} align="stretch">
        {tokens.length === 0 && (
          <Text color="#94a3b8" fontSize="sm" textAlign="center" py={4}>
            No tokens yet. Generate one to share with this investor.
          </Text>
        )}
        {tokens.map((t) => (
          <Box
            key={t.id}
            p={3}
            bg="#f8fafc"
            borderRadius="8px"
            border="1px solid #e2e8f0"
          >
            <Flex justify="space-between" align="center" gap={3}>
              <Box flex={1} minW={0}>
                <Flex align="center" gap={2} mb={1}>
                  <Text
                    fontFamily="monospace"
                    fontSize="sm"
                    color="#1e293b"
                    isTruncated
                  >
                    {t.token}
                  </Text>
                  <IconButton
                    aria-label="Copy token"
                    icon={<CopyIcon />}
                    size="xs"
                    variant="ghost"
                    onClick={() => copyToken(t.token)}
                  />
                </Flex>
                <Flex gap={2} fontSize="xs" color="#94a3b8">
                  <Text>Created: {new Date(t.created_at).toLocaleDateString()}</Text>
                  {t.last_used_at && (
                    <Text>Last used: {new Date(t.last_used_at).toLocaleDateString()}</Text>
                  )}
                </Flex>
              </Box>
              <Flex gap={2} align="center">
                <Badge colorScheme={t.is_active ? "green" : "red"} fontSize="xs">
                  {t.is_active ? "Active" : "Inactive"}
                </Badge>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => toggleToken(t.id, t.is_active)}
                >
                  {t.is_active ? "Disable" : "Enable"}
                </Button>
                <Button
                  size="xs"
                  variant="outline"
                  colorScheme="red"
                  onClick={() => deleteToken(t.id)}
                >
                  Delete
                </Button>
              </Flex>
            </Flex>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
