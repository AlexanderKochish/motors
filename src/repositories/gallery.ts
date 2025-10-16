import { createClient } from "@/lib/supabase/server";
import { GalleryItem } from "@/types";

export class Gallery {
  private async getClient() {
    return await createClient();
  }

  async getCategories() {
    const supabase = await this.getClient();
    const { data, error } = await supabase.from("categories").select("*");

    if (error) throw error;
    return data;
  }

  async getGalleryList() {
    const supabase = await this.getClient();

    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  }

  async createItem(data: Omit<GalleryItem, "id">) {
    const supabase = await this.getClient();

    if (!data.title || !data.category_id || !data.image) {
      throw new Error("Missing required fields: title, category_id, or image");
    }

    const insertData = {
      title: data.title,
      description: data.description || "",
      alt: data.alt || "",
      category_id: data.category_id,
      image: data.image,
    };

    const { data: createdItem, error } = await supabase
      .from("gallery")
      .insert([insertData])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return createdItem;
  }

  async getGalleryItemById(id: string) {
    const supabase = await this.getClient();

    const { data, error } = await supabase.from("gallery").select("*").eq("id", id).single();

    if (error) {
      throw error;
    }

    return data;
  }

  async updateById(id: string, data: GalleryItem) {
    if (!id) throw new Error("Gallery item ID is required");

    const supabase = await this.getClient();

    const { data: updatedItem, error } = await supabase
      .from("gallery")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return updatedItem;
  }

  async removeById(id: string) {
    const supabase = await this.getClient();

    const { data, error } = await supabase.from("gallery").delete().eq("id", id).select().single();
    if (error) throw error;
    return data;
  }
}
