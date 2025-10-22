"use client";

import { useState, useEffect, useCallback } from "react";

export const useMenu = (menuSelector: string, toggleSelector: string) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const navMenu = document.querySelector(menuSelector);
      const navToggle = document.querySelector(toggleSelector);

      if (
        isMenuOpen &&
        navMenu &&
        navToggle &&
        !navToggle.contains(e.target as Node) &&
        !navMenu.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isMenuOpen, closeMenu, menuSelector, toggleSelector]);

  return { isMenuOpen, closeMenu, toggleMenu };
};
