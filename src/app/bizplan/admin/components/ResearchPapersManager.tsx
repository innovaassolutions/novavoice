"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { supabaseBrowser } from "@/lib/supabase/browser";
import type { ResearchPaper } from "@/types/supabase";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ResearchPapersManager() {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const getAuthToken = useCallback(async () => {
    const { data } = await supabaseBrowser.auth.getSession();
    return data.session?.access_token || "";
  }, []);

  const fetchPapers = useCallback(async () => {
    const res = await fetch("/api/bizplan/research-papers");
    if (res.ok) {
      const data = await res.json();
      setPapers(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPapers();
  }, [fetchPapers]);

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file || !title.trim()) {
      toast({
        title: "Title and file are required",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    if (file.type !== "application/pdf") {
      toast({
        title: "Only PDF files are allowed",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    setUploading(true);
    const token = await getAuthToken();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title.trim());
    if (description.trim()) {
      formData.append("description", description.trim());
    }

    const res = await fetch("/api/bizplan/admin/research-papers", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (res.ok) {
      toast({ title: "Paper uploaded", status: "success", duration: 3000 });
      setTitle("");
      setDescription("");
      if (fileRef.current) fileRef.current.value = "";
      fetchPapers();
    } else {
      const err = await res.json();
      toast({
        title: err.error || "Upload failed",
        status: "error",
        duration: 4000,
      });
    }
    setUploading(false);
  };

  const handleDelete = async (id: string, paperTitle: string) => {
    if (!confirm(`Delete "${paperTitle}"? This cannot be undone.`)) return;

    const token = await getAuthToken();
    const res = await fetch(`/api/bizplan/admin/research-papers/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      toast({ title: "Paper deleted", status: "success", duration: 3000 });
      fetchPapers();
    } else {
      toast({ title: "Delete failed", status: "error", duration: 3000 });
    }
  };

  return (
    <Box bg="white" p={6} borderRadius="12px" border="1px solid #e2e8f0">
      <Heading
        as="h3"
        size="md"
        fontFamily="'Montserrat', sans-serif"
        color="#1e293b"
        mb={5}
      >
        Research Papers
      </Heading>

      {/* Upload Form */}
      <Box
        bg="#f8fafc"
        p={5}
        borderRadius="10px"
        border="1px solid #e2e8f0"
        mb={6}
      >
        <Text fontWeight="600" fontSize="sm" color="#1e293b" mb={3}>
          Upload New Paper
        </Text>
        <Flex direction={{ base: "column", md: "row" }} gap={3} mb={3}>
          <FormControl flex={1}>
            <FormLabel fontSize="xs" color="#64748b" mb={1}>
              Title *
            </FormLabel>
            <Input
              size="sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Market Analysis Report"
              borderColor="#e2e8f0"
              _focus={{ borderColor: "#F25C05" }}
            />
          </FormControl>
          <FormControl flex={1}>
            <FormLabel fontSize="xs" color="#64748b" mb={1}>
              PDF File *
            </FormLabel>
            <Input
              type="file"
              accept=".pdf"
              ref={fileRef}
              size="sm"
              borderColor="#e2e8f0"
              pt="3px"
            />
          </FormControl>
        </Flex>
        <FormControl mb={3}>
          <FormLabel fontSize="xs" color="#64748b" mb={1}>
            Description (optional)
          </FormLabel>
          <Textarea
            size="sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of this paper..."
            rows={2}
            borderColor="#e2e8f0"
            _focus={{ borderColor: "#F25C05" }}
          />
        </FormControl>
        <Button
          size="sm"
          bg="#F25C05"
          color="white"
          _hover={{ bg: "#d94e04" }}
          isLoading={uploading}
          onClick={handleUpload}
        >
          Upload Paper
        </Button>
      </Box>

      {/* Papers Table */}
      {loading ? (
        <Text fontSize="sm" color="#94a3b8">
          Loading...
        </Text>
      ) : papers.length === 0 ? (
        <Text fontSize="sm" color="#94a3b8">
          No research papers uploaded yet.
        </Text>
      ) : (
        <Box overflowX="auto">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th color="#64748b" fontSize="xs">
                  Title
                </Th>
                <Th color="#64748b" fontSize="xs">
                  File
                </Th>
                <Th color="#64748b" fontSize="xs">
                  Size
                </Th>
                <Th color="#64748b" fontSize="xs">
                  Uploaded
                </Th>
                <Th />
              </Tr>
            </Thead>
            <Tbody>
              {papers.map((paper) => (
                <Tr key={paper.id}>
                  <Td>
                    <Text fontWeight="600" fontSize="sm" color="#1e293b">
                      {paper.title}
                    </Text>
                    {paper.description && (
                      <Text fontSize="xs" color="#94a3b8" noOfLines={1}>
                        {paper.description}
                      </Text>
                    )}
                  </Td>
                  <Td>
                    <Text fontSize="xs" color="#64748b">
                      {paper.file_name}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="xs" color="#64748b">
                      {formatFileSize(paper.file_size)}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="xs" color="#64748b">
                      {new Date(paper.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </Text>
                  </Td>
                  <Td>
                    <Button
                      size="xs"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => handleDelete(paper.id, paper.title)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
}
