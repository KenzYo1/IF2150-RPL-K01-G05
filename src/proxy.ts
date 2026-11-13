import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { START_PAGE } from "@/types/start-pages";
import { ROUTE_ROLES } from "@/types/route-roles";

export async function proxy(request: NextRequest) {
    console.log("A");
    console.log("proxy hit: " + request.nextUrl.pathname);
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
  const { pathname } = request.nextUrl;

  const redirectTo = (path: string) => {
    const res = NextResponse.redirect(new URL(path, request.url));
    response.cookies.getAll().forEach((c) => res.cookies.set(c));
    return res;
  }
  if (pathname === "/login") {
    const target = role ? START_PAGE[role] : undefined;
    return target ? redirectTo(`/${target}`) : response;
  }

  if (pathname === "/") {
    const target = role ? START_PAGE[role] : undefined;
    return redirectTo(target ? `/${target}` : "/login");
  }

  const prefix = Object.keys(ROUTE_ROLES).find(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  if (prefix) {
    if (!user || !role) {
        return redirectTo("/login");
    }
    if (!ROUTE_ROLES[prefix].includes(role)) {
        return redirectTo(`/${START_PAGE[role]}`);
    }
  }
  
  return response;
}

export const config = {
    // change kalau perlu page spesifik tertentu
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};