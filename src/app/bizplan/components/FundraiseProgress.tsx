"use client";

import { useState, useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function FundraiseProgress() {
  const [committed, setCommitted] = useState(0);
  const [goal, setGoal] = useState(25000);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/bizplan/fundraise-progress")
      .then((r) => r.json())
      .then((data) => {
        setCommitted(data.committed || 0);
        setGoal(data.goal || 25000);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  if (!loaded) return null;

  const pct = Math.min((committed / goal) * 100, 100);
  const remaining = Math.max(goal - committed, 0);
  const isFull = committed >= goal;

  return (
    <MotionBox
      maxW="600px"
      mx="auto"
      mb={10}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Box
        bg="white"
        border="1px solid #f1e8e0"
        borderRadius="12px"
        p={6}
        boxShadow="0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)"
        textAlign="center"
      >
        <Text
          fontSize="0.72rem"
          fontWeight="700"
          textTransform="uppercase"
          letterSpacing="0.08em"
          color="#64748b !important"
          mb={3}
        >
          Fundraise Progress
        </Text>

        <Flex justify="center" align="baseline" gap={1} mb={1}>
          <Text
            fontFamily="'Montserrat', sans-serif"
            fontWeight="800"
            fontSize="2rem"
            color={isFull ? "#22c55e !important" : "#F25C05 !important"}
            lineHeight="1.2"
          >
            ${committed.toLocaleString()}
          </Text>
          <Text fontSize="1rem" color="#64748b !important" fontWeight="600">
            / ${goal.toLocaleString()}
          </Text>
        </Flex>

        {/* Progress bar */}
        <Box
          bg="#e2e8f0"
          borderRadius="full"
          h="12px"
          overflow="hidden"
          mt={3}
          mb={2}
        >
          <Box
            bg={isFull ? "#22c55e" : "#F25C05"}
            h="100%"
            borderRadius="full"
            w={`${pct}%`}
            transition="width 0.8s ease"
          />
        </Box>

        <Flex justify="space-between">
          <Text fontSize="0.75rem" color="#94a3b8 !important">
            {pct.toFixed(0)}% funded
          </Text>
          <Text fontSize="0.75rem" color="#94a3b8 !important">
            {isFull
              ? "Fully funded!"
              : `$${remaining.toLocaleString()} remaining`}
          </Text>
        </Flex>
      </Box>
    </MotionBox>
  );
}
