"use client";

import { Box, Heading, Text, SimpleGrid, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { unitEconomics, breakEvenByIndustry } from "../data/bizplanData";

const MotionBox = motion(Box);

export default function BusinessModelSection() {
  return (
    <Box id="business-model" className="bp-section bp-section-alt">
      <Box maxW="1100px" mx="auto">
        <Heading as="h2" fontSize={{ base: "1.75rem", md: "2.25rem" }} mb={2} textAlign="center">
          Business Model
        </Heading>
        <Text textAlign="center" mb={10} fontSize="1.05rem" maxW="650px" mx="auto">
          Straightforward pricing with strong unit economics and fast customer ROI.
        </Text>

        {/* Revenue Model */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={10}>
          <MotionBox
            className="bp-card"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Text fontWeight="700" fontSize="1.05rem" mb={4} color="#1e293b !important">
              Revenue Per Customer
            </Text>
            <Box display="flex" flexDirection="column" gap={3}>
              {[
                { label: "One-Time Setup Fee", value: `$${unitEconomics.setupFee.toLocaleString()}`, sub: "Custom API integrations into CRM, scheduling, knowledge base" },
                { label: "Monthly Subscription", value: `$${unitEconomics.monthlySubscription}/mo`, sub: "Unlimited calls, 24/7 coverage, ongoing optimization" },
                { label: "Year 1 Revenue / Customer", value: `$${unitEconomics.firstYearRevenuePerCustomer.toLocaleString()}`, sub: "Setup + 12 months recurring" },
                { label: "Year 2+ Revenue / Customer", value: `$${unitEconomics.yearlyRecurringPerCustomer.toLocaleString()}/yr`, sub: "Pure recurring — no additional setup costs" },
              ].map((item) => (
                <Box key={item.label} borderBottom="1px solid #f1e8e0" pb={3}>
                  <Flex justify="space-between" align="center" mb={1}>
                    <Text fontSize="0.9rem" fontWeight="600" color="#1e293b !important">
                      {item.label}
                    </Text>
                    <Text
                      fontFamily="'Montserrat', sans-serif"
                      fontWeight="800"
                      color="#F25C05 !important"
                      fontSize="1.05rem"
                    >
                      {item.value}
                    </Text>
                  </Flex>
                  <Text fontSize="0.78rem" color="#64748b !important">
                    {item.sub}
                  </Text>
                </Box>
              ))}
            </Box>
          </MotionBox>

          <MotionBox
            className="bp-card"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Text fontWeight="700" fontSize="1.05rem" mb={4} color="#1e293b !important">
              Unit Economics
            </Text>
            <Box display="flex" flexDirection="column" gap={3}>
              {[
                { label: "Voice Agent Cost", value: `~$${unitEconomics.voiceCostPerCustomerPerMonth}/mo/customer`, color: "#64748b" },
                { label: "Sales Commission", value: unitEconomics.salesCommission, color: "#64748b" },
                { label: "Gross Margin Target", value: unitEconomics.grossMarginTarget, color: "#22c55e" },
                { label: "Fixed Infrastructure", value: "$270/mo", color: "#64748b" },
              ].map((item) => (
                <Flex key={item.label} justify="space-between" align="center" borderBottom="1px solid #f1e8e0" pb={3}>
                  <Text fontSize="0.9rem" color="#1e293b !important">
                    {item.label}
                  </Text>
                  <Text fontFamily="monospace" fontWeight="600" color={`${item.color} !important`}>
                    {item.value}
                  </Text>
                </Flex>
              ))}
            </Box>

            <Box mt={6} p={4} bg="#f0fdf4" borderRadius="10px" border="1px solid #bbf7d0">
              <Text fontSize="0.85rem" fontWeight="600" color="#166534 !important" mb={1}>
                Why $639/mo works
              </Text>
              <Text fontSize="0.8rem" color="#166534 !important">
                82–88% cheaper than an in-house receptionist ($4,833–$7,208/mo fully loaded), with 24/7
                coverage and zero turnover risk. Break-even for most businesses within 1–3 additional
                converted calls per month.
              </Text>
            </Box>
          </MotionBox>
        </SimpleGrid>

        {/* Break-Even Table */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Text fontWeight="700" mb={4} color="#1e293b !important" fontSize="0.95rem" textAlign="center">
            Customer Break-Even Analysis at $639/mo
          </Text>
          <Box className="bp-table-wrap">
            <table className="bp-table">
              <thead>
                <tr>
                  <th>Industry</th>
                  <th>Avg Job Value</th>
                  <th>Conversions to Break Even</th>
                  <th>Frequency</th>
                </tr>
              </thead>
              <tbody>
                {breakEvenByIndustry.map((row) => (
                  <tr key={row.industry}>
                    <td style={{ fontWeight: 600 }}>{row.industry}</td>
                    <td>${row.avgJobValue.toLocaleString()}</td>
                    <td style={{ fontWeight: 600, color: "#F25C05" }}>{row.conversionsNeeded}</td>
                    <td style={{ color: "#64748b" }}>{row.frequency}</td>
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
