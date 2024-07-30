"use server";

import { settingsService } from "@/services/settingsService";
import { Device } from "@/types/Device";

export const _resetActiveColor = async (device: Device): Promise<Device> => {
    return settingsService.ledStrip.resetActiveColor(device);
};
