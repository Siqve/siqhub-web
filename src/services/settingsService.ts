import { Device } from "@/types/Device";
import { LedStripSettings } from "@/types/Settings";
import { DeviceUpdateDB, getDB } from "@siqve/supabase-services";

export const settingsService = {
    update: async (deviceId: string, settings: string): Promise<Device> => {
        const update: DeviceUpdateDB = {
            settings_json: settings,
        };

        return getDB().device().update(deviceId, update);
    },
    ledStrip: {
        resetActiveColor: async (device: Device): Promise<Device> => {
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
