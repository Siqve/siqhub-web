import { Device } from "@/types/Device";
import { LedStripSettings } from "@/types/Settings";
import { _updateDeviceSettings } from "@actions/supabase/device";
import { HubSlider } from "@components/HubSlider";
import { Lightbulb, Speedometer } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type LedSettingsInterfaceProps = {
    device: Device;
    ledStripSettings: LedStripSettings;
};

export const LedSettingsInterface = ({ device, ledStripSettings }: LedSettingsInterfaceProps) => {
    const [currentLedStripSettings, setCurrentLedStripSettings] =
        useState<LedStripSettings>(ledStripSettings);

    const persistSettingsUpdate = useDebouncedCallback(() => {
        _updateDeviceSettings(device.id, currentLedStripSettings).then((updatedDevice) => {
            setCurrentLedStripSettings(JSON.parse(updatedDevice.settings_json));
        });
    }, 250);

    const onSettingUpdate = (setting: Partial<LedStripSettings>) => {
        setCurrentLedStripSettings((currentLedStripSettings) => ({
            ...currentLedStripSettings,
            ...setting,
        }));
        persistSettingsUpdate();
    };

    useEffect(() => {
        setCurrentLedStripSettings(ledStripSettings);
    }, [ledStripSettings]);

    return (
        <div className="mx-5 flex w-full flex-col items-center gap-6">
            <div className="w-full">
                <p>{`FPS: ${currentLedStripSettings.fps}`}</p>
                <HubSlider
                    startValue={ledStripSettings.fps}
                    onMove={(fps: number) => onSettingUpdate({ fps })}
                    IconLeft={Speedometer}
                    IconRight={Speedometer}
                    min={0}
                    max={1000}
                />
            </div>
            <div className="w-full">
                <p>{`Frequency: ${currentLedStripSettings.frequency}`}</p>
                <HubSlider
                    startValue={currentLedStripSettings.frequency}
                    onMove={(frequency: number) => onSettingUpdate({ frequency })}
                    IconLeft={Lightbulb}
                    IconRight={Lightbulb}
                    min={0}
                    max={20}
                    step={0.2}
                />
            </div>
            <div className="flex w-full justify-center">
                <div className="flex gap-2">
                    <p>Reverse: </p>
                    <input
                        type="checkbox"
                        checked={currentLedStripSettings.reverse}
                        onChange={(event) => onSettingUpdate({ reverse: event.target.checked })}
                    />
                </div>
            </div>
        </div>
    );
};
