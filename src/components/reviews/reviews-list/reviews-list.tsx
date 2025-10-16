import React from "react";
import styles from "./reviews-list.module.css";
import { getStatusVariant } from "@/utils/helpers/getStatusVariant";
import { renderStars } from "@/utils/helpers/renderStars";
import { Status, Testimonial } from "@/types";
import TableCard from "@/components/ui/table-card/table-card";
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
