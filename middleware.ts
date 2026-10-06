import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Allow public access to login page
        if (req.nextUrl.pathname === "/portal/login") {
          return true;
        }
        // Require valid token for all other /portal routes
        return !!token;
      },
    },
    pages: {
      signIn: "/portal/login",
    },
  }
);

export const config = {
  matcher: ["/portal/:path*"],
};
