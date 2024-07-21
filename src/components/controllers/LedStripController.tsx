"use client";
import { HueTab } from "@/containers/HueTab";
import { LedStaticInterface } from "@components/led/LedStaticInterface";
import { LedStripSettings } from "@/types/Settings";
import { useEffect, useState } from "react";
import { Spinner } from "@components/Spinner";
import { Device2 } from "@/types/Device";
import { getDeviceUpdateEndpoint } from "@/utils/apiUtils";

export const LedStripController = ({ device }: { device: Device2 }) => {
    const [ledStripSettings, setLedStripSettings] = useState<LedStripSettings>();

    const initSettingsListener = () => {
        const settingsEventSource = new EventSource(getDeviceUpdateEndpoint(device.id));

        settingsEventSource.onmessage = (event) => {
            const settings: LedStripSettings = JSON.parse(event.data);
            setLedStripSettings(settings);
            console.log("settings", settings)

            if (settings.activeColorId) {
                console.log("settings.active_color_id", settings.activeColorId);
            }
        };
        return settingsEventSource;
    };

    useEffect(() => {
        const eventSource = initSettingsListener();
        return () => eventSource.close();
    }, []);

    if (!ledStripSettings) {
        return <Spinner />;
    }

    return (
        <div className="flex justify-center py-4">
            <HueTab tabNames={["Static", "Fade"]}>
                <LedStaticInterface ledStripSettings={ledStripSettings} />
                <p>Test2</p>
            </HueTab>
        </div>
    );
};
