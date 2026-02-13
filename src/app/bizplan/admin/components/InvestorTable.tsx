"use client";

import {
  Box,
  Button,
  Flex,
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
}

interface InvestorTableProps {
  investors: InvestorWithTokens[];
  onDelete: (id: string) => void;
}

export default function InvestorTable({ investors, onDelete }: InvestorTableProps) {
  const router = useRouter();

  return (
    <Box overflowX="auto" bg="white" borderRadius="12px" border="1px solid #e2e8f0">
      <Table size="sm">
        <Thead>
          <Tr>
            <Th color="#64748b" borderColor="#e2e8f0">Name</Th>
            <Th color="#64748b" borderColor="#e2e8f0">Email</Th>
            <Th color="#64748b" borderColor="#e2e8f0">Tokens</Th>
            <Th color="#64748b" borderColor="#e2e8f0">Created</Th>
            <Th color="#64748b" borderColor="#e2e8f0" textAlign="right">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {investors.length === 0 && (
            <Tr>
              <Td colSpan={5} textAlign="center" py={8} color="#94a3b8" borderColor="#e2e8f0">
                No investors yet. Add one to get started.
              </Td>
            </Tr>
          )}
          {investors.map((inv) => {
            const activeTokens = inv.investor_tokens?.filter((t) => t.is_active).length || 0;
            const totalTokens = inv.investor_tokens?.length || 0;
            return (
              <Tr
                key={inv.id}
                cursor="pointer"
                _hover={{ bg: "#f8fafc" }}
                onClick={() => router.push(`/bizplan/admin/investors/${inv.id}`)}
              >
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
