import { CardListSection } from "@/containers/CardListSection";
import { CircleIcon } from "@/containers/CircleIcon";
import { useColorProfilesListener } from "@/hooks/useColorProfilesListener";
import { COLORS } from "@/styles/colors";
import { Device } from "@/types/Device";
import { LedStripSettings } from "@/types/Settings";
import { _deleteColorProfiles, _insertColorProfiles } from "@actions/supabase/colorProfile";
import { _updateDeviceSettings } from "@actions/supabase/device";
import { _resetActiveColorProfile } from "@actions/supabase/device_led";
import { Spinner } from "@components/Spinner";
import { Check, Plus, XCircle } from "@phosphor-icons/react/dist/ssr";
import { ColorProfileDB } from "@siqve/supabase-services";
import tinycolor from "tinycolor2";

export type LedColorProfileListProps = {
    device: Device;
    ledStripSettings: LedStripSettings;
};

export const LedColorProfileList = ({ device, ledStripSettings }: LedColorProfileListProps) => {
    const { colorProfiles, isColorProfilesReady } = useColorProfilesListener();

    if (!isColorProfilesReady) {
        return <Spinner />;
    }

    if (!colorProfiles) {
        return <h2>Error, failed to load colors!</h2>;
    }

    const updateActiveColorProfile = (colorProfileId: number) => {
        void _updateDeviceSettings(device.id, {
            ...ledStripSettings,
            colorProfileId,
        });
    };

    const onColorSelect = (colorProfile: ColorProfileDB) => {
        updateActiveColorProfile(colorProfile.id);
    };

    const onCreateColorClick = () => {
        _insertColorProfiles({ hexes: "FFFFFF" }).then((newColorProfile) => {
            updateActiveColorProfile(newColorProfile.id);
        });
    };

    const onDeleteColorClick = () => {
        void _deleteColorProfiles(ledStripSettings.colorProfileId);
        void _resetActiveColorProfile(device);
    };

    const isDeleteButtonEnabled = (colorProfile: ColorProfileDB) =>
        colorProfiles.length > 1 && !colorProfile.immutable;

    return (
        <CardListSection title="Profiles">
            {colorProfiles.map((colorProfile) => (
                <div className="relative" key={colorProfile.id}>
                    <CircleIcon
                        key={colorProfile.id}
                        colors={colorProfile.hexes.split(",")}
                        onClick={() => onColorSelect(colorProfile)}
                    >
                        {ledStripSettings.colorProfileId === colorProfile.id && (
                            <Check
                                color={`#${tinycolor(colorProfile.hexes.split(",")[0]).darken(50).toHex()}`}
                                size="42"
                            />
                        )}
                    </CircleIcon>
                    {ledStripSettings.colorProfileId === colorProfile.id &&
                        isDeleteButtonEnabled(colorProfile) && (
                            <XCircle
                                className="absolute right-[-7px] top-[-7px]"
                                color={COLORS.error}
                                size="30"
                                onClick={onDeleteColorClick}
                            ></XCircle>
                        )}
                </div>
            ))}

            {onCreateColorClick && (
                <CircleIcon
                    circleClass="shadow-[0_0px_7px_1px_rgba(0,0,0,0.5)]"
                    onClick={onCreateColorClick}
                >
                    <Plus color={COLORS["neutral-content"]} size="38" />
                </CircleIcon>
            )}
        </CardListSection>
    );
};
