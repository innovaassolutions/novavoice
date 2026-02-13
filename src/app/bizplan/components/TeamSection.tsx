"use client";

import { Box, Heading, Text, SimpleGrid, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";

const MotionBox = motion(Box);

const team = [
  {
    name: "Todd Abraham",
    role: "Founder & CEO",
    photo: "/team-todd.png",
    bio: "Todd Abraham is a visionary leader with over two decades of enterprise technology and digital transformation experience. As founder and CEO of Innovaas Solutions, he specializes in harnessing AI and modern systems architecture to help mid-market companies streamline operations, unlock revenue opportunities, and accelerate digital readiness. Todd\u2019s strategic expertise spans agentic development, systems integration, and consulting, with a track record of driving growth across Asia Pacific and beyond. He holds an Executive MBA from Aalto University School of Business (ranked among the world\u2019s top 100 EMBA programs) and combines deep technical knowledge with business acumen to design solutions that deliver measurable impact.",
  },
  {
    name: "Jeff Zimmer",
    role: "Head of Business Development, North America",
    photo: "/team-jeff.png",
    bio: "Jeff Zimmer brings over a decade of enterprise sales leadership and business development experience to his role at Innovaas Solutions. As an accomplished account executive with a proven track record at industry leaders including Rogers Communications and CDW Canada, Jeff excels at translating complex AI and workflow solutions into tangible value for enterprise clients. His expertise in solution selling, direct sales, and account management positions him to establish and scale Innovaas\u2019 North American presence across key verticals. Jeff\u2019s consultative approach and deep understanding of enterprise customer pain points enable him to build strategic partnerships that drive sustainable revenue growth.",
  },
];

export default function TeamSection() {
  return (
    <Box id="team" className="bp-section bp-section-alt">
      <Box maxW="1100px" mx="auto">
        <Heading as="h2" fontSize={{ base: "1.75rem", md: "2.25rem" }} mb={2} textAlign="center">
          Our Team
        </Heading>
        <Text textAlign="center" mb={10} fontSize="1.05rem" maxW="650px" mx="auto">
          Experienced operators combining deep technical expertise with enterprise sales leadership.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {team.map((member, i) => (
            <MotionBox
              key={member.name}
              className="bp-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Flex direction="column" align="center" mb={4}>
                <Box
                  borderRadius="12px"
                  overflow="hidden"
                  border="1px solid #f1e8e0"
                  mb={4}
                  w="100%"
                  maxW="360px"
                  position="relative"
                  sx={{ aspectRatio: "16/9" }}
                >
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                </Box>
                <Heading as="h3" fontSize="1.25rem" fontWeight="800" color="#1e293b !important">
                  {member.name}
                </Heading>
                <Text
                  fontSize="0.85rem"
                  fontWeight="600"
                  color="#F25C05 !important"
                  mt={1}
                >
                  {member.role}
                </Text>
              </Flex>
              <Text fontSize="0.88rem" lineHeight="1.7">
                {member.bio}
              </Text>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
