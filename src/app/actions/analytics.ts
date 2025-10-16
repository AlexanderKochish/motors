"use server";

import { createClient } from "@/lib/supabase/server";

export async function getMonthlyAppointments() {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_monthly_appointments");

  if (error) throw error;

  return data;
}
