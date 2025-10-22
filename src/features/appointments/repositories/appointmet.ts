import { createClient } from "@/lib/supabase/server";
import { Appointments, AppointmentStatus } from "@/types";
import { AppointmentFormInputs } from "../lib/zod/appointment-form-schema";

export class AppointmentService {
  private async getClient() {
    return await createClient();
  }

  async getAppointmentCounts() {
    const supabase = await this.getClient();

    const [all, pending, confirmed, completed] = await Promise.all([
      supabase.from("appointments").select("*", { count: "exact", head: true }),
      supabase
        .from("appointments")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending"),
      supabase
        .from("appointments")
        .select("*", { count: "exact", head: true })
        .eq("status", "confirmed"),
      supabase
        .from("appointments")
        .select("*", { count: "exact", head: true })
        .eq("status", "completed"),
    ]);

    return {
      all: all.count ?? 0,
      pending: pending.count ?? 0,
      confirmed: confirmed.count ?? 0,
      completed: completed.count ?? 0,
    };
  }

  async submitAppointment(data: AppointmentFormInputs) {
    const supabase = await this.getClient();

    const { data: result, error } = await supabase
      .from("appointments")
      .insert([
        {
          first_name: data.first_name,
          phone: data.phone,
          service_type: data.service_type,
          message: data.message,
          source: data.source,
          status: "pending",
        },
      ])
      .select();

    if (error) {
      console.error("Appointment submission error:", error);
      throw new Error("Failed to submit appointment");
    }

    return { data: result, error: null };
  }

  async getAllRecentAppointments() {
    const supabase = await this.getClient();

    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      throw new Error("Failed to get all appointment applications");
    }

    return data;
  }

  async findByIdAndUpdateStatus(id: string, status: AppointmentStatus): Promise<Appointments> {
    const supabase = await this.getClient();

    const { data, error } = await supabase
      .from("appointments")
      .update({
        status,
      })
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(`Failed to get appointment application with id: ${id}`);
    }

    return data;
  }

  async removeAppointment(id: string): Promise<Appointments> {
    const supabase = await this.getClient();

    const { data, error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`Failed to remove appointment with id: ${id}`);

    return data;
  }

  async getApplicationsPage(
    page = 1,
    limit: number = 6,
    status: string = "all",
    searchTerm: string = "", // Добавляем параметр поиска
  ) {
    const supabase = await this.getClient();

    let query = supabase
      .from("appointments")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    // Фильтр по статусу
    if (status !== "all") {
      query = query.eq("status", status);
    }

    // Фильтр по поиску
    if (searchTerm) {
      query = query.or(
        `first_name.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%,service_type.ilike.%${searchTerm}%`,
      );
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await query.range(from, to);

    if (error) {
      throw new Error("Failed to fetch paginated appointments");
    }

    return {
      data: data || [],
      total: count ?? 0,
      status,
      searchTerm,
      page,
      totalPages: Math.ceil((count ?? 0) / limit),
    };
  }
}
