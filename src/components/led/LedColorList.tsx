import { LedStripMode } from "@/constants/ledStrip";
import { Device } from "@/types/Device";
import { _deleteColor, _insertColor } from "@actions/supabase/color";
import { _updateDeviceSettings } from "@actions/supabase/device";
import { _resetActiveColor } from "@actions/supabase/device_led";
import { IconColorList } from "@components/IconColorList";
import { ColorDB } from "@siqve/supabase-services";
import { useColorsListener } from "@/hooks/useColorsListener";
import { Spinner } from "@components/Spinner";

const INITIAL_COLOR = "FBFFFF";

export type LedColorListProps = {
    device: Device;
    activeColorId: number;
};

export const LedColorList = ({ device, activeColorId }: LedColorListProps) => {
    const { colors, isColorsReady } = useColorsListener();

    if (!isColorsReady) {
        return <Spinner/>
    }

    if (!colors) {
        return <h2>Error, failed to load colors!</h2>;
    }

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
