import React from "react";
import Dashboard from "./dashboard/page";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return <Dashboard />;
};

export default AdminPage;
