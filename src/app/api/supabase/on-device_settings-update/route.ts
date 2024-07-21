import { sendDataWithStreamController } from "@/utils/apiUtils";
import { EVENT_STREAM_HEADERS } from "@/app/api/constants";
import { RealtimeChannel } from "@supabase/realtime-js";
import { supabase } from "@/services/supabaseService";
import { getSupabaseClient } from "@/libs/supabase/supabase";
import { DeviceSettingsDB } from "@/libs/supabase/types";
import { LedStripSettings } from "@/types/Settings";
import { NextRequest } from "next/server";

// Disables the pre-rendering of the page
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    // TODO Add profile id to request
    const deviceId: string | null = request.nextUrl.searchParams.get("device_id");
    let settingsRealtimeChannel: RealtimeChannel;
    return new Response(
        new ReadableStream({
            async start(controller) {
                settingsRealtimeChannel = supabase.createUpdateListener<DeviceSettingsDB>("device_settings", (updatedRow) => {
                    if (!updatedRow.settings_json) {
                        console.error("No settings_json in updated row", updatedRow);
                        return;
                    }
                    const ledStripSettings: LedStripSettings = {
                        activeColorId: JSON.parse(updatedRow.settings_json)
                    };
                    // TODO Get it to work with the device_id
                    sendDataWithStreamController(controller, ledStripSettings);
                }, deviceId ? `device_id=eq.${deviceId}` : undefined);

                request.signal.addEventListener("abort", () => {
                    getSupabaseClient().removeChannel(settingsRealtimeChannel);
                    controller.close();
                });
            },
            async cancel() {
                if (settingsRealtimeChannel) {
                    await getSupabaseClient().removeChannel(settingsRealtimeChannel);
                }
            }
        }),
        { headers: EVENT_STREAM_HEADERS }
    );
}
