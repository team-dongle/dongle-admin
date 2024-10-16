import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hasToken = request.cookies.has("USER_TOKEN");

  if (hasToken && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(
      new URL("/clubs/list", request.nextUrl.origin),
    );
  }

  if (hasToken && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(
      new URL("/clubs/list", request.nextUrl.origin),
    );
  }

  if (!hasToken && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  }
}

export const config = {
  matcher: ["/", "/login", "/clubs/:path*"],
};
