import { EVENT_STREAM_HEADERS } from "@/app/api/constants";
import { getSupabaseClient } from "@/libs/supabase/supabase";
import { supabase } from "@/services/supabaseService";
import { sendDataWithStreamController } from "@/utils/apiUtils";
import { RealtimeChannel } from "@supabase/realtime-js";
import { NextRequest } from "next/server";

// Disables the pre-rendering of the page
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const tableName: string | null = request.nextUrl.searchParams.get("tableName");
    const columnName: string | null = request.nextUrl.searchParams.get("columnName");
    const rowValue: string | null = request.nextUrl.searchParams.get("rowValue");
    if (!tableName) {
        return;
    }

    let settingsRealtimeChannel: RealtimeChannel;
    return new Response(
        new ReadableStream({
            async start(controller) {
                settingsRealtimeChannel = supabase.listener.onAll(
                    tableName,
                    (updatedRow) => {
                        sendDataWithStreamController(controller, updatedRow);
                    },
                    columnName && rowValue ? `${columnName}=eq.${rowValue}` : undefined,
                );

                request.signal.addEventListener("abort", () => {
                    getSupabaseClient().removeChannel(settingsRealtimeChannel);
                    controller.close();
                });
            },
            async cancel() {
                if (settingsRealtimeChannel) {
                    await getSupabaseClient().removeChannel(settingsRealtimeChannel);
                }
            },
        }),
        { headers: EVENT_STREAM_HEADERS },
    );
}
