import React from "react";
import styles from "./reviews-list.module.css";
import { Status, Testimonial } from "@/types";
import ReviewCard from "../review-card/review-card";

interface Props {
  reviews: Testimonial[];
  mutate: ({ id, status }: { id: string; status: Status }) => void;
}

const ReviewsList = ({ reviews, mutate }: Props) => {
  return (
    <div className={styles.reviewsList}>
      {reviews &&
        reviews.map((review) => <ReviewCard key={review.id} review={review} mutate={mutate} />)}
    </div>
  );
};

export default ReviewsList;
