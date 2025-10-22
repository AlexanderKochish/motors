"use client";

import styles from "./gallery-skeleton.module.css";

export default function GallerySkeleton() {
  return (
    <section className={styles.gallerySkeleton} id="gallery">
      <div className="container">
        <div className={styles.sectionHeaderSkeleton}>
          <div className={styles.titleSkeleton}></div>
          <div className={styles.subtitleSkeleton}></div>
        </div>
        <div className={styles.filtersSkeleton}>
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className={styles.filterSkeleton}></div>
          ))}
        </div>

        <div className={styles.galleryGridSkeleton}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className={styles.galleryItemSkeleton}>
              <div className={styles.imageSkeleton}></div>
              <div className={styles.overlaySkeleton}>
                <div className={styles.infoSkeleton}>
                  <div className={styles.titleLineSkeleton}></div>
                  <div className={styles.textLineSkeleton}></div>
                  <div className={styles.categorySkeleton}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

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
