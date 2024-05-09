"use client";
import { useDebouncedCallback } from "use-debounce";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";

export const DeviceColorPicker = ({ startColor }: { startColor: string }) => {
    const [value, setValue] = useState(startColor);
    const debounced = useDebouncedCallback((value: string) => {
        setValue(value);
    }, 50);
    return <div className="w-[250px] h-[200px]">
        <HexColorPicker color={value} onChange={debounced} />
    </div>;
};