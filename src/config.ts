import { isSupabaseConfigured } from "@siqve/supabase-services";

export const globalConfig = {
    isSupabaseConfigured: isSupabaseConfigured(),
};
