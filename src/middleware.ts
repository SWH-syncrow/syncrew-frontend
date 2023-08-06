import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/")[2];
  const idRgx = /[^0-9]/;
  if (id && (idRgx.test(id) || parseInt(id) > 12 || parseInt(id) < 1)) {
    return NextResponse.redirect(new URL("/404", req.url));
  }
}

export const config = {
  matcher: "/group/:path*",
};
