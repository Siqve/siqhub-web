import { EVENT_STREAM_HEADERS } from "@/app/api/constants";
import { sendDataWithStreamController } from "@/utils/apiUtils";
import { RealtimeChannel } from "@supabase/realtime-js";
import { NextRequest } from "next/server";
import { db } from "@/services/dbService";

// Disables the pre-rendering of the page
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const tableName: string | null = request.nextUrl.searchParams.get("tableName");
    const columnName: string | null = request.nextUrl.searchParams.get("columnName");
    const rowValue: string | null = request.nextUrl.searchParams.get("rowValue");
    if (!tableName) {
        return;
    }
    // TODO Continune with getDB and get this to work
    let settingsRealtimeChannel: RealtimeChannel;
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
                    db.removeListener(settingsRealtimeChannel);
                    controller.close();
                });
            },
            async cancel() {
                if (settingsRealtimeChannel) {
                    db.removeListener(settingsRealtimeChannel);
                }
            },
        }),
        { headers: EVENT_STREAM_HEADERS },
    );
}
