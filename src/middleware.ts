import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware({
  locales: ["en", "bn"],
  defaultLocale: "en",
});

// Combined middleware function
export default function middleware(request: NextRequest) {
  // Check if the request is for the Google Auth API
  if (request.nextUrl.pathname.includes("/api/v1/doer/admission/google/auth")) {
    // Add the required header for Google Auth
    const response = NextResponse.next();
    response.headers.set("X-Forwarded-Host", "doer-admission.com");
    return response;
  }

  // For all other routes, use the internationalization middleware
  return intlMiddleware(request);
}

// Configure the paths that should trigger the middleware
export const config = {
  // Matcher for both internationalized pathnames and Google Auth API
  matcher: [
    // i18n routes
    "/",
    "/(bn|en)/:path*",

    // Google Auth routes
    "/api/v1/doer/admission/google/auth",
    "/api/v1/doer/admission/google/auth/:path*",
  ],
};
