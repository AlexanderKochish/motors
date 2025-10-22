"use client";

import { useCallback, useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "./testimonials.module.css";
import TestimonialCard from "@/features/reviews/components/testimonial-card/testimonial-card";
import SectionHeader from "@/shared/components/section-header/section-header";
import TestimonialsSkeleton from "@/features/reviews/components/testimonials-skeleton/testimonials-skeleton";

import { useModalContext } from "@/shared/hooks/useModalContext";
import { useReviews } from "@/features/reviews/hooks/useReviews";
import EmptyState from "@/shared/components/empty-state/empty-state";

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

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesCount, setSlidesCount] = useState(0);
  const { approvedReviews: testimonials, isLoadingApprovedReview: isLoading } = useReviews();

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
          spacing: 20,
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

  if (isLoading) {
    return <TestimonialsSkeleton />;
  }

  if (!testimonials || testimonials.length === 0) {
    return (
      <section className={styles.testimonials} id="testimonials">
        <div className="container">
          <SectionHeader
            title="Customer Reviews"
            subtitle="What our customers say about our work quality"
          />
          <EmptyState title="Reviews" description="No reviews yet." />
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

          {slidesCount > 2 && (
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
