import { EVENT_STREAM_HEADERS } from "@/app/api/constants";
import { sendDataWithStreamController } from "@/utils/apiUtils";
import { RealtimeChannel } from "@supabase/realtime-js";
import { NextRequest } from "next/server";
import { db } from "@/services/dbService";
import { getSupabaseClient } from "@siqve/supabase-services/dist/supabase";

// Disables the pre-rendering of the page
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const tableName: string | null = request.nextUrl.searchParams.get("tableName");
    const columnName: string | null = request.nextUrl.searchParams.get("columnName");
    const rowValue: string | null = request.nextUrl.searchParams.get("rowValue");
    if (!tableName || !rowValue) {
        return;
    }

    let settingsRealtimeChannel: RealtimeChannel;

    // Need to store supabaseClient on the request object, since we need to access cookies
    let supabaseClient = getSupabaseClient();
    return new Response(
        new ReadableStream({
            async start(controller) {
                settingsRealtimeChannel = db
                    .table()
                    .custom(tableName, columnName ?? undefined)
                    .listen()
                    .onUpdate((updatedRow) => {
                        sendDataWithStreamController(controller, updatedRow);
                    }, rowValue);

                request.signal.addEventListener("abort", () => {
                    supabaseClient.removeChannel(settingsRealtimeChannel);
                    controller.close();
                });
            },
            async cancel() {
                if (settingsRealtimeChannel) {
                    void supabaseClient.removeChannel(settingsRealtimeChannel);
                }
            },
        }),
        { headers: EVENT_STREAM_HEADERS },
    );
}
