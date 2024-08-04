import { getSupabaseClient } from "../config";
import { REALTIME_POSTGRES_CHANGES_LISTEN_EVENT } from "@supabase/realtime-js";
import { REALTIME_LISTEN_TYPES } from "@supabase/supabase-js";

export const createRealtimeChannel = <T>(
    tableName: string,
    callback: (updatedRow: T) => void,
    event: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT,
    filter?: string,
) => {
    return getSupabaseClient()
        .channel(`realtime_${tableName}_${Date.now()}`)
        .on(
            REALTIME_LISTEN_TYPES.POSTGRES_CHANGES,
            {
                table: tableName,
                filter,
                event,
                schema: "public",
            } as any,
            (payload) => {
                if (event === REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.UPDATE) {
                    callback(payload.new as T);
                } else {
                    callback(payload as T);
                }
            },
        );
};
