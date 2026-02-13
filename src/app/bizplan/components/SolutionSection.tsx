"use client";

import { Box, Heading, Text, SimpleGrid, Flex, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { howItWorks, differentiators } from "../data/bizplanData";

const MotionBox = motion(Box);

export default function SolutionSection() {
  return (
    <Box id="solution" className="bp-section bp-section-white">
      <Box maxW="1100px" mx="auto">
        <Heading as="h2" fontSize={{ base: "1.75rem", md: "2.25rem" }} mb={2} textAlign="center">
          The Solution: NovaVoice
        </Heading>
        <Text textAlign="center" mb={10} fontSize="1.05rem" maxW="650px" mx="auto">
          An AI phone agent that answers every call, books appointments, qualifies leads, and
          integrates directly with your business tools — 24/7/365.
        </Text>

        {/* How It Works */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={12}>
          {howItWorks.map((item, i) => (
            <MotionBox
              key={item.step}
              className="bp-card"
              textAlign="center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Flex
                w="50px"
                h="50px"
                borderRadius="full"
                bg="#F25C05"
                color="white"
                align="center"
                justify="center"
                mx="auto"
                mb={4}
                fontFamily="'Montserrat', sans-serif"
                fontWeight="800"
                fontSize="1.25rem"
              >
                {item.step}
              </Flex>
              <Text fontWeight="700" fontSize="1.1rem" mb={2} color="#1e293b !important">
                {item.title}
              </Text>
              <Text fontSize="0.9rem">{item.description}</Text>
            </MotionBox>
          ))}
        </SimpleGrid>

        {/* Differentiators */}
        <MotionBox
          className="bp-card"
          maxW="700px"
          mx="auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Text fontWeight="700" fontSize="1.05rem" mb={4} color="#1e293b !important">
            Key Differentiators
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
            {differentiators.map((item) => (
              <Flex key={item} align="center" gap={2} py={1}>
                <Icon as={FiCheckCircle} color="#22c55e" flexShrink={0} />
                <Text fontSize="0.9rem">{item}</Text>
              </Flex>
            ))}
          </SimpleGrid>
        </MotionBox>
      </Box>
    </Box>
  );
}
