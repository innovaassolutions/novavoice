"use client";

import { Box, Heading, Text, SimpleGrid, Flex, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { investmentTerms, riskFactors } from "../data/bizplanData";

const MotionBox = motion(Box);

const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export default function InvestmentTermsSection() {

  return (
    <Box id="terms" className="bp-section bp-section-white">
      <Box maxW="1100px" mx="auto">
        <Heading as="h2" fontSize={{ base: "1.75rem", md: "2.25rem" }} mb={2} textAlign="center">
          Investment Terms
        </Heading>
        <Text textAlign="center" mb={10} fontSize="1.05rem" maxW="650px" mx="auto">
          A straightforward, fixed-return loan structure designed for transparency and simplicity.
        </Text>

        {/* Terms Cards */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={5} mb={10}>
          {[
            { label: "Minimum Investment", value: `$${investmentTerms.perInvestor.toLocaleString()}`, color: "#3b82f6" },
            { label: "Interest Rate", value: investmentTerms.interestRate, color: "#F25C05" },
            { label: "Total Return", value: `$${investmentTerms.totalReturn.toLocaleString()}`, color: "#22c55e" },
            { label: "Repayment Period", value: investmentTerms.repaymentPeriod, color: "#8b5cf6" },
          ].map((card, i) => (
            <MotionBox
              key={card.label}
              className="bp-stat-card"
              position="relative"
              overflow="hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Box position="absolute" top={0} left={0} right={0} h="3px" bg={card.color} />
              <Text className="bp-stat-label">{card.label}</Text>
              <Text className="bp-stat-value" style={{ color: card.color }}>{card.value}</Text>
            </MotionBox>
          ))}
        </SimpleGrid>

        {/* How It Works */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={10}>
          <MotionBox
            className="bp-card"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Text fontWeight="700" fontSize="1.05rem" mb={4} color="#1e293b !important">
              How the Investment Works
            </Text>
            <Box display="flex" flexDirection="column" gap={3}>
              {[
                { q: "Structure", a: "Fixed-rate loan with monthly repayments" },
                { q: "Minimum investment", a: `$${investmentTerms.perInvestor.toLocaleString()} minimum per investor` },
                { q: "Number of investors", a: `${investmentTerms.numberOfInvestors} investors` },
                { q: "Total raised", a: fmt(investmentTerms.totalRaise) },
                { q: "Total repayment", a: `${fmt(investmentTerms.totalRepayment)} (${investmentTerms.interestRate} interest)` },
                { q: "Monthly repayment", a: `${fmt(Math.round(investmentTerms.monthlyRepayment))} per month` },
                { q: "Per-investor return", a: `Invest $${investmentTerms.perInvestor.toLocaleString()}, receive $${investmentTerms.totalReturn.toLocaleString()}` },
              ].map((item) => (
                <Flex key={item.q} justify="space-between" borderBottom="1px solid #f1e8e0" pb={2}>
                  <Text fontSize="0.88rem" color="#64748b !important">{item.q}</Text>
                  <Text fontSize="0.88rem" fontWeight="600" color="#1e293b !important" textAlign="right">{item.a}</Text>
                </Flex>
              ))}
            </Box>
          </MotionBox>

          {/* Risk Factors */}
          <MotionBox
            className="bp-card"
            borderLeft="4px solid #f59e0b"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Flex align="center" gap={2} mb={4}>
              <Icon as={FiAlertCircle} color="#f59e0b" boxSize={5} />
              <Text fontWeight="700" fontSize="1.05rem" color="#1e293b !important">
                Risk Factors
              </Text>
            </Flex>
            <Box display="flex" flexDirection="column" gap={3}>
              {riskFactors.map((risk) => (
                <Flex key={risk} align="flex-start" gap={2}>
                  <Box w={2} h={2} borderRadius="full" bg="#f59e0b" mt={2} flexShrink={0} />
                  <Text fontSize="0.88rem">{risk}</Text>
                </Flex>
              ))}
            </Box>
          </MotionBox>
        </SimpleGrid>

        {/* Per-Investor Summary */}
        <MotionBox
          className="bp-card"
          maxW="600px"
          mx="auto"
          bg="#f0fdf4"
          borderColor="#bbf7d0"
          textAlign="center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Text fontWeight="700" color="#166534 !important" fontSize="1rem" mb={2}>
            Per-Investor Summary
          </Text>
          <Flex justify="center" gap={8} flexWrap="wrap">
            <Box>
              <Text fontSize="0.78rem" color="#166534 !important" fontWeight="600" textTransform="uppercase">You Invest</Text>
              <Text fontFamily="'Montserrat', sans-serif" fontWeight="800" fontSize="1.75rem" color="#166534 !important">
                $2,500
              </Text>
            </Box>
            <Flex align="center">
              <Text fontSize="1.5rem" color="#22c55e !important">→</Text>
            </Flex>
            <Box>
              <Text fontSize="0.78rem" color="#166534 !important" fontWeight="600" textTransform="uppercase">You Receive</Text>
              <Text fontFamily="'Montserrat', sans-serif" fontWeight="800" fontSize="1.75rem" color="#166534 !important">
                $3,125
              </Text>
            </Box>
          </Flex>
          <Text fontSize="0.8rem" color="#166534 !important" mt={2}>
            $625 profit over 12 monthly payments of ~$260
          </Text>
        </MotionBox>

        <Text fontSize="0.9rem" color="#64748b !important" textAlign="center" mt={6} maxW="600px" mx="auto">
          Investors may contribute more than the minimum $2,500 allocation. Contact us to discuss larger investment amounts.
        </Text>

        <Text fontSize="0.85rem" color="#64748b !important" textAlign="center" mt={6} maxW="700px" mx="auto">
          These risks are standard for early-stage ventures. The custom API integrations create meaningful switching
          costs that partially mitigate churn risk, and the $5,000 setup fee provides revenue protection even if a
          customer churns early.
        </Text>
      </Box>
    </Box>
  );
}
