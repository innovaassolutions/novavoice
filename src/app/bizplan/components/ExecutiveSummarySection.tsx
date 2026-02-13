"use client";

import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { executiveStats } from "../data/bizplanData";

const MotionBox = motion(Box);

export default function ExecutiveSummarySection() {
  return (
    <Box id="executive-summary" className="bp-section bp-section-white">
      <Box maxW="1100px" mx="auto">
        <Heading as="h2" fontSize={{ base: "1.75rem", md: "2.25rem" }} mb={2} textAlign="center">
          Executive Summary
        </Heading>
        <Text textAlign="center" mb={10} fontSize="1.05rem" maxW="600px" mx="auto">
          The key numbers behind the NovaVoice opportunity.
        </Text>
        <SimpleGrid columns={{ base: 2, md: 3 }} spacing={5}>
          {executiveStats.map((stat, i) => (
            <MotionBox
              key={stat.label}
              className="bp-stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Text className="bp-stat-label">{stat.label}</Text>
              <Text className="bp-stat-value">{stat.value}</Text>
              <Text className="bp-stat-sub">{stat.sub}</Text>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
