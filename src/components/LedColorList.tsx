import { API_ROUTE } from "@/app/api/constants";
import { Color } from "@/types/Color";
import { createColorInFirestore } from "@actions/firestore/colors";
import { ColorList } from "@components/ColorList";
import { useEffect, useState } from "react";

const INITIAL_COLOR = "FBFFFF";

export type ColorListProps = {
    activeColor?: Color;
};

export const LedColorList = ({
    activeColor,
}: ColorListProps) => {
    const [colors, setColors] = useState<Color[]>([]);

    const initColorsListener = () => {
        const settingsEventSource = new EventSource(API_ROUTE.FIRESTORE.ON_COLORS_UPDATE);
        settingsEventSource.onmessage = (event) => {
            const colors: Color[] = JSON.parse(event.data);
            setColors(colors);
        };
    };

    useEffect(() => {
        initColorsListener();
    }, []);

    const onColorSelect = (color: Color) => {

    }

    const onCreateColorClick = () => {
        createColorInFirestore(INITIAL_COLOR).then((newDocument) => {
            //     TODO: Make this creation listen to feed from an API endpoint
            const newColor: Color = { id: newDocument, hex: INITIAL_COLOR };
            // setColors([...colors, newColor]);
            console.log("newColor: ", newColor);
            onColorSelect(newColor);
        });
    };

    return (
        <ColorList
            colors={colors}
            activeColor={activeColor}
            onColorSelect={onColorSelect}
            onCreateColorClick={onCreateColorClick}
        />
    );
};
