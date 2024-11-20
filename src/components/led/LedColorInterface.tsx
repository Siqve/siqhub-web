import { useColorProfileListener } from "@/hooks/useColorProfileListener";
import { Device } from "@/types/Device";
import { LedStripSettings } from "@/types/Settings";
import {
    appendHexToHexes,
    deleteHex,
    moveHexLeft,
    moveHexRight,
    replaceHexInHexes,
} from "@/utils/ledUtils";
import { _updateColorProfiles } from "@actions/supabase/colorProfile";
import { LedColorProfileList } from "@components/led/LedColorProfileList";
import { ColorPickerList } from "@components/led/picker/ColorPickerList";
import { Spinner } from "@components/Spinner";
import { ColorProfileDB } from "@siqve/supabase-services";

type LedStaticInterfaceProps = {
    device: Device;
    ledStripSettings: LedStripSettings;
};

export const LedColorInterface = ({ device, ledStripSettings }: LedStaticInterfaceProps) => {
    const { colorProfile: activeColorProfile, isColorProfileReady } = useColorProfileListener(
        ledStripSettings.colorProfileId.toString(),
    );

    if (!isColorProfileReady) {
        return <Spinner />;
    }

    if (!activeColorProfile) {
        throw new Error("Color profile not found");
    }

    const hexes: string[] = activeColorProfile.hexes.split(",");
    return (
        <div className="mx-5 flex flex-col items-center gap-6">
            <LedColorProfileList device={device} activeColorId={ledStripSettings.colorProfileId} />
            {!activeColorProfile.immutable && (
                <ColorPickerList
                    hexes={hexes}
                    onChange={(color, index) => onColorChange(activeColorProfile, color, index)}
                    onColorCreate={() => onColorCreate(activeColorProfile)}
                    onColorMoveLeft={(index) => onColorMoveLeft(activeColorProfile, index)}
                    onColorMoveRight={(index) => onColorMoveRight(activeColorProfile, index)}
                    onColorDelete={(index) => onColorDelete(activeColorProfile, index)}
                />
            )}
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

function onColorMoveLeft(activeColorProfile: ColorProfileDB, index: number) {
    const newHexesString = moveHexLeft(activeColorProfile.hexes, index);
    void _updateColorProfiles(activeColorProfile.id, { hexes: newHexesString });
}

function onColorMoveRight(activeColorProfile: ColorProfileDB, index: number) {
    const newHexesString = moveHexRight(activeColorProfile.hexes, index);
    void _updateColorProfiles(activeColorProfile.id, { hexes: newHexesString });
}

function onColorDelete(activeColorProfile: ColorProfileDB, index: number) {
    const newHexesString = deleteHex(activeColorProfile.hexes, index);
    void _updateColorProfiles(activeColorProfile.id, { hexes: newHexesString });
}
