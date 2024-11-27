import { EVENT_STREAM_HEADERS } from "@/app/api/constants";
import { db } from "@/services/dbService";
import { sendDataWithStreamController } from "@/utils/apiUtils";
import { getSupabaseClient } from "@siqve/supabase-services/dist/supabase";
import { RealtimeChannel } from "@supabase/realtime-js";
import { NextRequest } from "next/server";

// Disables the pre-rendering of the page
export const dynamic = "force-dynamic";
export const maxDuration = 60; // This function can run for a maximum of 5 seconds

export async function GET(request: NextRequest) {
    const tableName: string | null = request.nextUrl.searchParams.get("tableName");
    const columnName: string | null = request.nextUrl.searchParams.get("columnName");
    const rowValue: string | null = request.nextUrl.searchParams.get("rowValue");
    if (!tableName) {
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
                    .onAll((updatedRow) => {
                        sendDataWithStreamController(controller, updatedRow);
                    }, rowValue ?? undefined);

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
