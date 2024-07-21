import { supabase } from "@/services/supabaseService";
import { Device2 } from "@/types/Device";

const DEVICE_QUERY = "id, ip, name, type, color_theme(name, gradient_class, text_class)";

export const getDeviceList = async (): Promise<Device2[]> => {
    return supabase.getAllTableRows<Device2>("device", DEVICE_QUERY);
};

export const getDevice = async (deviceId: string): Promise<Device2 | undefined> => {
    return supabase.getSingleTableRow<Device2>("device", DEVICE_QUERY, [{ column: "id", value: deviceId }]);
};
