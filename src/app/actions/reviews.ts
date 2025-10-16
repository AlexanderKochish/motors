"use server";

import { reviewFormSchema } from "@/schemas/form";
import { ReviewService } from "@/repositories/review";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Status } from "@/types";

type ReviewFormState = {
  errors: {
    name?: { _errors: string[] };
    car_model?: { _errors: string[] };
    rating?: { _errors: string[] };
    review_text?: { _errors: string[] };
    _errors?: string[];
  };
  success: boolean;
  message: string;
};

const service = new ReviewService();

export async function submitReview(
  _prevState: ReviewFormState,
  formData: FormData,
): Promise<ReviewFormState> {
  const rating = formData.get("rating");

  const validatedFields = reviewFormSchema.safeParse({
    name: formData.get("name"),
    car_model: formData.get("car_model"),
    rating: rating ? parseInt(rating as string) : 0,
    review_text: formData.get("review_text"),
  });

  if (!validatedFields.success) {
    const treeified = z.treeifyError(validatedFields.error);

    return {
      errors: {
        name: { _errors: treeified.properties?.name?.errors ?? [] },
        car_model: { _errors: treeified.properties?.car_model?.errors ?? [] },
        rating: { _errors: treeified.properties?.rating?.errors ?? [] },
        review_text: { _errors: treeified.properties?.review_text?.errors ?? [] },
        _errors: treeified.errors ?? [],
      },
      success: false,
      message: "",
    };
  }

  try {
    const data = validatedFields.data;
    const result = await service.submitReview(data);

    if (result.error) {
      return {
        errors: { _errors: [result.error] },
        success: false,
        message: "",
      };
    }

    revalidatePath("/");
    return {
      errors: {},
      success: true,
      message: "Your review has been successfully submitted!",
    };
  } catch (error) {
    console.error("Review submission failed:", error);
    return {
      errors: {
        _errors: [error instanceof Error ? error.message : "Failed to submit review"],
      },
      success: false,
      message: "",
    };
  }
}

export async function findByIdAndUpdateStatus(id: string, status: Omit<Status, "pending">) {
  try {
    return await service.findByIdAndUpdateStatus(id, status);
  } catch (error) {
    throw new Error("Failed to get review");
  }
}

export async function getRecentReviews() {
  try {
    return await service.getRecentReviews();
  } catch (error) {
    throw new Error("Failed to get review");
  }
}

export async function getPendingReviews() {
  try {
    return await service.getPendingReviews();
  } catch (error) {
    throw new Error("Failed to get pending review");
  }
}

export async function getReviewsPage(page: number = 1, limit: number = 3) {
  try {
    const response = await service.getReviewsPage(page, limit);
    return {
      ...response,
      status: "approved",
    };
  } catch (error) {
    throw new Error("Failed to get pagination reviews");
  }
}

export async function removeReview(id: string) {
  return await service.removeReview(id);
}
