"use client";

import { useCallback, useEffect } from "react";

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useScrollAnimations() {
  const initScrollAnimations = useCallback((options: ScrollAnimationOptions = {}) => {
    const { threshold = 0.1, rootMargin = "0px" } = options;

    const sections = {
      services: ".service-card",
      advantages: ".advantage-item, .stat-item, .cta-block",
      testimonials: ".testimonial-card, .testimonials-cta",
      gallery: ".gallery-item, .gallery-filters, .gallery-cta",
      contacts: ".contact-item, .social-links, .contact-map, .appointment-widget",
    };

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const computedStyle = window.getComputedStyle(target);
          const animationName = computedStyle.animationName;

          if (animationName && animationName !== "none") {
            target.style.animationPlayState = "running";
          } else {
            target.style.opacity = "1";
            target.style.transform = "translateY(0)";
          }
        }
      });
    };

    Object.values(sections).forEach((selector) => {
      const elements = document.querySelectorAll<HTMLElement>(selector);
      if (elements.length > 0) {
        const observer = new IntersectionObserver(handleIntersection, {
          threshold,
          rootMargin,
        });

        elements.forEach((element) => observer.observe(element));
      }
    });
  }, []);

  useEffect(() => {
    initScrollAnimations();
  }, [initScrollAnimations]);

  return { initScrollAnimations };
}
