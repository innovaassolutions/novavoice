"use client";

import { Box, Heading, Text, SimpleGrid, Flex, Icon } from "@chakra-ui/react";
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
import { FiAlertTriangle } from "react-icons/fi";
import { industryMissRates, missedCallStats } from "../data/bizplanData";

const MotionBox = motion(Box);

export default function ProblemSection() {
  return (
    <Box id="problem" className="bp-section bp-section-alt">
      <Box maxW="1100px" mx="auto">
        <Heading as="h2" fontSize={{ base: "1.75rem", md: "2.25rem" }} mb={2} textAlign="center">
          The Problem: A Crisis of Missed Calls
        </Heading>
        <Text textAlign="center" mb={10} fontSize="1.05rem" maxW="650px" mx="auto">
          Small businesses answer only 38% of their inbound calls. The rest go to competitors.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={10}>
          {/* Bar Chart */}
          <MotionBox
            className="bp-chart-container"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Text fontWeight="700" mb={4} color="#1e293b !important" fontSize="0.95rem">
              Missed Call Rates by Industry
            </Text>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={industryMissRates}
                layout="vertical"
                margin={{ left: 20, right: 30, top: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1e8e0" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} fontSize={12} stroke="#94a3b8" />
                <YAxis type="category" dataKey="industry" fontSize={12} width={130} stroke="#94a3b8" />
                <Tooltip
                  formatter={(value) => [`${value}%`, "Missed"]}
                  contentStyle={{ borderRadius: 8, border: "1px solid #f1e8e0", fontSize: 13 }}
                />
                <Bar dataKey="rate" radius={[0, 6, 6, 0]} barSize={28}>
                  {industryMissRates.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                  <LabelList dataKey="rate" position="right" formatter={(v) => `${v}%`} fontSize={12} fontWeight={700} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </MotionBox>

          {/* Stats Cards */}
          <Box display="flex" flexDirection="column" gap={4}>
            {missedCallStats.map((item, i) => (
              <MotionBox
                key={i}
                className="bp-card bp-card-accent"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Flex align="center" gap={4}>
                  <Icon as={FiAlertTriangle} boxSize={5} color="#F25C05" flexShrink={0} />
                  <Box>
                    <Text
                      fontFamily="'Montserrat', sans-serif"
                      fontWeight="800"
                      fontSize="1.5rem"
                      color="#F25C05 !important"
                    >
                      {item.stat}
                    </Text>
                    <Text fontSize="0.9rem">{item.description}</Text>
                  </Box>
                </Flex>
              </MotionBox>
            ))}

            <MotionBox
              className="bp-card"
              bg="#FFF5F0"
              borderColor="#fed7aa"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Text fontSize="0.85rem" fontStyle="italic" color="#92400e !important">
                &ldquo;A 411 Locals study of 85 businesses across 58 industries found that only 37.8% of
                inbound calls were actually answered by a live person.&rdquo;
              </Text>
              <Text fontSize="0.75rem" color="#92400e !important" mt={2}>
                Corroborated by Clio 2024 Legal Trends Report and Housecall Pro data.
              </Text>
            </MotionBox>
          </Box>
        </SimpleGrid>

        <Text fontSize="0.85rem" color="#64748b !important" mt={6} textAlign="center" maxW="750px" mx="auto">
          This chart shows the percentage of inbound calls that go unanswered across key industries. Data from industry
          studies including Clio&apos;s 2024 Legal Trends Report (law firms answer only 40% of calls) and home services call
          tracking data. The average small business misses roughly 6 out of every 10 calls. Together, these statistics
          paint a clear picture: most callers who reach voicemail don&apos;t leave a message, and the majority never call back.
          Each missed call represents potential revenue walking to a competitor.
        </Text>
      </Box>
    </Box>
  );
}
