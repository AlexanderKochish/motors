import { Testimonial } from "@/types";
import { formatDate } from "@/shared/utils/helpers/formatDate";
import { getInitials } from "@/shared/utils/helpers/getInitials";
import { renderStars } from "@/shared/utils/helpers/renderStars";
import React, { useState } from "react";
import styles from "./testimonial-card.module.css";

interface Props {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: Props) => {
  const [showMore, setShowMore] = useState(false);

  const needsTruncation = testimonial.review_text.length > 155;

  const displayText = showMore
    ? testimonial.review_text
    : `${testimonial.review_text.slice(0, 150)}${needsTruncation ? "..." : ""}`;

  return (
    <div className={styles.testimonialCard}>
      <div className={styles.testimonialHeader}>
        <div className={styles.clientAvatar}>{getInitials(testimonial.name)}</div>
        <div className={styles.clientInfo}>
          <div className={styles.clientName}>{testimonial.name}</div>
          <div className={styles.clientCar}>{testimonial.car_model}</div>
        </div>
        <div className={styles.rating}>{renderStars(testimonial.rating)}</div>
      </div>

      <div className={styles.testimonialText}>
        {displayText}
        {needsTruncation && (
          <button onClick={() => setShowMore(!showMore)} className={styles.showMoreButton}>
            {showMore ? "Show less" : "Show more"}
          </button>
        )}
      </div>

      <div className={styles.testimonialDate}>{formatDate(testimonial.created_at)}</div>
    </div>
  );
};

export default TestimonialCard;
