import { findByIdAndUpdateStatus, getApprovedReviews, getReviewsPage } from "@/app/actions/reviews";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Status } from "@/types";
import { usePaginatedQuery } from "@/shared/hooks/usePaginatedQuery";

export const useReviews = () => {
  const { ...rest } = usePaginatedQuery("reviews", getReviewsPage, 3);
  const queryClient = useQueryClient();

  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  const {
    data: approvedReviews,
    isLoading: isLoadingApprovedReview,
    isError: isErrorApprovedReview,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: getApprovedReviews,
  });

  const { mutate } = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Status }) => {
      return await findByIdAndUpdateStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
  return {
    mutate,
    renderStars,
    ...rest,
    approvedReviews,
    isErrorApprovedReview,
    isLoadingApprovedReview,
  };
};
