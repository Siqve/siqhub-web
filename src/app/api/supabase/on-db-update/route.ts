import { EVENT_STREAM_HEADERS } from "@/app/api/constants";
import { sendDataWithStreamController } from "@/utils/apiUtils";
import { getDB } from "@siqve/supabase-services";
import { RealtimeChannel } from "@supabase/realtime-js";
import { NextRequest } from "next/server";

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
    return new Response(
        new ReadableStream({
            async start(controller) {
                settingsRealtimeChannel = getDB()
                    .custom(tableName, columnName ?? undefined)
                    .listen()
                    .onUpdate((updatedRow) => {
                        sendDataWithStreamController(controller, updatedRow);
                    }, rowValue);

                request.signal.addEventListener("abort", () => {
                    getDB().admin().removeListener(settingsRealtimeChannel);
                    controller.close();
                });
            },
            async cancel() {
                if (settingsRealtimeChannel) {
                    getDB().admin().removeListener(settingsRealtimeChannel);
                }
            },
        }),
        { headers: EVENT_STREAM_HEADERS },
    );
}
