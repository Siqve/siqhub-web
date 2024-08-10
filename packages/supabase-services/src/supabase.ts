import { SupabaseClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import { createClientFromCookies, createClientFromRequest } from "./utils/createClient";

export const SUPABASE_ENVS = {
    URL: process.env.SUPABASE_URL,
    API_KEY: process.env.SUPABASE_API_KEY,
    EMAIL: process.env.SUPABASE_USER_EMAIL,
    PASSWORD: process.env.SUPABASE_USER_PASSWORD,
};

export const isConfigured = !!(
    SUPABASE_ENVS.URL &&
    SUPABASE_ENVS.API_KEY &&
    SUPABASE_ENVS.EMAIL &&
    SUPABASE_ENVS.PASSWORD
);

export const getSupabaseClient = (): SupabaseClient<any, "public", any> => {
    if (!isConfigured) {
        throw new Error("Supabase is not configured");
    }
    return createClientFromCookies(SUPABASE_ENVS.URL!, SUPABASE_ENVS.API_KEY!);
};

export const middlewareCheck = async (request: NextRequest) => {
    if (!isConfigured) {
        throw new Error("Supabase is not configured");
    }

    const { supabase, supabaseResponse } = createClientFromRequest(
        SUPABASE_ENVS.URL!,
        SUPABASE_ENVS.API_KEY!,
        request,
    );
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return { user, supabaseResponse };
};


