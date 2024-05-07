import { DeviceColorPicker } from "@components/device/DeviceColorPicker";

export const LedStripDevice = () => {
    return (
        <div className="flex justify-center py-20">
            <DeviceColorPicker startColor="#ffffff" />
        </div>
    );
};
