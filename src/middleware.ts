import { NextRequest, NextResponse } from "next/server";
import { globalConfig } from "@/config";

export async function middleware(request: NextRequest) {
    if (!globalConfig.isSupabaseConfigured) {
        // Redirect to a specific error page or return a custom response
        return NextResponse.rewrite(new URL('/error/configure', request.url));
    }
}

export const config = {
    // matcher solution for public, api, assets and _next exclusion
    matcher: "/((?!api|static|.*\\..*|_next).*)"
};

