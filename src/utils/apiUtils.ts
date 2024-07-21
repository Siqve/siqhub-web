import { API_ROUTE } from "@/app/api/constants";

export const getDeviceUpdateEndpoint = (deviceId: number) => `${API_ROUTE.SUPABASE.ON_DEVICE_SETTINGS_UPDATE}?device_id=${deviceId}`;

export const sendDataWithStreamController = async (
    controller: ReadableStreamDefaultController,
    data: any
) => {
    controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
};
