import { AppointmentFormInputs, ReviewFormInputs } from "@/schemas/form";
import { createClient } from "../supabase/client";

export async function submitAppointment(data: AppointmentFormInputs) {
  const supabase = createClient();
  const { error } = await supabase.from("appointments").insert([
    {
      first_name: data.firstname,
      phone: data.phone,
      service_type: data.service_type,
      message: data.message,
      source: data.source,
      status: "pending",
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}

export async function submitReview(data: ReviewFormInputs) {
  const supabase = createClient();
  const { error } = await supabase.from("reviews").insert([
    {
      name: data.name,
      car_model: data.car,
      rating: data.rating,
      review_text: data.review,
      status: "pending",
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}

export async function getTestimonials() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
