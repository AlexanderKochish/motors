"use client";

import { useCallback, useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "./testimonials.module.css";
import { Testimonial } from "@/types";
import TestimonialCard from "@/components/ui/testimonial-card/testimonial-card";
import SectionHeader from "@/components/ui/section-header/section-header";
import TestimonialsSkeleton from "@/components/ui/testimonials-skeleton/testimonials-skeleton";
import { useReviews } from "@/hooks/useReviews";
import { useModalContext } from "@/hooks/useModalContext";

interface SliderControlsProps {
  currentSlide: number;
  slidesCount: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}

function SliderControls({
  currentSlide,
  slidesCount,
  onPrev,
  onNext,
  onDotClick,
}: SliderControlsProps) {
  return (
    <div className={styles.sliderControls}>
      <button className={styles.sliderBtn} onClick={onPrev} aria-label="Previous testimonial">
        ‹
      </button>

      <div className={styles.sliderDots}>
        {Array.from({ length: slidesCount }).map((_, index) => (
          <button
            key={index}
            className={`${styles.sliderDot} ${index === currentSlide ? styles.active : ""}`}
            onClick={() => onDotClick(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      <button className={styles.sliderBtn} onClick={onNext} aria-label="Next testimonial">
        ›
      </button>
    </div>
  );
}

function TestimonialsCTA() {
  const { openModal } = useModalContext();
  return (
    <div className={styles.testimonialsCta}>
      <div className={styles.ctaContent}>
        <h3>Leave Your Review</h3>
        <p>Share your experience with our service</p>
      </div>
      <button className={styles.reviewBtn} onClick={() => openModal("review")}>
        Write a Review
      </button>
    </div>
  );
}

// ===================
// Main Component
// ===================
export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesCount, setSlidesCount] = useState(0);
  const { data: testimonials, isLoading } = useReviews();

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(slider) {
      setSlidesCount(slider.track.details.slides.length);
    },
    slides: {
      perView: 1,
      spacing: 15,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 20,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 3,
          spacing: 30,
        },
      },
    },
    loop: true,
    drag: true,
  });

  const nextSlide = useCallback(() => {
    instanceRef.current?.next();
  }, [instanceRef]);

  const prevSlide = useCallback(() => {
    instanceRef.current?.prev();
  }, [instanceRef]);

  const goToSlide = useCallback(
    (index: number) => {
      instanceRef.current?.moveToIdx(index);
    },
    [instanceRef],
  );

  // Auto play
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prevSlide();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Показываем скелетон во время загрузки
  if (isLoading) {
    return <TestimonialsSkeleton />;
  }

  // Если нет отзывов после загрузки
  if (!testimonials || testimonials.length === 0) {
    return (
      <section className={styles.testimonials} id="testimonials">
        <div className="container">
          <SectionHeader
            title="Customer Reviews"
            subtitle="What our customers say about our work quality"
          />
          <p>No reviews yet.</p>
          <TestimonialsCTA />
        </div>
      </section>
    );
  }

  const displayTestimonials = testimonials.slice(0, 6);

  return (
    <section className={styles.testimonials} id="testimonials">
      <div className="container">
        <SectionHeader
          title="Customer Reviews"
          subtitle="What our customers say about our work quality"
        />

        <div className={styles.testimonialsSlider}>
          <div ref={sliderRef} className="keen-slider">
            {displayTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="keen-slider__slide">
                <div className={styles.slideInner}>
                  <TestimonialCard testimonial={testimonial} />
                </div>
              </div>
            ))}
          </div>

          {slidesCount > 1 && (
            <SliderControls
              currentSlide={currentSlide}
              slidesCount={slidesCount}
              onPrev={prevSlide}
              onNext={nextSlide}
              onDotClick={goToSlide}
            />
          )}
        </div>

        <TestimonialsCTA />
      </div>
    </section>
  );
}
