import { findByIdAndUpdateStatus, getReviewsPage } from "@/app/actions/reviews";
import { usePaginatedQuery } from "./usePaginatedQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Status } from "@/types";

export const useReviews = () => {
  const { ...rest } = usePaginatedQuery("reviews", getReviewsPage, 3);
  const queryClient = useQueryClient();

  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

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
  };
};
