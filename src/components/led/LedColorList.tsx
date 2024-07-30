import { LedStripMode } from "@/constants/ledStrip";
import { useColorsListener } from "@/hooks/useColorsListener";
import { ColorDB } from "@/libs/supabase/types";
import { Device } from "@/types/Device";
import { _deleteColor, _insertColor } from "@actions/supabase/color";
import { _updateDeviceSettings } from "@actions/supabase/device";
import { _resetActiveColor } from "@actions/supabase/device_led";
import { IconColorList } from "@components/IconColorList";

const INITIAL_COLOR = "FBFFFF";

export type LedColorListProps = {
    device: Device;
    activeColorId: number;
};

export const LedColorList = ({ device, activeColorId }: LedColorListProps) => {
    const { colors } = useColorsListener();

    const updateActiveColor = (colorId: number) => {
        void _updateDeviceSettings(device.id, {
            mode: LedStripMode.STATIC,
            activeColorId: colorId,
        });
    };

    const onColorSelect = (color: ColorDB) => {
        updateActiveColor(color.id);
    };

    const onCreateColorClick = () => {
        _insertColor({ hex: INITIAL_COLOR }).then((newColor) => {
            updateActiveColor(newColor.id);
        });
    };

    const onDeleteColorClick = () => {
        void _deleteColor(activeColorId);
        void _resetActiveColor(device);
    };

    return (
        <IconColorList
            colors={colors}
            activeColorId={activeColorId}
            onColorSelect={onColorSelect}
            onCreateColorClick={onCreateColorClick}
            onDeleteColorClick={onDeleteColorClick}
        />
    );
};
