"use client";

import styles from "./testimonials-skeleton.module.css";

export default function TestimonialsSkeleton() {
  return (
    <section className={styles.testimonials} id="testimonials">
      {" "}
      {/* Добавь эту обертку */}
      <div className="container">
        {/* Section Header Skeleton */}
        <div className={styles.sectionHeaderSkeleton}>
          <div className={styles.titleSkeleton}></div>
          <div className={styles.subtitleSkeleton}></div>
        </div>

        {/* Slider Skeleton */}
        <div className={styles.testimonialsSlider}>
          <div className={styles.sliderSkeleton}>
            <div className={styles.sliderContainerSkeleton}>
              {/* Skeleton Cards */}
              {[1, 2, 3].map((item) => (
                <div key={item} className={styles.cardSkeleton}>
                  <div className={styles.cardHeaderSkeleton}>
                    <div className={styles.avatarSkeleton}></div>
                    <div className={styles.userInfoSkeleton}>
                      <div className={styles.userNameSkeleton}></div>
                      <div className={styles.userRatingSkeleton}></div>
                    </div>
                  </div>
                  <div className={styles.cardContentSkeleton}>
                    <div className={styles.textLineSkeleton}></div>
                    <div className={styles.textLineSkeleton}></div>
                    <div className={styles.textLineSkeleton}></div>
                    <div className={styles.textLineShortSkeleton}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Controls Skeleton */}
            <div className={styles.sliderControls}>
              <div className={styles.sliderBtnSkeleton}></div>
              <div className={styles.sliderDotsSkeleton}>
                {[1, 2, 3].map((dot) => (
                  <div key={dot} className={styles.sliderDotSkeleton}></div>
                ))}
              </div>
              <div className={styles.sliderBtnSkeleton}></div>
            </div>
          </div>
        </div>

        {/* CTA Section Skeleton */}
        <div className={styles.ctaSkeleton}>
          <div className={styles.ctaContentSkeleton}>
            <div className={styles.ctaTitleSkeleton}></div>
            <div className={styles.ctaTextSkeleton}></div>
          </div>
          <div className={styles.ctaButtonSkeleton}></div>
        </div>
      </div>
    </section>
  );
}
