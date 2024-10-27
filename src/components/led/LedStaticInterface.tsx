import { useColorListener } from "@/hooks/useColorListener";
import { Device } from "@/types/Device";
import { LedStripSettings } from "@/types/Settings";
import { _updateColor } from "@actions/supabase/color";
import { LedColorList } from "@components/led/LedColorList";
import { ColorPicker } from "@components/led/picker/ColorPicker";
import { Spinner } from "@components/Spinner";

type LedStaticInterfaceProps = {
    device: Device;
    ledStripSettings: LedStripSettings;
};

export const LedStaticInterface = ({ device, ledStripSettings }: LedStaticInterfaceProps) => {
    const { color: activeColor, isColorReady } = useColorListener(
        ledStripSettings.activeColorId.toString(),
    );

    if (!isColorReady) {
        return <Spinner />;
    }

    const onColorChange = (color: string) => {
        if (!activeColor || activeColor.immutable) return;
        void _updateColor(activeColor.id, { hex: color });
    };

    return (
        <div className="mx-5 flex flex-col items-center gap-6">
            <LedColorList device={device} activeColorId={ledStripSettings.activeColorId} />
            {activeColor && !activeColor.immutable && (
                // TODO Make an indication that the color is immutable
                <ColorPicker inputColor={activeColor.hex} onChange={onColorChange} />
            )}
        </div>
    );
};
