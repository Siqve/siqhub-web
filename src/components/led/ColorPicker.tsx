"use client";
import { useDebouncedCallback } from "use-debounce";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";

export const ColorPicker = ({ startColor }: { startColor: string }) => {
    const [value, setValue] = useState(startColor);
    const debounced = useDebouncedCallback((value: string) => {
        setValue(value);
    }, 50);
    return (
        <div className="h-[200px] w-[250px]">
            <HexColorPicker color={value} onChange={debounced} />
        </div>
    );
};
