import { DeviceUpdateDB } from "@/libs/supabase/types";
import { getDB } from "@/services/dbService";
import { Device2 } from "@/types/Device";
import { LedStripSettings } from "@/types/Settings";

export const settingsService = {
    update: async (deviceId: string, settings: string): Promise<Device2> => {
        const update: DeviceUpdateDB = {
            settings_json: settings,
        };

        return getDB().device().update(deviceId, update);
    },
    ledStrip: {
        resetActiveColor: async (device: Device2): Promise<Device2> => {
            const colors = await getDB().color().getAll();
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
