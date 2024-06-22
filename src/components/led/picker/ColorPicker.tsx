import { HueSlider } from "@components/HueSlider";
import { Sun, SunDim } from "@phosphor-icons/react";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import tinycolor from "tinycolor2";
import { useDebouncedCallback } from "use-debounce";

export type ColorPickerProps = {
    inputColor: string;
    onChange: (color: string) => void;
};

export const ColorPicker = ({ inputColor, onChange }: ColorPickerProps) => {
    const [color, setColor] = useState(inputColor);

    useEffect(() => {
        setColor(inputColor);
    }, [inputColor]);

    const debouncedColorUpdate = useDebouncedCallback((color: string) => {
        setColor(color);
        onChange(color);
    }, 250);

    const onHexColorPickerChange = (value: string) => {
        debouncedColorUpdate(stripColorFromHash(value));
    };

    const onBrightnessChange = (value: number) => {
        if (value < 1) value = 1.1;
        const newColor = convertColorBrightness(color, value / 100);
        debouncedColorUpdate(stripColorFromHash(newColor));
    };

    const colorBrightness = tinycolor(color).toHsv().v * 100;
    return (
        <div className="flex flex-col gap-4">
            <div className="h-[200px] w-[250px]">
                <HexColorPicker color={color} onChange={onHexColorPickerChange} />
            </div>
            <HueSlider
                startValue={colorBrightness}
                onMove={onBrightnessChange}
                activeBarColor={color}
                IconLeft={SunDim}
                IconRight={Sun}
            />
        </div>
    );
};

function stripColorFromHash(color: string) {
    return color.replace("#", "");
}

function convertColorBrightness(color: string, brightness: number) {
    const hsv = tinycolor(color).toHsv();
    hsv.v = brightness;
    return tinycolor(hsv).toHexString();
}
