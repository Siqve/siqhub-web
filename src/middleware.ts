import { globalConfig } from "@/config";
import { supabaseService } from "@siqve/supabase-services";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    if (!globalConfig.isSupabaseConfigured) {
        // Redirect to a specific error page or return a custom response
        return NextResponse.rewrite(new URL("/error/configure", request.url));
    }

    const { user, supabaseResponse } = await supabaseService.admin().middlewareCheck(request);

    if (
        !user &&
        !request.nextUrl.pathname.startsWith("/login") &&
        !request.nextUrl.pathname.startsWith("/auth")
    ) {
        // no user, potentially respond by redirecting the user to the login page
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
    // creating a new response object with NextResponse.next() make sure to:
    // 1. Pass the request in it, like so:
    //    const myNewResponse = NextResponse.next({ request })
    // 2. Copy over the cookies, like so:
    //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    // 3. Change the myNewResponse object to fit your needs, but avoid changing
    //    the cookies!
    // 4. Finally:
    //    return myNewResponse
    // If this is not done, you may be causing the browser and server to go out
    // of sync and terminate the user's session prematurely!

    return supabaseResponse;
}

export const config = {
    // matcher solution for public, api, assets and _next exclusion
    matcher: "/((?!api|static|.*\\..*|_next).*)",
};
