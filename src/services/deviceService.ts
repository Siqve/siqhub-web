import { Device } from "@/types/Device";
import { getDeviceFromFirestore, getDevicesFromFirestore } from "@actions/firestore/devices";

export const getDeviceList = async (): Promise<Device[]> => {
    return getDevicesFromFirestore();
};

export const getDevice = async (deviceId: string): Promise<Device | undefined> => {
    return getDeviceFromFirestore(deviceId);
};
