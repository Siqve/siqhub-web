import { API_ROUTE } from "@/app/api/constants";
import { CardListSection } from "@/containers/CardListSection";
import { CircleIcon } from "@/containers/CircleIcon";
import { COLORS } from "@/styles/colors";
import { Color } from "@/types/Color";
import { createColorInFirebase, getColorsFromFirebase } from "@actions/firebase/colors";
import { Check, Plus } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";
import tinycolor from "tinycolor2";

const INITIAL_COLOR = "FBFFFF";

export type ColorListProps = {
    activeColor?: Color;
    onColorSelect: (color: Color) => void;
    showCreateColorCircle?: boolean;
};

export const ColorList = ({
    activeColor,
    onColorSelect,
    showCreateColorCircle,
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
        getColorsFromFirebase().then((colors) => {
            setColors(colors);
        });

        initColorsListener();
    }, []);

    const onPlusClick = () => {
        createColorInFirebase(INITIAL_COLOR).then((newDocument) => {
            //     TODO: Make this creation listen to feed from an API endpoint
            const newColor: Color = { id: newDocument, hex: INITIAL_COLOR };
            // setColors([...colors, newColor]);
            console.log("newColor: ", newColor);
            onColorSelect(newColor);
        });
    };

    return (
        <CardListSection title="Colors">
            {colors.map((color) =>
                activeColor?.id == color.id ? (
                    <CircleIcon
                        key={color.id}
                        color={`#${color.hex}`}
                        onClick={() => onColorSelect(color)}
                    >
                        <Check color={`#${tinycolor(color.hex).darken(60).toHex()}`} size="42" />
                    </CircleIcon>
                ) : (
                    <CircleIcon
                        key={color.id}
                        color={`#${color.hex}`}
                        onClick={() => onColorSelect(color)}
                    />
                ),
            )}
            {showCreateColorCircle && (
                <CircleIcon
                    circleClass="shadow-[0_0px_7px_1px_rgba(0,0,0,0.5)]"
                    onClick={onPlusClick}
                >
                    <Plus color={COLORS["neutral-content"]} size="38" />
                </CircleIcon>
            )}
        </CardListSection>
    );
};
