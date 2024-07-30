import { CardListSection } from "@/containers/CardListSection";
import { CircleIcon } from "@/containers/CircleIcon";
import { ColorDB } from "@/libs/supabase/types";
import { COLORS } from "@/styles/colors";
import { Check, Plus, XCircle } from "@phosphor-icons/react/dist/ssr";
import tinycolor from "tinycolor2";

export type ColorListProps = {
    colors: ColorDB[];
    activeColorId?: number;
    onColorSelect: (color: ColorDB) => void;
    onCreateColorClick?: () => void;
    onDeleteColorClick?: () => void;
};

export const IconColorList = ({
    colors,
    activeColorId,
    onColorSelect,
    onCreateColorClick,
    onDeleteColorClick,
}: ColorListProps) => {
    const isDeleteButtonEnabled = (color: ColorDB) =>
        onDeleteColorClick && colors.length > 1 && !color.immutable;

    return (
        <CardListSection title="Colors">
            {colors.map((color) =>
                activeColorId === color.id ? (
                    <div className="relative" key={color.id}>
                        <CircleIcon color={`#${color.hex}`} onClick={() => onColorSelect(color)}>
                            <Check
                                color={`#${tinycolor(color.hex).darken(50).toHex()}`}
                                size="42"
                            />
                        </CircleIcon>
                        {isDeleteButtonEnabled(color) && (
                            <XCircle
                                className="absolute right-[-7px] top-[-7px]"
                                color={COLORS.error}
                                size="30"
                                onClick={onDeleteColorClick}
                            ></XCircle>
                        )}
                    </div>
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
