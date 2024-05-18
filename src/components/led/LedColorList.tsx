import { API_ROUTE } from "@/app/api/constants";
import { Color } from "@/types/Color";
import { createColorInFirestore } from "@actions/firestore/colors";
import { updateSettingsInFirestore } from "@actions/firestore/settings";
import { IconColorList } from "@components/IconColorList";
import { useEffect, useState } from "react";

const INITIAL_COLOR = "FBFFFF";

export type ColorListProps = {
    activeColor?: Color;
};

export const LedColorList = ({ activeColor }: ColorListProps) => {
    const [colors, setColors] = useState<Color[]>([]);

    const initColorsListener = () => {
        const settingsEventSource = new EventSource(API_ROUTE.FIRESTORE.ON_COLORS_UPDATE);
        settingsEventSource.onmessage = (event) => {
            const colors: Color[] = JSON.parse(event.data);
            setColors(colors);
        };
        return settingsEventSource;
    };

    useEffect(() => {
        const eventSource = initColorsListener();
        return () => eventSource.close();
    }, []);

    const onColorSelect = (color: Color) => {
        updateSettingsInFirestore({ activeColorId: color.id });
    };

    const onCreateColorClick = () => {
        createColorInFirestore(INITIAL_COLOR).then((newDocument) => {
            const newColor: Color = { id: newDocument, hex: INITIAL_COLOR };
            onColorSelect(newColor);
        });
    };

    return (
        <IconColorList
            colors={colors}
            activeColor={activeColor}
            onColorSelect={onColorSelect}
            onCreateColorClick={onCreateColorClick}
        />
    );
};
