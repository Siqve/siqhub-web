import { ColorPicker } from "@components/led/ColorPicker";
import { HueTab } from "@/containers/HueTab";
import { LedStaticInterface } from "@components/led/LedStaticInterface";

export const LedStripController = () => {
    return (
        <div className="flex justify-center py-4">
            <HueTab tabNames={["Static", "Fade"]}>
                <LedStaticInterface/>
                <p>Test2</p>
            </HueTab>
        </div>
    );
};
