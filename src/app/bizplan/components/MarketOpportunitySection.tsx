"use client";

import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { tamSamSom, marketGrowthData, industryTargets } from "../data/bizplanData";

const MotionBox = motion(Box);

const funnelColors = ["#F25C05", "#d97706", "#16a34a"];
const funnelWidths = ["100%", "75%", "45%"];

export default function MarketOpportunitySection() {
  return (
    <Box id="market" className="bp-section bp-section-alt">
      <Box maxW="1100px" mx="auto">
        <Heading as="h2" fontSize={{ base: "1.75rem", md: "2.25rem" }} mb={2} textAlign="center">
          Market Opportunity
        </Heading>
        <Text textAlign="center" mb={10} fontSize="1.05rem" maxW="650px" mx="auto">
          A $42.4 billion addressable market powered by the AI voice revolution.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={10}>
          {/* TAM/SAM/SOM Funnel */}
          <MotionBox
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Text fontWeight="700" mb={6} color="#1e293b !important" fontSize="0.95rem" textAlign="center">
              Market Sizing Funnel
            </Text>
            <Box className="bp-funnel">
              {tamSamSom.map((item, i) => (
                <Box
                  key={item.label}
                  className="bp-funnel-item"
                  bg={funnelColors[i]}
                  w={funnelWidths[i]}
                  maxW="400px"
                >
                  <Text fontSize="0.75rem" opacity={1} textTransform="uppercase" letterSpacing="0.08em">
                    {item.label}
                  </Text>
                  <Text fontSize="1.75rem" fontFamily="'Montserrat', sans-serif" fontWeight="800">
                    {item.value}
                  </Text>
                  <Text fontSize="0.8rem" opacity={1}>
                    {item.businesses}
                  </Text>
                  <Text fontSize="0.7rem" opacity={1} mt={1}>
                    {item.description}
                  </Text>
                </Box>
              ))}
            </Box>
          </MotionBox>

          {/* Growth Chart */}
          <MotionBox
            className="bp-chart-container"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Text fontWeight="700" mb={4} color="#1e293b !important" fontSize="0.95rem">
              AI Voice Agent Market Growth (34.8% CAGR)
            </Text>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={marketGrowthData} margin={{ left: 0, right: 10, top: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F25C05" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F25C05" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1e8e0" />
                <XAxis dataKey="year" fontSize={11} stroke="#94a3b8" />
                <YAxis tickFormatter={(v) => `$${v}B`} fontSize={11} stroke="#94a3b8" />
                <Tooltip
                  formatter={(value) => [`$${value}B`, "Market Size"]}
                  contentStyle={{ borderRadius: 8, border: "1px solid #f1e8e0", fontSize: 13 }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#F25C05"
                  strokeWidth={2.5}
                  fill="url(#growthGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
            <Text fontSize="0.75rem" color="#64748b !important" mt={2} textAlign="center">
              Source: Industry projections — $2.4B (2024) to $47.5B (2034)
            </Text>
          </MotionBox>
        </SimpleGrid>

        {/* Industry Targets Table */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Text fontWeight="700" mb={4} color="#1e293b !important" fontSize="0.95rem" textAlign="center">
            Target Industries
          </Text>
          <Box className="bp-table-wrap">
            <table className="bp-table">
              <thead>
                <tr>
                  <th>Industry</th>
                  <th>Small Employer Firms</th>
                  <th>Missed Call Rate</th>
                  <th>Phone Urgency</th>
                </tr>
              </thead>
              <tbody>
                {industryTargets.map((row) => (
                  <tr key={row.industry}>
                    <td style={{ fontWeight: 600 }}>{row.industry}</td>
                    <td>{row.firms}</td>
                    <td>{row.missRate}</td>
                    <td>
                      <Box
                        as="span"
                        bg={row.urgency === "Extreme" ? "#fef2f2" : "#fefce8"}
                        color={row.urgency === "Extreme" ? "#dc2626" : "#ca8a04"}
                        px={2}
                        py={0.5}
                        borderRadius="full"
                        fontSize="0.75rem"
                        fontWeight="600"
                      >
                        {row.urgency}
                      </Box>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </MotionBox>
      </Box>
    </Box>
  );
}
