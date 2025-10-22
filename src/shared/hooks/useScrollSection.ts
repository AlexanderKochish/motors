"use client";

import { useState, useEffect, useCallback } from "react";

export const useScrollSection = (offset = 100) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const updateActiveSection = useCallback(() => {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY + offset;

    for (const section of sections) {
      const el = section as HTMLElement;
      const { offsetTop, offsetHeight } = el;
      const sectionId = section.id;

      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        setActiveSection(sectionId);
        break;
      }
    }
  }, [offset]);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > offset);
    updateActiveSection();
  }, [offset, updateActiveSection]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { isScrolled, activeSection, setActiveSection };
};
