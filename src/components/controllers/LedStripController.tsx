"use client";
import { LedStripMode } from "@/constants/ledStrip";
import { HueTab } from "@/containers/HueTab";
import { useDeviceListener } from "@/hooks/useDeviceListener";
import { Device } from "@/types/Device";
import { LedStripSettings } from "@/types/Settings";
import { Spinner } from "@components/Spinner";
import { LedStaticInterface } from "@components/led/LedStaticInterface";

type LedStripControllerProps = {
    initialDevice: Device;
};

export const LedStripController = ({ initialDevice }: LedStripControllerProps) => {
    const { device } = useDeviceListener(initialDevice);

    if (!device) {
        return <Spinner />;
    }

    const ledStripSettings: LedStripSettings = JSON.parse(device.settings_json);

    return (
        <div className="flex justify-center py-4">
            <HueTab
                tabNames={Object.values(LedStripMode)}
                startTabIndex={Math.max(
                    Object.keys(LedStripMode).indexOf(ledStripSettings.mode),
                    0,
                )}
            >
                <LedStaticInterface device={device} ledStripSettings={ledStripSettings} />
                <p>Test2</p>
            </HueTab>
        </div>
    );
};
