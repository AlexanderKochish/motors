"use client";

import { useCallback } from "react";

export function useCounterAnimation() {
  const animateCounters = useCallback(() => {
    requestAnimationFrame(() => {
      const counters = document.querySelectorAll("[data-target]");

      counters.forEach((counter, index) => {
        const el = counter as HTMLElement;
        const target = Number(el.getAttribute("data-target"));
        const suffix = el.getAttribute("data-suffix") || "";

        if (!target || isNaN(target)) return;

        setTimeout(() => {
          el.textContent = `0${suffix}`;

          const duration = 2000;
          const frameRate = 1000 / 60;
          const steps = duration / frameRate;
          const increment = target / steps;
          let current = 0;
          let step = 0;

          const timer = setInterval(() => {
            current += increment;
            step++;

            if (step >= steps) {
              current = target;
              clearInterval(timer);
            }

            el.textContent = Math.floor(current).toString() + suffix;
          }, frameRate);
        }, index * 100);
      });
    });
  }, []);

  return { animateCounters };
}
