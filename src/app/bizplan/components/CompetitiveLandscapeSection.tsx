"use client";

import { Box, Heading, Text, SimpleGrid, Flex, Badge } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import {
  costComparison100,
  costComparison300,
  costComparison500,
  tcoComparison24Months,
  competitorTiers,
} from "../data/bizplanData";

const MotionBox = motion(Box);

const typeColors: Record<string, string> = {
  "Self-Service AI": "#3b82f6",
  "Managed AI": "#F25C05",
  Human: "#8b5cf6",
};

function CostChart({ data, title }: { data: typeof costComparison100; title: string }) {
  return (
    <Box className="bp-chart-container">
      <Text fontWeight="700" mb={3} color="#1e293b !important" fontSize="0.85rem">
        {title}
      </Text>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 50, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1e8e0" horizontal={false} />
          <XAxis type="number" tickFormatter={(v) => `$${v.toLocaleString()}`} fontSize={11} stroke="#94a3b8" />
          <YAxis type="category" dataKey="provider" fontSize={11} width={110} stroke="#94a3b8" />
          <Tooltip
            formatter={(value) => [`$${Number(value).toLocaleString()}/mo`, "Cost"]}
            contentStyle={{ borderRadius: 8, border: "1px solid #f1e8e0", fontSize: 13 }}
          />
          <Bar dataKey="cost" radius={[0, 6, 6, 0]} barSize={22}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.provider === "NovaVoice" ? "#F25C05" : typeColors[entry.type] || "#94a3b8"} />
            ))}
            <LabelList
              dataKey="cost"
              position="right"
              formatter={(v) => `$${Number(v).toLocaleString()}`}
              fontSize={11}
              fontWeight={600}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default function CompetitiveLandscapeSection() {
  return (
    <Box id="competitive" className="bp-section bp-section-white">
      <Box maxW="1100px" mx="auto">
        <Heading as="h2" fontSize={{ base: "1.75rem", md: "2.25rem" }} mb={2} textAlign="center">
          Competitive Landscape
        </Heading>
        <Text textAlign="center" mb={10} fontSize="1.05rem" maxW="700px" mx="auto">
          NovaVoice occupies the underserved &ldquo;Done For You&rdquo; middle tier — managed AI quality
          without annual lock-in or enterprise pricing.
        </Text>

        {/* Tier Comparison */}
        <MotionBox
          mb={10}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Box className="bp-table-wrap">
            <table className="bp-table">
              <thead>
                <tr>
                  <th>Tier</th>
                  <th>Price</th>
                  <th>Setup</th>
                  <th>Integrations</th>
                  <th>Examples</th>
                </tr>
              </thead>
              <tbody>
                {competitorTiers.map((row) => (
                  <tr
                    key={row.tier}
                    style={
                      row.tier.includes("NovaVoice")
                        ? { background: "#FFF8F3", fontWeight: 600 }
                        : undefined
                    }
                  >
                    <td style={{ fontWeight: 600 }}>
                      {row.tier}
                      {row.tier.includes("NovaVoice") && (
                        <Badge ml={2} bg="#F25C05" color="white" fontSize="0.6rem" px={1.5} borderRadius="full">
                          US
                        </Badge>
                      )}
                    </td>
                    <td>{row.price}</td>
                    <td>{row.setup}</td>
                    <td>{row.integrations}</td>
                    <td style={{ fontSize: "0.8rem", color: "#64748b" }}>{row.examples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </MotionBox>

        {/* Color Legend */}
        <Flex gap={4} mb={6} justify="center" flexWrap="wrap">
          {Object.entries(typeColors).map(([label, color]) => (
            <Flex key={label} align="center" gap={2}>
              <Box w={3} h={3} borderRadius="full" bg={color} />
              <Text fontSize="0.78rem" color="#64748b !important">
                {label}
              </Text>
            </Flex>
          ))}
        </Flex>

        {/* Cost Comparisons */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mb={10}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0, duration: 0.4 }}
          >
            <CostChart data={costComparison100} title="100 Calls/Month" />
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <CostChart data={costComparison300} title="300 Calls/Month" />
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <CostChart data={costComparison500} title="500 Calls/Month" />
          </MotionBox>
        </SimpleGrid>

        {/* 24-Month TCO */}
        <MotionBox
          className="bp-chart-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Text fontWeight="700" mb={4} color="#1e293b !important" fontSize="0.95rem">
            24-Month Total Cost of Ownership
          </Text>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={tcoComparison24Months}
              layout="vertical"
              margin={{ left: 20, right: 60, top: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1e8e0" horizontal={false} />
              <XAxis type="number" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} fontSize={11} stroke="#94a3b8" />
              <YAxis type="category" dataKey="provider" fontSize={11} width={160} stroke="#94a3b8" />
              <Tooltip
                formatter={(value) => [`$${Number(value).toLocaleString()}`, "24-Mo TCO"]}
                contentStyle={{ borderRadius: 8, border: "1px solid #f1e8e0", fontSize: 13 }}
              />
              <Bar dataKey="cost" radius={[0, 6, 6, 0]} barSize={26}>
                {tcoComparison24Months.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.provider === "NovaVoice" ? "#F25C05" : typeColors[entry.type] || "#94a3b8"}
                  />
                ))}
                <LabelList
                  dataKey="cost"
                  position="right"
                  formatter={(v) => `$${(Number(v) / 1000).toFixed(1)}K`}
                  fontSize={11}
                  fontWeight={600}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <Text fontSize="0.75rem" color="#64748b !important" mt={2} textAlign="center">
            Includes setup fees. NovaVoice: $5,000 setup + $639/mo × 24 = $20,336
          </Text>
        </MotionBox>
      </Box>
    </Box>
  );
}
