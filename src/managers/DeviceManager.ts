import { Device } from "@/types/Device";
import { getDevicesFromFirebase } from "@actions/firebase/devices";
import { getDeviceFromFirebase } from "@actions/firebase/devices";

export const getDeviceList = async (): Promise<Device[]> => {
    return getDevicesFromFirebase();
};

export const getDevice = async (deviceId: string): Promise<Device | undefined> => {
    return getDeviceFromFirebase(deviceId);
};
