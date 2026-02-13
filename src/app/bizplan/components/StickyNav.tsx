"use client";

import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { sections } from "../data/bizplanData";

export default function StickyNav() {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box className="bp-sticky-nav">
      <Flex maxW="1200px" mx="auto" px={4}>
        {sections.map(({ id, label }) => (
          <Box
            key={id}
            as="button"
            className={`bp-nav-link${activeSection === id ? " active" : ""}`}
            onClick={() => handleClick(id)}
          >
            {label}
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
