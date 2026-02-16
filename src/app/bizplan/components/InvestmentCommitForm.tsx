"use client";

import { useState } from "react";
import { Box, Button, Flex, Heading, Input, InputGroup, InputLeftElement, SimpleGrid, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface InvestmentCommitFormProps {
  investorId: string;
}

export default function InvestmentCommitForm({ investorId }: InvestmentCommitFormProps) {
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const num = Number(amount);
    if (!num || num < 1) {
      setError("Please enter an amount.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/bizplan/commit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ investorId, amount: num }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box id="commit" className="bp-section bp-section-alt">
      <MotionBox
        maxW="800px"
        mx="auto"
        textAlign="center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {submitted ? (
          <Box
            className="bp-card"
            bg="#f0fdf4"
            borderColor="#bbf7d0"
            py={10}
          >
            <Text fontSize="2rem" mb={2}>&#10003;</Text>
            <Heading as="h3" fontSize="1.5rem" mb={2} color="#166534 !important">
              Thank You!
            </Heading>
            <Text fontSize="1rem" color="#166534 !important">
              Your interest of <strong>${Number(amount).toLocaleString()}</strong> has been recorded.
              We&apos;ll be in touch shortly to discuss next steps.
            </Text>
          </Box>
        ) : (
          <>
            <Heading as="h3" fontSize={{ base: "1.5rem", md: "1.75rem" }} mb={2}>
              Interested in Investing?
            </Heading>
            <Text fontSize="1rem" mb={8} maxW="450px" mx="auto">
              Let us know how much you&apos;d like to invest and we&apos;ll follow up with you directly.
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} maxW="700px" mx="auto">
              {/* Investment Amount Card */}
              <Box className="bp-card">
                <Text
                  fontSize="0.72rem"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="0.08em"
                  color="#64748b !important"
                  mb={3}
                  textAlign="left"
                >
                  Investment Amount
                </Text>
                <InputGroup size="lg" mb={3}>
                  <InputLeftElement
                    pointerEvents="none"
                    color="#64748b"
                    fontSize="1.1rem"
                    fontWeight="700"
                  >
                    $
                  </InputLeftElement>
                  <Input
                    type="number"
                    placeholder="2,500"
                    value={amount}
                    onChange={(e) => { setAmount(e.target.value); setError(""); }}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
                    borderColor="#e2e8f0"
                    _hover={{ borderColor: "#cbd5e1" }}
                    _focus={{ borderColor: "#F25C05", boxShadow: "0 0 0 1px #F25C05" }}
                    fontFamily="'Montserrat', sans-serif"
                    fontWeight="700"
                    fontSize="1.25rem"
                  />
                </InputGroup>

                {error && (
                  <Text fontSize="0.85rem" color="#dc2626 !important" mb={3} textAlign="left">
                    {error}
                  </Text>
                )}

                <Button
                  w="100%"
                  bg="#F25C05"
                  color="white"
                  size="lg"
                  fontWeight="700"
                  _hover={{ bg: "#d94e04" }}
                  onClick={handleSubmit}
                  isLoading={submitting}
                  loadingText="Submitting..."
                >
                  Submit Interest
                </Button>

                <Flex justify="center" gap={4} mt={4}>
                  <Text fontSize="0.78rem" color="#94a3b8 !important">
                    Minimum: $2,500
                  </Text>
                  <Text fontSize="0.78rem" color="#94a3b8 !important">
                    No obligation
                  </Text>
                </Flex>
              </Box>

              {/* Chat with Lou Card */}
              <a
                href="https://novavoice.innovaas.co"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "block" }}
              >
                <Flex
                  className="bp-card"
                  direction="column"
                  align="center"
                  justify="center"
                  h="100%"
                  _hover={{ boxShadow: "0 8px 24px rgba(242,92,5,0.15)", transform: "translateY(-3px)" }}
                  transition="all 0.2s"
                  cursor="pointer"
                >
                  <Box
                    w="90px"
                    h="90px"
                    borderRadius="full"
                    overflow="hidden"
                    mb={4}
                    border="3px solid #F25C05"
                  >
                    <img
                      src="/lou.png"
                      alt="Lou — NovaVoice AI Agent"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                  <Text fontWeight="800" fontSize="1.05rem" color="#1e293b !important" mb={1}>
                    Visit NovaVoice
                  </Text>
                  <Text fontWeight="700" fontSize="0.95rem" color="#F25C05 !important" mb={2}>
                    Have a chat with Lou
                  </Text>
                  <Text fontSize="0.8rem" color="#64748b !important">
                    novavoice.innovaas.co
                  </Text>
                </Flex>
              </a>
            </SimpleGrid>
          </>
        )}
      </MotionBox>
    </Box>
  );
}
