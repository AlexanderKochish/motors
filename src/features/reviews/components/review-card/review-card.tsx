import React from "react";
import styles from "./review-card.module.css";
import TableCard from "@/shared/components/table-card/table-card";
import { getStatusVariant } from "@/shared/utils/helpers/getStatusVariant";
import { Status, Testimonial } from "@/types";
import { renderStars } from "@/shared/utils/helpers/renderStars";

interface Props {
  review: Testimonial;
  mutate: ({ id, status }: { id: string; status: Status }) => void;
}

const ReviewCard = ({ review, mutate }: Props) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return "✅";
      case "pending":
        return "⏳";
      case "rejected":
        return "❌";
      default:
        return "📝";
    }
  };

  return (
    <TableCard key={review.id}>
      <div className={styles.cardHeader}>
        <div className={styles.mainInfo}>
          <div className={styles.avatar}>{review.name.charAt(0).toUpperCase()}</div>
          <div className={styles.customerMain}>
            <h3 className={styles.customerName}>{review.name}</h3>
            <div className={styles.rating}>
              {renderStars(review.rating)}
              <span className={styles.ratingValue}>{review.rating}.0</span>
            </div>
          </div>
        </div>
        <div className={styles.headerRight}>
          <span className={`${styles.statusBadge} ${styles[getStatusVariant(review.status)]}`}>
            {getStatusIcon(review.status)} {review.status}
          </span>
          <span className={styles.date}>{formatDate(review.created_at)}</span>
        </div>
      </div>

      <div className={styles.reviewText}>{review.review_text}</div>

      {review.status === "pending" && (
        <div className={styles.actionsSection}>
          <div className={styles.actionButtons}>
            <button
              onClick={() => mutate({ id: review.id, status: "approved" })}
              className={`${styles.actionButton} ${styles.approveButton}`}
            >
              ✓ Approve
            </button>
            <button
              onClick={() => mutate({ id: review.id, status: "cancelled" })}
              className={`${styles.actionButton} ${styles.rejectButton}`}
            >
              ✕ Reject
            </button>
          </div>
        </div>
      )}

      {(review.status === "approved" || review.status === "cancelled") && (
        <div className={styles.finalStatus}>
          <span>
            Review {review.status} • {formatDate(review.created_at)}
          </span>
        </div>
      )}
    </TableCard>
  );
};

export default ReviewCard;
