import { createRemoteJWKSet, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export const SIQHUE_WEB_APP_AUTH_COOKIE = "siqhue_web_app_token";

const JWKS = createRemoteJWKSet(
    new URL(
        "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com",
    ),
);
const AUTHENTICATE_ENDPOINT = "/authenticate";

export async function middleware(request: NextRequest) {
    const activeToken = request.cookies.get(SIQHUE_WEB_APP_AUTH_COOKIE)?.value;

    if (!activeToken) {
        if (!isAuthenticating(request)) {
            return Response.redirect(new URL(AUTHENTICATE_ENDPOINT, request.url));
        }
        return;
    }

    try {
        await verifyFirebaseToken(activeToken);
    } catch (error) {
        console.log(error); //TODO: Toast
        const response = NextResponse.redirect(new URL(AUTHENTICATE_ENDPOINT, request.url));
        response.cookies.delete(SIQHUE_WEB_APP_AUTH_COOKIE);
        return response;
    }

    if (isAuthenticating(request)) {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    // matcher solution for public, api, assets and _next exclusion
    matcher: "/((?!api|static|.*\\..*|_next).*)",
};

async function verifyFirebaseToken(token: string): Promise<void> {
    return await jwtVerify(token, JWKS, {
        audience: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        issuer: `https://securetoken.google.com/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
    })
        .then(() => {})
        .catch((error) => {
            throw new Error(`Token verification rejected, message: ${error}`);
        });
}

function isAuthenticating(request: NextRequest) {
    return request.nextUrl.pathname.startsWith(AUTHENTICATE_ENDPOINT);
}
