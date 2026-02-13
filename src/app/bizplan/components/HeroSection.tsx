"use client";

import { Box, Heading, Text, Badge } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function HeroSection() {
  return (
    <Box className="bp-hero">
      <MotionBox
        maxW="800px"
        mx="auto"
        position="relative"
        zIndex={1}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Badge
          bg="#F25C05"
          color="white"
          px={4}
          py={1}
          borderRadius="full"
          fontSize="0.75rem"
          fontWeight="700"
          mb={6}
          textTransform="uppercase"
          letterSpacing="0.08em"
        >
          Investment Opportunity
        </Badge>
        <Heading
          as="h1"
          fontSize={{ base: "2.5rem", md: "3.5rem" }}
          fontWeight="900"
          lineHeight="1.1"
          mb={6}
          color="#1e293b !important"
        >
          Invest in the Future of{" "}
          <Text as="span" color="#F25C05">
            Small Business Communication
          </Text>
        </Heading>
        <Text
          fontSize={{ base: "1.1rem", md: "1.25rem" }}
          color="#64748b !important"
          maxW="600px"
          mx="auto"
          lineHeight="1.7"
        >
          NovaVoice is an AI phone agent that ensures small businesses never
          miss a call — turning missed opportunities into revenue, 24/7/365.
        </Text>
        <Box mt={8} display="flex" gap={6} justifyContent="center" flexWrap="wrap">
          {[
            { label: "$25,000 raise", sub: "10 investors" },
            { label: "25% return", sub: "12 months" },
            { label: "$42.4B market", sub: "34.8% CAGR" },
          ].map((item) => (
            <Box key={item.label} textAlign="center">
              <Text fontWeight="800" fontSize="1.1rem" color="#1e293b !important" fontFamily="'Montserrat', sans-serif">
                {item.label}
              </Text>
              <Text fontSize="0.8rem" color="#64748b !important">
                {item.sub}
              </Text>
            </Box>
          ))}
        </Box>
      </MotionBox>
    </Box>
  );
}
