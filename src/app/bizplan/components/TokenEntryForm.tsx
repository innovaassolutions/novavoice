"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

interface TokenEntryFormProps {
  onSubmit: (token: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export default function TokenEntryForm({ onSubmit, loading, error }: TokenEntryFormProps) {
  const [token, setToken] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return;
    await onSubmit(token.trim());
  };

  return (
    <Box className="bizplan-wrapper" minH="100vh">
      <Flex
        minH="100vh"
        align="center"
        justify="center"
        bg="linear-gradient(135deg, #FFF8F3 0%, #FFE8D4 50%, #FFDCC0 100%)"
        px={4}
      >
        <Box
          as="form"
          onSubmit={handleSubmit}
          bg="white"
          p={8}
          borderRadius="16px"
          boxShadow="0 4px 24px rgba(0,0,0,0.08)"
          maxW="420px"
          w="100%"
        >
          <VStack spacing={6} align="stretch">
            <Box textAlign="center">
              <Heading
                as="h1"
                size="lg"
                fontFamily="'Montserrat', sans-serif"
                color="#1e293b"
                mb={2}
              >
                Investor Access
              </Heading>
              <Text color="#64748b" fontSize="sm">
                Enter your access token to view the business plan.
              </Text>
            </Box>

            <Box>
              <Input
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter your token"
                size="lg"
                bg="#FFF8F3"
                border="1px solid #f1e8e0"
                _focus={{ borderColor: "#F25C05", boxShadow: "0 0 0 1px #F25C05" }}
                _placeholder={{ color: "#a0aec0" }}
                color="#1e293b"
                fontFamily="monospace"
                autoFocus
              />
              {error && (
                <Text color="red.500" fontSize="sm" mt={2}>
                  {error}
                </Text>
              )}
            </Box>

            <Button
              type="submit"
              bg="#F25C05"
              color="white"
              size="lg"
              w="100%"
              isLoading={loading}
              _hover={{ bg: "#d94e04" }}
              _active={{ bg: "#c04503" }}
            >
              View Business Plan
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}
