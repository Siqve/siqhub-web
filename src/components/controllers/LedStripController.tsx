"use client";
import { HubTab } from "@/containers/HubTab";
import { useDeviceListener } from "@/hooks/useDeviceListener";
import { Device } from "@/types/Device";
import { LedStripSettings } from "@/types/Settings";
import { Spinner } from "@components/Spinner";
import { LedColorInterface } from "@components/led/LedColorInterface";
import { LedSettingsInterface } from "@components/led/LedSettingsInterface";

type LedStripControllerProps = {
    initialDevice: Device;
};

export const LedStripController = ({ initialDevice }: LedStripControllerProps) => {
    const { device, isDeviceReady } = useDeviceListener(initialDevice);

    if (!isDeviceReady) {
        return <Spinner />;
    }

    if (!device) {
        return <h2>Error, failed to load device!</h2>;
    }

    const ledStripSettings: LedStripSettings = JSON.parse(device.settings_json);
    return (
        <div className="flex justify-center py-4">
            <HubTab tabNames={["Colors", "Settings"]} startTabIndex={0}>
                <LedColorInterface device={device} ledStripSettings={ledStripSettings} />
                <LedSettingsInterface device={device} ledStripSettings={ledStripSettings} />
            </HubTab>
        </div>
    );
};
