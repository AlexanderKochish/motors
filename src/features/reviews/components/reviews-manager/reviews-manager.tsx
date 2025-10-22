"use client";
import { useReviews } from "../../hooks/useReviews";
import ReviewsList from "../reviews-list/reviews-list";
import DataManager from "@/shared/components/data-manager/data-manager";

export default function ReviewsManager() {
  const { data, mutate, ...state } = useReviews();

  return (
    <DataManager
      title="Customer Reviews"
      description="Manage and moderate customer feedback"
      state={state}
    >
      <ReviewsList reviews={data ?? []} mutate={mutate} />
    </DataManager>
  );
}
