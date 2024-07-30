"use server";

import { settingsService } from "@/services/settingsService";
import { Device } from "@/types/Device";
import { LedStripSettings } from "@/types/Settings";

export const _updateDeviceSettings = async (
    deviceId: string,
    settings: LedStripSettings,
): Promise<Device> => {
    return settingsService.update(deviceId, JSON.stringify(settings));
};
