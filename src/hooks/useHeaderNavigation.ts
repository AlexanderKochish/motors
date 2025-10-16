"use client";

import { useScrollSection } from "./useScrollSection";
import { useMenu } from "./useMenu";
import { useSmoothScroll } from "./useSmoothScroll";

export const useHeaderNavigation = (styles: {
  header: string;
  navMenu: string;
  navToggle: string;
}) => {
  const { isScrolled, activeSection, setActiveSection } = useScrollSection();
  const { isMenuOpen, closeMenu, toggleMenu } = useMenu(
    `.${styles.navMenu}`,
    `.${styles.navToggle}`,
  );
  const { scrollToSection } = useSmoothScroll(`.${styles.header}`);

  const handleLinkClick = (sectionId: string) => {
    scrollToSection(sectionId, () => {
      closeMenu();
      setActiveSection(sectionId.replace("#", ""));
    });
  };

  return {
    isScrolled,
    isMenuOpen,
    activeSection,
    toggleMenu,
    handleLinkClick,
  };
};
