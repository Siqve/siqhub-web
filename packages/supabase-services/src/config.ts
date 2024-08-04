import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

export const isConfigured = !!(supabaseUrl && supabaseKey);

let supabase: SupabaseClient<any, "public", any>;

export const getSupabaseClient = (): SupabaseClient<any, "public", any> => {
    if (!isConfigured) {
        throw new Error("Supabase is not configured");
    }
    if (!supabase) {
        supabase = createClient(supabaseUrl!, supabaseKey!);
    }

    return supabase;
};