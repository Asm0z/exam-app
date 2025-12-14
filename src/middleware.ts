import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";


export async function middleware(request: NextRequest) {
    const tokenCookies = await getToken({req: request})
    const { pathname } = request.nextUrl;
    const publicRoutes = ['/login', '/register', '/forgetPassword', '/resetCode', '/resetPassword'];
    if (publicRoutes.includes(pathname)){
      if (!tokenCookies){
      return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/", request.nextUrl.origin));
      }
    }
    if (!tokenCookies){
      return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
    } else{
      return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
