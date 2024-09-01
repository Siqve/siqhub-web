import { Device } from "@/types/Device";
import { LedStripSettings } from "@/types/Settings";
import { DeviceUpdateDB } from "@siqve/supabase-services";
import { db } from "@/services/dbService";

export const settingsService = {
    update: async (deviceId: string, settings: string): Promise<Device> => {
        const update: DeviceUpdateDB = {
            settings_json: settings,
        };

        return db.table().device().update(deviceId, update);
    },
    ledStrip: {
        resetActiveColor: async (device: Device): Promise<Device> => {
            const colors = await db.table().color().selectAll();
            if (colors.length === 0) {
                throw new Error(
                    `Unable to reset active color for device: ${device.id}. Reason: No colors found.`,
                );
            }

            const ledStripSettings: LedStripSettings = JSON.parse(device.settings_json);
            ledStripSettings.activeColorId = colors[0].id;

            return settingsService.update(device.id, JSON.stringify(ledStripSettings));
        },
    },
};
