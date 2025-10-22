import React, { ReactNode } from "react";
import styles from "./gallery-list.module.css";
import { Category, GalleryItem } from "@/types";
import GalleryCard from "../gallery-card/gallery-card";

interface Props {
  galleryItems: GalleryItem[] | undefined;
  actions?: (service: GalleryItem) => ReactNode;
  categories: Category[];
  onDeleteItem?: (itemId: string) => void;
  handleImageClick?: (imageUrl: string) => void;
}

const GalleryList = ({
  galleryItems,
  actions,
  categories,
  onDeleteItem,
  handleImageClick,
}: Props) => {
  if (!galleryItems?.length) {
    return <div className={styles.emptyState}>No gallery items found</div>;
  }

  return (
    <div className={styles.galleryGrid}>
      {galleryItems.map((item) => (
        <GalleryCard
          key={item.id}
          item={item}
          onDelete={onDeleteItem}
          categories={categories}
          handleImageClick={handleImageClick}
        >
          {actions && actions(item)}
        </GalleryCard>
      ))}
    </div>
  );
};

export default GalleryList;
