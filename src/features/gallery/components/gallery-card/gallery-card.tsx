import React, { ReactNode } from "react";
import styles from "./gallery-card.module.css";
import { Category, GalleryItem } from "@/types";
import { AdminActions } from "@/features/admin/components/admin-service-actions/admin-service-action";

interface Props {
  item: GalleryItem;
  children: ReactNode;
  handleImageClick?: (image: string) => void;
  onDelete?: (itemId: string) => void;
  categories?: Category[];
}

const GalleryCard = ({ item, children, categories, onDelete, handleImageClick }: Props) => {
  const handleDelete = () => {
    onDelete?.(item.id);
  };

  const categoryLabel = categories?.find((f) => f.id === item.category_id)?.label;
  return (
    <div
      key={item.id}
      className={styles.galleryItem}
      onClick={() => handleImageClick?.(item.image)}
    >
      <img src={item.image} alt={item.alt} loading="lazy" />
      <div className={styles.galleryOverlay}>
        <div className={styles.galleryInfo}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <span className={styles.galleryCategory}>{categoryLabel}</span>
        </div>
      </div>
      {children && (
        <div onClick={handleDelete} className={styles.adminActionsContainer}>
          {children}
        </div>
      )}
    </div>
  );
};

export default GalleryCard;
