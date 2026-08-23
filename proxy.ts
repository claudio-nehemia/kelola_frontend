import { NextRequest, NextResponse } from "next/server";
export default function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/avatar") ||
    pathname.match(/\.(png|jpg|jpeg|svg|gif|webp)$/)
  ) {
    return NextResponse.next();
  }

  const pathPublic = request.nextUrl.pathname.startsWith("/login");

  if (!token && !pathPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && pathPublic) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|avatar).*)"],
};
