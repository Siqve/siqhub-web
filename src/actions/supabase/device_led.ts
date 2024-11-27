"use server";

import { settingsService } from "@/services/settingsService";
import { Device } from "@/types/Device";

export const _resetActiveColorProfile = async (device: Device): Promise<Device> => {
    return settingsService.ledStrip.resetActiveColorProfile(device);
};
