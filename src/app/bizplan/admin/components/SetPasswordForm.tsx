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

interface SetPasswordFormProps {
  onComplete: () => void;
}

export default function SetPasswordForm({ onComplete }: SetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const { error: updateError } = await supabaseBrowser.auth.updateUser({
      password,
    });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    onComplete();
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
              Set Your Password
            </Heading>
            <Text color="#64748b" fontSize="sm">
              Create a password for your admin account.
            </Text>
          </Box>

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
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
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm password"
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
            Set Password
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
