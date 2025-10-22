import { createClient } from "@/lib/supabase/server";

export class Statistics {
  private async getClient() {
    return await createClient();
  }

  async getTableCount(table: "appointments" | "reviews") {
    const supabase = await this.getClient();

    const { count, error } = await supabase.from(table).select("*", { count: "exact", head: true });

    if (error) throw error;

    return count ?? 0;
  }

  async getPendigTableCount(table: "appointments" | "reviews") {
    const supabase = await this.getClient();

    const { count, error } = await supabase
      .from(table)
      .select("*", { count: "exact", head: true })
      .eq("status", "pending");

    if (error) throw error;

    return count ?? 0;
  }

  async getAverageRating() {
    const supabase = await this.getClient();

    const { data, error } = await supabase.from("reviews").select("rating");

    if (error) throw error;

    if (!data || data.length === 0) return "0/5";

    const avg = data.reduce((sum, review) => sum + (review.rating || 0), 0) / data.length;

    return `${avg.toFixed(1)}/5`;
  }
}
