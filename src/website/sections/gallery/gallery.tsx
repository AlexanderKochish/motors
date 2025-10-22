"use client";

import React, { useState, useRef } from "react";
import styles from "./gallery.module.css";
import SectionHeader from "@/shared/components/section-header/section-header";
import GallerySkeleton from "@/features/gallery/components/gallery-skeleton/gallery-skeleton";
import ErrorBlock from "@/shared/components/error-block/error-block";
import { useGallery } from "@/features/gallery/hooks/useGallery";
import GalleryList from "@/features/gallery/components/gallery-list/gallery-list";
import { useModalContext } from "@/shared/hooks/useModalContext";

export default function Gallery() {
  const { handleBookAppointment } = useModalContext();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const {
    filteredItems,
    setActiveFilter,
    isLoadingCategories,
    isLoadingGallery,
    activeFilter,
    categories,
    isErrorCategories,
    isErrorGallery,
  } = useGallery();

  // Показываем скелетон во время загрузки
  if (isLoadingCategories || isLoadingGallery) {
    return <GallerySkeleton />;
  }

  if (isErrorCategories || isErrorGallery) {
    return <ErrorBlock message="Failed to load gallery" />;
  }

  const handleFilterClick = (filterKey: string) => setActiveFilter(filterKey);
  const handleImageClick = (imageUrl: string) => setSelectedImage(imageUrl);
  const closeLightbox = () => setSelectedImage(null);
  const handleVisitServiceCenter = () => handleBookAppointment("Service Center Visit");

  return (
    <section className={styles.gallery} id="gallery">
      <div className="container">
        <SectionHeader title="Our Work" subtitle="Photos of completed repairs and our service" />

        <div className={styles.galleryFilters}>
          {categories?.map((filter) => (
            <button
              key={filter.key}
              className={`${styles.filterBtn} ${
                activeFilter === filter.key ? styles.filterBtnActive : ""
              }`}
              onClick={() => handleFilterClick(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <GalleryList
          handleImageClick={handleImageClick}
          categories={categories}
          galleryItems={filteredItems}
        />

        <div className={styles.galleryCta}>
          <div className={styles.ctaContent}>
            <h3>Want to see more work?</h3>
            <p>Visit our service center and see the quality for yourself</p>
          </div>
          <button
            className={styles.galleryBtn}
            onClick={handleVisitServiceCenter}
            aria-label="Visit our service center"
          >
            Visit Service Center
          </button>
        </div>
      </div>

      {selectedImage && (
        <div className={styles.lightbox} ref={lightboxRef} onClick={closeLightbox}>
          <button
            className={styles.lightboxClose}
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ×
          </button>
          <img
            src={selectedImage}
            alt="Enlarged view"
            className={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
