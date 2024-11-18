import { createServerClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const createClientFromCookies = (
    url: string,
    apiKey: string,
): SupabaseClient<any, "public", any> => {
    const cookieStore = cookies();

    return createServerClient(url, apiKey, {
        cookies: {
            async getAll() {
                return (await cookieStore).getAll();
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(async ({ name, value, options }) =>
                        (await cookieStore).set(name, value, options),
                    );
                } catch {
                    // The `setAll` method was called from a Server Component.
                    // This can be ignored if you have middleware refreshing
                    // user sessions.
                }
            },
        },
    });
};

export const createClientFromRequest = (
    url: string,
    apiKey: string,
    request: NextRequest,
): {
    supabase: SupabaseClient<any, "public", any>;
    supabaseResponse: NextResponse;
} => {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(url, apiKey, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                supabaseResponse = NextResponse.next({
                    request,
                });
                cookiesToSet.forEach(({ name, value, options }) =>
                    supabaseResponse.cookies.set(name, value, options),
                );
            },
        },
    });
    return { supabase, supabaseResponse };
};
