import { COLORS } from "@/styles/colors";
import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import type { SliderStyles } from "rc-slider/lib/interface";

export type SliderProps = {
    onMove: (position: number) => void;
    startValue: number;
    activeBarColor?: string;
    IconLeft?: Icon;
    IconRight?: Icon;
};

export const HueSlider = ({
    onMove,
    startValue,
    activeBarColor,
    IconLeft,
    IconRight,
}: SliderProps) => {
    const onChange = (position: number | number[]) => {
        if (typeof position === "number") {
            onMove(position);
        }
    };

    const sliderStyle: SliderStyles = {
        track: { backgroundColor: `#${activeBarColor}` ?? COLORS["base-content"] },
        handle: {
            backgroundColor: COLORS["base-content"],
            border: `none`,
            opacity: 1,
            height: "20px",
            width: "20px",
            marginTop: "-8px",
        },
    };

    console.log(startValue);
    return (
        <div className="flex w-full items-center justify-between gap-2">
            {IconLeft && <IconLeft size={30} color={COLORS["base-content"]} />}
            <Slider
                defaultValue={startValue}
                styles={sliderStyle}
                className="touch-none [&>*]:!shadow-none"
                onChange={onChange}
            />
            {IconRight && <IconRight size={34} color={COLORS["base-content"]} />}
        </div>
    );
};
