"use server";

import { redirect } from "next/navigation";
import { loginSchema } from "@/lib/validations/login.schema";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

type LoginFormState = {
  errors: {
    email?: { _errors: string[] };
    _errors?: string[];
  };
  success: boolean;
};

export async function login(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const supabase = await createClient();

  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    const treeified = z.treeifyError(validatedFields.error);
    const formatted = {
      email: { _errors: treeified.properties?.email?.errors ?? [] },
      _errors: treeified.errors ?? [],
    };
    return { errors: formatted, success: false };
  }

  const { email } = validatedFields.data;

  const { data: existingUser, error: verifyError } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .eq("role", "admin")
    .single();

  if (!existingUser || verifyError) {
    return {
      errors: {
        _errors: ["If this email exists and has admin privileges, you will receive a login link"],
      },
      success: false,
    };
  }

  if (!email) {
    return { errors: { email: { _errors: ["Email is required"] } }, success: false };
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/admin`,
    },
  });

  if (error) {
    return { errors: { _errors: [error.message] }, success: false };
  }

  return {
    errors: {
      _errors: [],
    },
    success: true,
  };
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
