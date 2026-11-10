import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { START_PAGE } from "@/types/start-pages";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // getUser() validates the token with Supabase (unlike getSession())
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const role = user?.app_metadata?.role as keyof typeof START_PAGE | undefined;
  const target = role ? START_PAGE[role] : undefined;

  if (target) {
    const redirect = NextResponse.redirect(new URL(`/${target}`, request.url));
    // keep any refreshed session cookies on the redirect response
    response.cookies.getAll().forEach((c) => redirect.cookies.set(c));
    return redirect;
  }

  return response;
}

export const config = {
  matcher: ["/login"],
};