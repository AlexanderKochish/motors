"use client";

import { useCallback } from "react";

export const useSmoothScroll = (headerSelector: string) => {
  const scrollToSection = useCallback(
    (sectionId: string, onScrollComplete?: () => void) => {
      const section = document.getElementById(sectionId.replace("#", ""));
      if (!section) return;

      const header = document.querySelector(headerSelector) as HTMLElement;
      const headerHeight = header?.offsetHeight || 0;
      const targetPosition = section.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      if (onScrollComplete) {
        const handleScrollEnd = () => {
          onScrollComplete();
          window.removeEventListener("scroll", handleScrollEnd);
        };
        window.addEventListener("scroll", handleScrollEnd, { passive: true });
      }
    },
    [headerSelector],
  );

  return { scrollToSection };
};
