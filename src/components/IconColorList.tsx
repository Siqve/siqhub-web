import { CardListSection } from "@/containers/CardListSection";
import { CircleIcon } from "@/containers/CircleIcon";
import { COLORS } from "@/styles/colors";
import { Color } from "@/types/Color";
import { Check, Plus } from "@phosphor-icons/react/dist/ssr";
import tinycolor from "tinycolor2";

export type ColorListProps = {
    colors: Color[];
    activeColor?: Color;
    onColorSelect: (color: Color) => void;
    onCreateColorClick?: () => void;
};

export const IconColorList = ({
    colors,
    activeColor,
    onColorSelect,
    onCreateColorClick,
}: ColorListProps) => {
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
            {onCreateColorClick && (
                <CircleIcon
                    circleClass="shadow-[0_0px_7px_1px_rgba(0,0,0,0.5)]"
                    onClick={onCreateColorClick}
                >
                    <Plus color={COLORS["neutral-content"]} size="38" />
                </CircleIcon>
            )}
        </CardListSection>
    );
};
