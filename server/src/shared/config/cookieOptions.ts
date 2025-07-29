import environment from "./environment";

interface CookieOptions {
    maxAge?: number;  // Duration for cookie in milliseconds
    httpOnly: boolean;  // Prevent access from client-side JavaScript
    secure: boolean;  // Enable only for HTTPS in production
    sameSite: "strict" | "lax" | "none";  // Same-site policy to prevent CSRF
}

export const COOKIE_OPTIONS: CookieOptions = {
    // maxAge: 3 * 24 * 60 * 60 * 1000,  // 3 days
    httpOnly: true,  // Ensure cookies are only sent via HTTP requests
    secure: environment.NODE_ENV === "production",  // Enable only in production
    sameSite: "strict",  // Prevent cross-site request forgery
};