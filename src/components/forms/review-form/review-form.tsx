import React, { useActionState, useEffect, useState } from "react";
import styles from "./review-form.module.css";
import { submitReview } from "@/app/actions/reviews";

interface Props {
  onSuccess?: (msg: string) => void;
}

const ReviewForm = ({ onSuccess }: Props) => {
  const [state, formAction, pending] = useActionState(submitReview, {
    errors: {},
    success: false,
    message: "",
  });

  const [selectedRating, setSelectedRating] = useState(0);

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSubmit = (formData: FormData) => {
    formData.set("rating", selectedRating.toString());
    formAction(formData);
  };

  useEffect(() => {
    if (state.success && onSuccess) {
      onSuccess("Thank you! Your review has been submitted.");
    }
  }, [state.success, onSuccess]);
  return (
    <form action={handleSubmit} className={styles.modalForm}>
      <div className={styles.formGroup}>
        <input
          type="text"
          placeholder="Your Name"
          name="name"
          className={state.errors?.name ? styles.error : ""}
        />
        {state.errors?.name?._errors && (
          <span className={styles.errorMessage}>{state.errors?.name?._errors[0]}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <input
          type="text"
          placeholder="Your Car Model (e.g., Toyota Camry 2020)"
          name="car_model"
          className={state.errors.car_model ? styles.error : ""}
        />
        {state.errors.car_model && (
          <span className={styles.errorMessage}>{state.errors.car_model._errors[0]}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <div className={styles.ratingSelector}>
          <span className={styles.ratingLabel}>Your Rating:</span>
          <div className={styles.stars}>
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating}>
                <input type="radio" name="rating" id={`star${rating}`} value={rating} />
                <label
                  htmlFor={`star${rating}`}
                  onClick={() => handleStarClick(rating)}
                  className={selectedRating >= rating ? styles.active : ""}
                >
                  ★
                </label>
              </div>
            ))}
          </div>
        </div>
        {state.errors.rating && (
          <span className={styles.errorMessage}>{state.errors.rating._errors[0]}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <textarea
          placeholder="Share your experience with our service..."
          rows={5}
          name="review_text"
          className={state.errors.review_text ? styles.error : ""}
        />
        {state.errors.review_text && (
          <span className={styles.errorMessage}>{state.errors.review_text._errors[0]}</span>
        )}
      </div>

      <button type="submit" className={styles.submitBtn} disabled={pending}>
        {pending ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
