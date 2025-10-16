"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { loginSchema } from "@/lib/validations/login.schema";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

type LoginFormState = {
  errors: {
    email?: { _errors: string[] };
    password?: { _errors: string[] };
    _errors?: string[];
  };
};

export async function login(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const supabase = await createClient();
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    const treeified = z.treeifyError(validatedFields.error);
    const formatted = {
      email: { _errors: treeified.properties?.email?.errors ?? [] },
      password: { _errors: treeified.properties?.password?.errors ?? [] },
      _errors: treeified.errors ?? [],
    };
    return { errors: formatted };
  }

  const { email, password } = validatedFields.data;

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { errors: { _errors: [error.message] } };
  }

  const { data: userProfile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", authData.user.id)
    .single();

  if (profileError || !userProfile) {
    return { errors: { _errors: ["User profile not found"] } };
  }

  if (userProfile.role !== "admin") {
    await supabase.auth.signOut();
    return {
      errors: { _errors: ["Access denied. Admin privileges required."] },
    };
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) throw error;

  const cookieStore = await cookies();
  cookieStore.getAll().forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });

  redirect("/");
}
