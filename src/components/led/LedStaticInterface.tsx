import { updateColorInFirestore } from "@actions/firestore/colors";
import { Spinner } from "@components/Spinner";
import { ColorPicker } from "@components/led/picker/ColorPicker";
import { LedColorList } from "@components/led/LedColorList";
import { LedStripSettings } from "@/types/Settings";

type LedStaticInterfaceProps = {
    ledStripSettings: LedStripSettings;
}

export const LedStaticInterface = ({ ledStripSettings }: LedStaticInterfaceProps) => {

    const onColorChange = (color: string) => {
        if (activeColor.immutable) return;
        updateColorInFirestore(activeColor.id, color);
    };

    return (
        <div className="mx-5 flex flex-col items-center gap-6">
            <LedColorList activeColor={activeColor} />
            <ColorPicker inputColor={activeColor.hex} onChange={onColorChange} />
        </div>
    );
};
