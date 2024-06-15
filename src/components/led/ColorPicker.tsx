import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useDebouncedCallback } from "use-debounce";

export type ColorPickerProps = {
    activeColor: string;
    onChange: (color: string) => void;
};

export const ColorPicker = ({ activeColor, onChange }: ColorPickerProps) => {
    const [value, setValue] = useState(activeColor);
    const debounced = useDebouncedCallback((value: string) => {
        const strippedValue = value.replace("#", "");
        setValue(strippedValue);
        onChange(strippedValue);
    }, 50);

    useEffect(() => {
        setValue(activeColor);
    }, [activeColor]);
    return (
        <div className="h-[200px] w-[250px]">
            <HexColorPicker color={value} onChange={debounced} />
        </div>
    );
};
