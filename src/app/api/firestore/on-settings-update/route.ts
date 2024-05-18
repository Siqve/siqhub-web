import { createSettingsListener } from "@/libs/firebase/queries/createSettingsListener";
import { Unsubscribe } from "@firebase/firestore";

const headers = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
};

export async function GET(request: Request) {
    let unsubscribe: Unsubscribe;
    return new Response(
        new ReadableStream({
            async start(controller) {
                unsubscribe = createSettingsListener((settings) => {
                    controller.enqueue(`data: ${JSON.stringify(settings)}\n\n`);
                });
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
        { headers },
    );
}
