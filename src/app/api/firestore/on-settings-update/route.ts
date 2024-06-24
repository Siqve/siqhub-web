import { sendDataWithStreamController } from "@/app/api/apiUtils";
import { EVENT_STREAM_HEADERS } from "@/app/api/constants";
import { createSettingsListener } from "@/libs/firebase/queries/createSettingsListener";
import { Unsubscribe } from "@firebase/firestore";

// Disables the pre-rendering of the page
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    let unsubscribe: Unsubscribe;
    return new Response(
        new ReadableStream({
            async start(controller) {
                unsubscribe = createSettingsListener((settings) =>
                    sendDataWithStreamController(controller, settings),
                );
                request.signal.addEventListener("abort", () => {
                    unsubscribe();
                    controller.close();
                });
            },
            async cancel() {
                if (unsubscribe) {
                    unsubscribe();
                }
            },
        }),
        { headers: EVENT_STREAM_HEADERS },
    );
}
