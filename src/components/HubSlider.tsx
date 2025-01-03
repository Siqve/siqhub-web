import { COLORS } from "@/styles/colors";
import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import Slider, { SliderProps } from "rc-slider";
import "rc-slider/assets/index.css";
import type { SliderStyles } from "rc-slider/lib/interface";
import { useEffect, useState } from "react";

export type HubSliderProps = {
    onMove: (position: number) => void;
    startValue: number;
    activeBarColor?: string;
    IconLeft?: Icon;
    IconRight?: Icon;
} & SliderProps;

export const HubSlider = ({
    onMove,
    startValue,
    activeBarColor,
    IconLeft,
    IconRight,
    min,
    max,
    step,
}: HubSliderProps) => {
    const [position, setPosition] = useState<number>(startValue);

    const baseColor = COLORS["base-content"];
    const onChange = (position: number | number[]) => {
        if (typeof position === "number") {
            onMove(position);
            setPosition(position);
        }
    };

    const sliderStyle: SliderStyles = {
        track: { backgroundColor: activeBarColor ? `#${activeBarColor}` : baseColor },
        handle: {
            backgroundColor: baseColor,
            border: `none`,
            opacity: 1,
            height: "20px",
            width: "20px",
            marginTop: "-8px",
        },
    };

    const marks = {
        ...(min !== undefined && {
            [min]: {
                style: { color: baseColor },
                label: <strong>{min}</strong>,
            },
        }),
        ...(max !== undefined && {
            [max]: {
                style: { color: baseColor },
                label: <strong>{max}</strong>,
            },
        }),
    };

    useEffect(() => {
        setPosition(startValue);
    }, [startValue]);

    return (
        <div className="flex w-full items-center justify-between gap-2">
            {IconLeft && <IconLeft size={30} color={baseColor} />}
            <Slider
                defaultValue={startValue}
                value={position}
                styles={sliderStyle}
                className="touch-none [&>*]:!shadow-none"
                onChange={onChange}
                min={min}
                max={max}
                marks={marks}
                step={step}
            />
            {IconRight && <IconRight size={34} color={baseColor} />}
        </div>
    );
};
