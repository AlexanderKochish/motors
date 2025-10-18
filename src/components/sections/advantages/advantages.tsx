"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./advantages.module.css";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import SectionHeader from "@/components/ui/section-header/section-header";
import { useModalContext } from "@/hooks/useModalContext";

const Advantages = () => {
  const { handleBookAppointment } = useModalContext();
  const statsRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { animateCounters } = useCounterAnimation();

  useEffect(() => {
    if (hasAnimated) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            animateCounters();
            setHasAnimated(true);
          }, 300);

          if (statsRef.current) {
            statsObserver.unobserve(statsRef.current);
          }
        }
      });
    };

    const statsObserver = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: "50px 0px 50px 0px",
    });

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        statsObserver.unobserve(statsRef.current);
      }
    };
  }, [animateCounters, hasAnimated]);

  useEffect(() => {
    const handleTouchStart = () => {
      if (!hasAnimated) {
        animateCounters();
        setHasAnimated(true);
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    return () => document.removeEventListener("touchstart", handleTouchStart);
  }, [hasAnimated, animateCounters]);

  const advantages = [
    {
      id: 1,
      icon: "⚡",
      title: "Quick Diagnostics",
      description: "Accurate diagnostics in 30 minutes using modern equipment",
    },
    {
      id: 2,
      icon: "👨‍🔧",
      title: "Experienced Mechanics",
      description: "Specialists with 5+ years experience, undergoing regular training",
    },
    {
      id: 3,
      icon: "💎",
      title: "Original Parts",
      description: "We use only quality original and verified alternative parts",
    },
    {
      id: 4,
      icon: "💰",
      title: "Honest Prices",
      description: "Fixed estimate before work begins, no hidden charges",
    },
  ];

  const stats = [
    { value: 7, label: "years experience", suffix: "+" },
    { value: 2100, label: "satisfied customers", suffix: "+" },
    { value: 12, label: "months warranty", suffix: "" },
    { value: 100, label: "quality", suffix: "%" },
  ];

  const handleFreeDiagnostics = () => {
    handleBookAppointment?.();
  };

  return (
    <section className={styles.advantages} id="advantages" ref={statsRef}>
      <div className="container">
        <SectionHeader
          title="Why Choose Us?"
          subtitle="10 years of experience and thousands of satisfied customers"
        />

        <div className={styles.advantagesContent}>
          <div className={styles.advantagesStats}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <div
                  className={styles.statNumber}
                  data-target={stat.value}
                  data-suffix={stat.suffix}
                >
                  0{stat.suffix}
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div className={styles.advantagesList}>
            {advantages.map((advantage) => (
              <div key={advantage.id} className={styles.advantageItem}>
                <div className={styles.advantageIcon}>{advantage.icon}</div>
                <div className={styles.advantageContent}>
                  <h3>{advantage.title}</h3>
                  <p>{advantage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.ctaBlock}>
          <div className={styles.ctaContent}>
            <h3>Ready to restore your car to perfect condition?</h3>
            <p>Book a free diagnostics right now</p>
          </div>
          <button
            className={styles.ctaButtonLarge}
            onClick={handleFreeDiagnostics}
            aria-label="Book free diagnostics"
          >
            Free Diagnostics
          </button>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
