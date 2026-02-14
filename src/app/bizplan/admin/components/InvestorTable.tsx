"use client";

import {
  Box,
  Button,
  Flex,
  Switch,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Badge,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import type { Investor, InvestorToken } from "@/types/supabase";

interface InvestorWithTokens extends Investor {
  investor_tokens: InvestorToken[];
  bizplan_views: { id: string }[];
}

interface InvestorTableProps {
  investors: InvestorWithTokens[];
  onDelete: (id: string) => void;
  onToggleShared: (id: string, value: boolean) => void;
}

export default function InvestorTable({ investors, onDelete, onToggleShared }: InvestorTableProps) {
  const router = useRouter();

  return (
    <Box overflowX="auto" bg="white" borderRadius="12px" border="1px solid #e2e8f0">
      <Table size="sm">
        <Thead>
          <Tr>
            <Th color="#64748b" borderColor="#e2e8f0">Token Shared?</Th>
            <Th color="#64748b" borderColor="#e2e8f0">Name</Th>
            <Th color="#64748b" borderColor="#e2e8f0">Email</Th>
            <Th color="#64748b" borderColor="#e2e8f0">Tokens</Th>
            <Th color="#64748b" borderColor="#e2e8f0">Created</Th>
            <Th color="#64748b" borderColor="#e2e8f0" textAlign="center">Viewed</Th>
            <Th color="#64748b" borderColor="#e2e8f0" textAlign="right">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {investors.length === 0 && (
            <Tr>
              <Td colSpan={7} textAlign="center" py={8} color="#94a3b8" borderColor="#e2e8f0">
                No investors yet. Add one to get started.
              </Td>
            </Tr>
          )}
          {investors.map((inv) => {
            const activeTokens = inv.investor_tokens?.filter((t) => t.is_active).length || 0;
            const totalTokens = inv.investor_tokens?.length || 0;
            const hasViewed = (inv.bizplan_views?.length || 0) > 0;
            return (
              <Tr
                key={inv.id}
                cursor="pointer"
                _hover={{ bg: "#f8fafc" }}
                onClick={() => router.push(`/bizplan/admin/investors/${inv.id}`)}
              >
                <Td borderColor="#e2e8f0" onClick={(e) => e.stopPropagation()}>
                  <Switch
                    size="sm"
                    colorScheme="orange"
                    isChecked={inv.token_shared}
                    onChange={(e) => {
                      onToggleShared(inv.id, e.target.checked);
                    }}
                  />
                </Td>
                <Td borderColor="#e2e8f0">
                  <Text fontWeight="600" color="#1e293b">{inv.name}</Text>
                </Td>
                <Td borderColor="#e2e8f0">
                  <Text color="#64748b" fontSize="sm">{inv.email}</Text>
                </Td>
                <Td borderColor="#e2e8f0">
                  <Badge
                    colorScheme={activeTokens > 0 ? "green" : "gray"}
                    fontSize="xs"
                  >
                    {activeTokens} active / {totalTokens} total
                  </Badge>
                </Td>
                <Td borderColor="#e2e8f0">
                  <Text color="#94a3b8" fontSize="sm">
                    {new Date(inv.created_at).toLocaleDateString()}
                  </Text>
                </Td>
                <Td borderColor="#e2e8f0" textAlign="center">
                  {hasViewed ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ display: "inline-block" }}>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="3" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ display: "inline-block" }}>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="1" y1="1" x2="23" y2="23" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </Td>
                <Td borderColor="#e2e8f0" textAlign="right">
                  <Flex gap={2} justify="flex-end">
                    <Button
                      size="xs"
                      variant="outline"
                      colorScheme="red"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Delete investor "${inv.name}"?`)) onDelete(inv.id);
                      }}
                    >
                      Delete
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
