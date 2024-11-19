"use client";
import { HueTab } from "@/containers/HueTab";
import { useDeviceListener } from "@/hooks/useDeviceListener";
import { Device } from "@/types/Device";
import { LedStripSettings } from "@/types/Settings";
import { Spinner } from "@components/Spinner";
import { LedColorInterface } from "@components/led/LedColorInterface";

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
            <HueTab
                tabNames={["Colors", "Settings"]}
                startTabIndex={0}
            >
                <LedColorInterface device={device} ledStripSettings={ledStripSettings} />
                <p>Test2</p>
            </HueTab>
        </div>
    );
};
