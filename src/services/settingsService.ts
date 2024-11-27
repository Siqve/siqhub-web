import { db } from "@/services/dbService";
import { Device } from "@/types/Device";
import { LedStripSettings } from "@/types/Settings";
import { DeviceUpdateDB } from "@siqve/supabase-services";

export const settingsService = {
    update: async (deviceId: string, settings: string): Promise<Device> => {
        const update: DeviceUpdateDB = {
            settings_json: settings,
        };

        return db.table().device().update(deviceId, update);
    },
    ledStrip: {
        resetActiveColorProfile: async (device: Device): Promise<Device> => {
            const colorProfiles = await db.table().colorProfile().selectAll();
            if (colorProfiles.length === 0) {
                throw new Error(
                    `Unable to reset active color profile for device: ${device.id}. Reason: No color profiles found.`,
                );
            }

            const ledStripSettings: LedStripSettings = JSON.parse(device.settings_json);
            ledStripSettings.colorProfileId = colorProfiles[0].id;

            return settingsService.update(device.id, JSON.stringify(ledStripSettings));
        },
    },
};
