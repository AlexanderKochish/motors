import { createClient } from "@/lib/supabase/server";
import { ReviewFormInputs } from "@/schemas/form";
import { Status } from "@/types";

export class ReviewService {
  private async getClient() {
    return await createClient();
  }

  async submitReview(data: ReviewFormInputs) {
    const supabase = await this.getClient();

    const { data: review, error } = await supabase
      .from("reviews")
      .insert([
        {
          name: data.name,
          car_model: data.car_model,
          rating: data.rating,
          review_text: data.review_text,
          status: "pending",
        },
      ])
      .select();

    if (error) {
      console.error("Review submission error:", error);
      throw new Error("Failed to submit review");
    }

    return { data: review, error: null };
  }

  async getAllConfirmedReviews() {
    const supabase = await this.getClient();

    const { data, error } = await supabase.from("reviews").select("*").eq("status", "approved");

    if (error) throw new Error("Failed to get all reviews");

    return data;
  }

  async getRecentReviews() {
    const supabase = await this.getClient();

    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) throw new Error("Failed to get all reviews");

    return data;
  }

  async getReviewsPage(page = 1, limit = 3) {
    const supabase = await this.getClient();

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from("reviews")
      .select("*", { count: "exact" })
      .range(from, to)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error("Failed to fetch paginated reviews");
    }

    return {
      data,
      total: count ?? 0,
      page,
      totalPages: Math.ceil((count ?? 0) / limit),
    };
  }

  async findByIdAndUpdateStatus(id: string, status: Omit<Status, "pending">) {
    const supabase = await this.getClient();

    const { data, error } = await supabase
      .from("reviews")
      .update({
        status,
      })
      .eq("id", id)
      .single();

    if (error) throw new Error(`Failed to get review with id:${id}`);

    return data;
  }

  async getPendingReviews() {
    const supabase = await this.getClient();

    const { data, error } = await supabase.from("reviews").select("*").eq("status", "pending");

    if (error) throw new Error("Failed to get all pending reviews");

    return data.length ?? 0;
  }

  async removeReview(id: string) {
    const supabase = await this.getClient();

    const { error } = await supabase.from("reviews").delete().eq("id", id).single();

    if (error) throw new Error(`Failed to remove review with id:${id}`);

    return "The review was successfully deleted.";
  }
}
