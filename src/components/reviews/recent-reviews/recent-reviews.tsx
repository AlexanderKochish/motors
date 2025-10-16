"use client";
import React from "react";
import { useReviews } from "@/hooks/useReviews";
import RecentListCard from "@/components/admin/recentlist-card/recentlist-card";
import ReviewCard from "../review-card/review-card";
import { useRouter } from "next/navigation";

const RecentReviews = () => {
  const router = useRouter();
  const { data, mutate } = useReviews();

  return (
    <RecentListCard
      title="Customer Reviews"
      description="Manage and moderate customer feedback"
      data={data}
      onViewAll={() => router.push("/admin/reviews")}
      renderItem={(review) => <ReviewCard review={review} mutate={mutate} />}
    />
  );
};

export default RecentReviews;
