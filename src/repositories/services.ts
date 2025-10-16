import { createClient } from "@/lib/supabase/server";
import { ServiceCardType } from "@/types";

export class Services {
  private async getClient() {
    return await createClient();
  }

  async getAllServices() {
    const supabase = await this.getClient();

    const { data, error } = await supabase.from("services").select("*");

    if (error) throw error;

    return data;
  }

  async getServiceItemById(id: string) {
    const supabase = await this.getClient();

    const { data, error } = await supabase.from("services").select().eq("id", id).single();

    if (error) throw error;

    return data;
  }

  async updateServiceById(id: string, updates: Partial<ServiceCardType>) {
    if (!id) {
      throw new Error("Service ID is required");
    }
    const supabase = await this.getClient();

    const updateData = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined),
    );

    const { data, error } = await supabase
      .from("services")
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select();

    if (error) throw error;

    return data;
  }

  async createService(service: Omit<ServiceCardType, "id">) {
    const supabase = await this.getClient();

    const { data, error } = await supabase.from("services").insert(service).select().single();

    if (error) throw error;

    return data;
  }

  async removeServiceById(id: string) {
    const supabase = await this.getClient();

    const { data, error } = await supabase.from("services").delete().eq("id", id);

    if (error) throw error;

    return data;
  }
}
