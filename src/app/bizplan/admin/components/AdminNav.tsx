"use client";

import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";

export default function AdminNav() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabaseBrowser.auth.signOut();
    router.refresh();
  };

  return (
    <Box bg="white" borderBottom="1px solid #e2e8f0" px={6} py={3}>
      <Flex maxW="1200px" mx="auto" align="center" justify="space-between">
        <Heading
          as="h1"
          size="md"
          fontFamily="'Montserrat', sans-serif"
          color="#1e293b"
          cursor="pointer"
          onClick={() => router.push("/bizplan/admin")}
        >
          NovaVoice <Box as="span" color="#F25C05">Admin</Box>
        </Heading>
        <Button
          size="sm"
          variant="outline"
          borderColor="#e2e8f0"
          color="#64748b"
          _hover={{ bg: "#f8fafc" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Flex>
    </Box>
  );
}
