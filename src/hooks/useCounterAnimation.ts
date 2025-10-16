"use client";

import { useCallback } from "react";

export function useCounterAnimation() {
  const animateCounters = useCallback(() => {
    const counters = document.querySelectorAll("[data-target]");

    counters.forEach((counter) => {
      const el = counter as HTMLElement;
      const target = Number(el.dataset.target);
      if (!target) return;

      const duration = 2000;
      const frameRate = 16;
      const step = target / (duration / frameRate);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }

        el.textContent =
          Math.floor(current).toString() + (el.dataset.suffix ? el.dataset.suffix : "");
      }, frameRate);
    });
  }, []);

  return { animateCounters };
}
