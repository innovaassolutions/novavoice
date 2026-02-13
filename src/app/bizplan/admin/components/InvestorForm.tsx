"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import type { Investor } from "@/types/supabase";

interface InvestorFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; email: string; phone: string; notes: string }) => Promise<void>;
  investor?: Investor | null;
}

export default function InvestorForm({ isOpen, onClose, onSave, investor }: InvestorFormProps) {
  const [name, setName] = useState(investor?.name || "");
  const [email, setEmail] = useState(investor?.email || "");
  const [phone, setPhone] = useState(investor?.phone || "");
  const [notes, setNotes] = useState(investor?.notes || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await onSave({ name: name.trim(), email: email.trim(), phone: phone.trim(), notes: notes.trim() });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit}>
        <ModalHeader fontFamily="'Montserrat', sans-serif" color="#1e293b">
          {investor ? "Edit Investor" : "Add Investor"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Box w="100%">
              <Text fontSize="sm" fontWeight="600" color="#64748b" mb={1}>Name *</Text>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
                bg="#f8fafc"
                border="1px solid #e2e8f0"
                color="#1e293b"
              />
            </Box>
            <Box w="100%">
              <Text fontSize="sm" fontWeight="600" color="#64748b" mb={1}>Email *</Text>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                bg="#f8fafc"
                border="1px solid #e2e8f0"
                color="#1e293b"
              />
            </Box>
            <Box w="100%">
              <Text fontSize="sm" fontWeight="600" color="#64748b" mb={1}>Phone</Text>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555-000-0000"
                bg="#f8fafc"
                border="1px solid #e2e8f0"
                color="#1e293b"
              />
            </Box>
            <Box w="100%">
              <Text fontSize="sm" fontWeight="600" color="#64748b" mb={1}>Notes</Text>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any notes about this investor..."
                bg="#f8fafc"
                border="1px solid #e2e8f0"
                color="#1e293b"
                rows={3}
              />
            </Box>
            {error && <Text color="red.500" fontSize="sm" w="100%">{error}</Text>}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            bg="#F25C05"
            color="white"
            _hover={{ bg: "#d94e04" }}
            isLoading={loading}
          >
            {investor ? "Update" : "Create"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
