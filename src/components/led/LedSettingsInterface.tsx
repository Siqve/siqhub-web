import { Device } from "@/types/Device";
import { LedStripSettings } from "@/types/Settings";
import { appendHexToHexes, replaceHexInHexes } from "@/utils/ledUtils";
import { _updateColorProfiles } from "@actions/supabase/colorProfile";
import { _updateDeviceSettings } from "@actions/supabase/device";
import { HubSlider } from "@components/HubSlider";
import { Lightbulb, Speedometer } from "@phosphor-icons/react";
import { ColorProfileDB } from "@siqve/supabase-services";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type LedSettingsInterfaceProps = {
    device: Device;
    ledStripSettings: LedStripSettings;
};

export const LedSettingsInterface = ({ device, ledStripSettings }: LedSettingsInterfaceProps) => {
    const [currentLedStripSettings, setCurrentLedStripSettings] =
        useState<LedStripSettings>(ledStripSettings);

    const updateSetting = useDebouncedCallback(() => {
        console.log(currentLedStripSettings);
        _updateDeviceSettings(device.id, currentLedStripSettings).then((updatedDevice) => {
            setCurrentLedStripSettings(JSON.parse(updatedDevice.settings_json));
        });
    }, 250);

    const onFpsChange = (fps: number) => {
        setCurrentLedStripSettings((currentLedStripSettings) => ({
            ...currentLedStripSettings,
            fps,
        }));
        updateSetting();
    };

    const onPixelColorHopChange = (pixelColorHop: number) => {
        setCurrentLedStripSettings((currentLedStripSettings) => ({
            ...currentLedStripSettings,
            pixelColorHop,
        }));
        updateSetting();
    };

    return (
        <div className="mx-5 flex w-full flex-col items-center gap-6">
            <div className="w-full">
                <p>{`FPS: ${currentLedStripSettings.fps}`}</p>
                <HubSlider
                    startValue={ledStripSettings.fps}
                    onMove={onFpsChange}
                    IconLeft={Speedometer}
                    IconRight={Speedometer}
                    min={0}
                    max={1000}
                />
            </div>
            <div className="w-full">
                <p>{`Pixel Color Hop: ${currentLedStripSettings.pixelColorHop}`}</p>
                <HubSlider
                    startValue={ledStripSettings.pixelColorHop}
                    onMove={onPixelColorHopChange}
                    IconLeft={Lightbulb}
                    IconRight={Lightbulb}
                    min={0}
                    max={1000}
                />
            </div>
        </div>
    );
};

function onColorChange(activeColorProfile: ColorProfileDB, color: string, index: number) {
    const newHexesString = replaceHexInHexes(activeColorProfile.hexes, color, index);
    void _updateColorProfiles(activeColorProfile.id, { hexes: newHexesString });
}

function onColorCreate(activeColorProfile: ColorProfileDB) {
    const newHexesString = appendHexToHexes(activeColorProfile.hexes, "FFFFFF");
    void _updateColorProfiles(activeColorProfile.id, { hexes: newHexesString });
}
