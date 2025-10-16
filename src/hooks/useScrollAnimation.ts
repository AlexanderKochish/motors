"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationProps {
  threshold?: number;
  rootMargin?: string;
  animationType?: "fadeUp" | "fadeIn" | "slideIn" | "css";
  triggerOnce?: boolean;
}

export const useScrollAnimation = ({
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
  animationType = "fadeUp",
  triggerOnce = true,
}: UseScrollAnimationProps = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);

        if (isIntersecting && triggerOnce) {
          observerRef.current?.unobserve(element);
        }
      },
      { threshold, rootMargin },
    );

    observerRef.current.observe(element);

    return () => {
      if (element) {
        observerRef.current?.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  const animationClass = isVisible ? `animate-${animationType}` : "";

  return { ref: elementRef, isVisible, animationClass };
};
