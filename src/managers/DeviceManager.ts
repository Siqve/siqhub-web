import { Device } from "@/types/Device";
import { getDevicesFromFirebase } from "@/app/actions/firebase/get_devices";
import { getDeviceFromFirebase } from "@/app/actions/firebase/get_device";

export const getDeviceList = async (): Promise<Device[]> => {
    return getDevicesFromFirebase();
};

export const getDevice = async (
    deviceId: string,
): Promise<Device | undefined> => {
    return getDeviceFromFirebase(deviceId);
};
