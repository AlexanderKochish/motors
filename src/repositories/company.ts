import { createClient } from "@/lib/supabase/server";
import { CompanyContact } from "@/types";

export class Company {
  private async getClient() {
    return await createClient();
  }

  async getCompanyContact(): Promise<CompanyContact | null> {
    const supabase = await this.getClient();

    const { data, error } = await supabase.from("company-contact").select("*").single();

    if (error) {
      console.error("Error fetching company contact:", error);
      return null;
    }

    return data;
  }

  async updateCompanyContact(contactData: Partial<CompanyContact>): Promise<CompanyContact | null> {
    const supabase = await this.getClient();

    const { data, error } = await supabase
      .from("company-contact")
      .update(contactData)
      .eq("id", contactData.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating company contact:", error);
      throw new Error("Failed to update company contact");
    }

    return data;
  }

  async createCompanyContact(
    contactData: Omit<CompanyContact, "id" | "created_at" | "updated_at">,
  ): Promise<CompanyContact> {
    const supabase = await this.getClient();

    const { data, error } = await supabase
      .from("company-contact")
      .insert([contactData])
      .select()
      .single();

    if (error) {
      console.error("Error creating company contact:", error);
      throw new Error("Failed to create company contact");
    }

    return data;
  }
}
