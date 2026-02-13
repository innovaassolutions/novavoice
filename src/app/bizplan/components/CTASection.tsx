"use client";

import { Box, Heading, Text, Flex, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";

const MotionBox = motion(Box);

export default function CTASection() {
  return (
    <Box id="cta" className="bp-cta">
      <MotionBox
        maxW="700px"
        mx="auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Heading as="h2" fontSize={{ base: "2rem", md: "2.5rem" }} mb={4} fontWeight="900">
          Ready to Invest?
        </Heading>
        <Text fontSize={{ base: "1.05rem", md: "1.15rem" }} mb={8} opacity={0.9} maxW="550px" mx="auto">
          Join 10 investors in backing the future of small business communication.
          $2,500 investment, 25% return, 12-month repayment.
        </Text>

        <Flex direction="column" gap={4} align="center">
          <Flex align="center" gap={3} bg="rgba(255,255,255,0.15)" px={6} py={3} borderRadius="12px">
            <Icon as={FiMail} boxSize={5} />
            <Box textAlign="left">
              <Text fontSize="0.75rem" opacity={0.8} fontWeight="600" textTransform="uppercase">
                Email
              </Text>
              <Text fontWeight="700" fontSize="1.05rem">
                info@innovaas.co
              </Text>
            </Box>
          </Flex>
        </Flex>

        <Text mt={10} fontSize="0.78rem" opacity={0.6}>
          This document is for informational purposes only and does not constitute an offer to sell securities.
          Investment involves risk. Past performance is not indicative of future results.
        </Text>
      </MotionBox>
    </Box>
  );
}
