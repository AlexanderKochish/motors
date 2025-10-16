import { Testimonial } from "@/types";
import { formatDate } from "@/utils/helpers/formatDate";
import { getInitials } from "@/utils/helpers/getInitials";
import { renderStars } from "@/utils/helpers/renderStars";
import React from "react";
import styles from "./testimonial-card.module.css";

interface Props {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: Props) => {
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
      <div className={styles.testimonialText}>{testimonial.review_text}</div>
      <div className={styles.testimonialDate}>{formatDate(testimonial.created_at)}</div>
    </div>
  );
};

export default TestimonialCard;
