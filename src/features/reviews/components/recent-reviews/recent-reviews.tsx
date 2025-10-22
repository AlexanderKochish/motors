"use client";
import React from "react";
import RecentListCard from "@/shared/components/recentlist-card/recentlist-card";
import ReviewCard from "../review-card/review-card";
import { useRouter } from "next/navigation";
import { useReviews } from "../../hooks/useReviews";
import Loading from "@/shared/components/loading/loading";
import ErrorBlock from "@/shared/components/error-block/error-block";

const RecentReviews = () => {
  const router = useRouter();
  const { data, mutate, isLoading, isError } = useReviews();
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <ErrorBlock title="Error Recent Reviews" message="Something went wrong.Try again later." />
    );
  }
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
