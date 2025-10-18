import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const url = request.nextUrl.clone();

  const isMagicLink = url.searchParams.has("access_token");

  if (!session && !isMagicLink && url.pathname.startsWith("/admin")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (session && url.pathname.startsWith("/login")) {
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
