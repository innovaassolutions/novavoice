"use client";

import { useMemo } from "react";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
} from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { BizplanView, BizplanSectionAnalytic } from "@/types/supabase";
import { sections } from "../../data/bizplanData";

interface AnalyticsDashboardProps {
  views: BizplanView[];
  sectionData: BizplanSectionAnalytic[];
}

export default function AnalyticsDashboard({ views, sectionData }: AnalyticsDashboardProps) {
  const chartData = useMemo(() => {
    const totals: Record<string, number> = {};
    sectionData.forEach((s) => {
      totals[s.section_id] = (totals[s.section_id] || 0) + s.time_spent;
    });
    return sections.map(({ id, label }) => ({
      name: label,
      seconds: totals[id] || 0,
    }));
  }, [sectionData]);

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontWeight="700" color="#1e293b" mb={4}>
          Section Time (seconds)
        </Text>
        {chartData.some((d) => d.seconds > 0) ? (
          <Box bg="white" borderRadius="12px" border="1px solid #e2e8f0" p={4}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  angle={-35}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip
                  formatter={(value) => [`${value}s`, "Time Spent"]}
                  contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
                />
                <Bar dataKey="seconds" fill="#F25C05" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        ) : (
          <Text color="#94a3b8" fontSize="sm" textAlign="center" py={4}>
            No section analytics data yet.
          </Text>
        )}
      </Box>

      <Box>
        <Text fontWeight="700" color="#1e293b" mb={4}>
          View History ({views.length} views)
        </Text>
        <Box overflowX="auto" bg="white" borderRadius="12px" border="1px solid #e2e8f0">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th color="#64748b" borderColor="#e2e8f0">Date</Th>
                <Th color="#64748b" borderColor="#e2e8f0">IP Address</Th>
                <Th color="#64748b" borderColor="#e2e8f0">User Agent</Th>
              </Tr>
            </Thead>
            <Tbody>
              {views.length === 0 && (
                <Tr>
                  <Td colSpan={3} textAlign="center" py={6} color="#94a3b8" borderColor="#e2e8f0">
                    No views recorded yet.
                  </Td>
                </Tr>
              )}
              {views.map((v) => (
                <Tr key={v.id}>
                  <Td borderColor="#e2e8f0">
                    <Text color="#1e293b" fontSize="sm">
                      {new Date(v.viewed_at).toLocaleString()}
                    </Text>
                  </Td>
                  <Td borderColor="#e2e8f0">
                    <Text color="#64748b" fontSize="sm" fontFamily="monospace">
                      {v.ip_address || "—"}
                    </Text>
                  </Td>
                  <Td borderColor="#e2e8f0">
                    <Text color="#94a3b8" fontSize="xs" maxW="300px" isTruncated>
                      {v.user_agent || "—"}
                    </Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </VStack>
  );
}
