"use client";

import { Box, Heading, Text, SimpleGrid, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { fundAllocation } from "../data/bizplanData";

const MotionBox = motion(Box);

const RADIAN = Math.PI / 180;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderCustomLabel(props: any) {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export default function UseOfFundsSection() {
  return (
    <Box id="use-of-funds" className="bp-section bp-section-alt">
      <Box maxW="1100px" mx="auto">
        <Heading as="h2" fontSize={{ base: "1.75rem", md: "2.25rem" }} mb={2} textAlign="center">
          Use of Funds
        </Heading>
        <Text textAlign="center" mb={10} fontSize="1.05rem" maxW="600px" mx="auto">
          Every dollar of the $25,000 raise is allocated to drive customer acquisition and sustain operations.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} alignItems="center">
          {/* Donut Chart */}
          <MotionBox
            className="bp-chart-container"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Box position="relative">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={fundAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={130}
                    paddingAngle={3}
                    dataKey="value"
                    labelLine={false}
                    label={renderCustomLabel}
                  >
                    {fundAllocation.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, "Amount"]}
                    contentStyle={{ borderRadius: 8, border: "1px solid #f1e8e0", fontSize: 13 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Center label */}
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                textAlign="center"
                pointerEvents="none"
              >
                <Text fontSize="1.5rem" fontFamily="'Montserrat', sans-serif" fontWeight="800" color="#1e293b !important">
                  $25K
                </Text>
                <Text fontSize="0.7rem" color="#64748b !important">
                  Total Raise
                </Text>
              </Box>
            </Box>
          </MotionBox>

          {/* Allocation Details */}
          <Box display="flex" flexDirection="column" gap={5}>
            {fundAllocation.map((item, i) => (
              <MotionBox
                key={item.name}
                className="bp-card"
                borderLeft={`4px solid ${item.color}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Flex justify="space-between" align="center" mb={2}>
                  <Text fontWeight="700" color="#1e293b !important" fontSize="1rem">
                    {item.name}
                  </Text>
                  <Text fontFamily="'Montserrat', sans-serif" fontWeight="800" color={`${item.color} !important`} fontSize="1.2rem">
                    ${item.value.toLocaleString()}
                  </Text>
                </Flex>
                <Text fontSize="0.85rem">
                  {item.name === "Facebook Ads"
                    ? "Targeted ads reaching small business owners in high-value industries (home services, legal, healthcare). Paced over 6 months for sustained lead generation."
                    : item.name === "Email Outreach"
                    ? "Cold email campaigns to qualified prospects using verified business contact databases. Expected to generate 15–25% of total leads."
                    : "Covers infrastructure costs (Supabase, Vercel, Claude Max) and operational expenses during the ramp-up period before revenue covers costs."}
                </Text>
              </MotionBox>
            ))}
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
