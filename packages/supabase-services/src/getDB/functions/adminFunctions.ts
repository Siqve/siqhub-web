import { RealtimeChannel } from "@supabase/realtime-js";
import { getSupabaseClient } from "../../config";

export const adminFunctions = () => {
    return {
        removeListener: (channel: RealtimeChannel) => {
            void getSupabaseClient().removeChannel(channel);
        },
    };
};
