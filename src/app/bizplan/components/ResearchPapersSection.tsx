"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { ResearchPaper } from "@/types/supabase";

const MotionBox = motion(Box);

interface PaperWithUrl extends ResearchPaper {
  download_url: string | null;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ResearchPapersSection() {
  const [papers, setPapers] = useState<PaperWithUrl[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bizplan/research-papers")
      .then((res) => res.json())
      .then((data) => {
        setPapers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box id="research" className="bp-section bp-section-white">
        <Flex justify="center" py={12}>
          <Spinner size="lg" color="#F25C05" />
        </Flex>
      </Box>
    );
  }

  if (papers.length === 0) return null;

  return (
    <Box id="research" className="bp-section bp-section-white">
      <Box maxW="1100px" mx="auto">
        <Heading
          as="h2"
          fontSize={{ base: "1.75rem", md: "2.25rem" }}
          mb={2}
          textAlign="center"
        >
          Research &amp; Analysis
        </Heading>
        <Text
          textAlign="center"
          mb={10}
          fontSize="1.05rem"
          maxW="650px"
          mx="auto"
        >
          Download the detailed research papers behind our business plan.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {papers.map((paper, i) => (
            <MotionBox
              key={paper.id}
              className="bp-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Flex direction="column" h="100%" justify="space-between">
                <Box>
                  <Flex align="center" gap={3} mb={3}>
                    <Box
                      bg="#FFF0E6"
                      borderRadius="10px"
                      p={2}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#F25C05"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </Box>
                    <Box>
                      <Heading
                        as="h3"
                        fontSize="1.1rem"
                        fontWeight="700"
                        color="#1e293b !important"
                        lineHeight="1.3"
                      >
                        {paper.title}
                      </Heading>
                    </Box>
                  </Flex>
                  {paper.description && (
                    <Text fontSize="0.88rem" lineHeight="1.7" mb={4}>
                      {paper.description}
                    </Text>
                  )}
                </Box>

                <Flex align="center" justify="space-between" mt={3}>
                  <Text fontSize="0.78rem" color="#94a3b8">
                    PDF &middot; {formatFileSize(paper.file_size)}
                  </Text>
                  {paper.download_url ? (
                    <Button
                      as="a"
                      href={paper.download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="sm"
                      bg="#F25C05"
                      color="white"
                      _hover={{ bg: "#d94e04" }}
                      borderRadius="8px"
                      fontWeight="600"
                      fontSize="0.82rem"
                    >
                      Download
                    </Button>
                  ) : (
                    <Text fontSize="0.78rem" color="#94a3b8">
                      Unavailable
                    </Text>
                  )}
                </Flex>
              </Flex>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
