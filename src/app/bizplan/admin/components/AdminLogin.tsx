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
import { supabaseBrowser } from "@/lib/supabase/browser";

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    onLogin();
    setLoading(false);
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="#f8fafc" px={4}>
      <Box
        as="form"
        onSubmit={handleSubmit}
        bg="white"
        p={8}
        borderRadius="16px"
        boxShadow="0 4px 24px rgba(0,0,0,0.08)"
        maxW="400px"
        w="100%"
      >
        <VStack spacing={5} align="stretch">
          <Box textAlign="center">
            <Heading
              as="h1"
              size="lg"
              fontFamily="'Montserrat', sans-serif"
              color="#1e293b"
              mb={2}
            >
              Admin Login
            </Heading>
            <Text color="#64748b" fontSize="sm">
              NovaVoice Investor Portal
            </Text>
          </Box>

          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            size="lg"
            bg="#f8fafc"
            border="1px solid #e2e8f0"
            _focus={{ borderColor: "#F25C05", boxShadow: "0 0 0 1px #F25C05" }}
            color="#1e293b"
            autoFocus
            required
          />

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            size="lg"
            bg="#f8fafc"
            border="1px solid #e2e8f0"
            _focus={{ borderColor: "#F25C05", boxShadow: "0 0 0 1px #F25C05" }}
            color="#1e293b"
            required
          />

          {error && (
            <Text color="red.500" fontSize="sm">
              {error}
            </Text>
          )}

          <Button
            type="submit"
            bg="#F25C05"
            color="white"
            size="lg"
            w="100%"
            isLoading={loading}
            _hover={{ bg: "#d94e04" }}
          >
            Sign In
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
