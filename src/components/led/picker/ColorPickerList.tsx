import { CircleIcon } from "@/containers/CircleIcon";
import { COLORS } from "@/styles/colors";
import { ColorPicker } from "@components/led/picker/ColorPicker";
import { ArrowFatLeft, ArrowFatRight } from "@phosphor-icons/react";
import { Plus, XCircle } from "@phosphor-icons/react/dist/ssr";

type ColorPickerListProps = {
    hexes: string[];
    onChange: (color: string, index: number) => void;
    onColorCreate: () => void;
    onColorMoveLeft: (index: number) => void;
    onColorMoveRight: (index: number) => void;
    onColorDelete: (index: number) => void;
};

export const ColorPickerList = ({
    hexes,
    onChange,
    onColorCreate,
    onColorMoveRight,
    onColorMoveLeft,
    onColorDelete,
}: ColorPickerListProps) => {
    return (
        <div className="grid gap-x-12 gap-y-5 md:grid-cols-2">
            {hexes.map((hex, index) => (
                <div className="flex w-[300px] flex-col gap-2" key={hex + index}>
                    <div className="flex justify-center gap-2">
                        {index !== 0 && (
                            <ArrowFatLeft
                                color={COLORS["neutral-content"]}
                                size="38"
                                onClick={() => onColorMoveLeft(index)}
                            />
                        )}
                        {hexes.length > 1 && (
                            <XCircle
                                color={COLORS["neutral-content"]}
                                size="38"
                                onClick={() => onColorDelete(index)}
                            ></XCircle>
                        )}
                        {index !== hexes.length - 1 && (
                            <ArrowFatRight
                                color={COLORS["neutral-content"]}
                                size="38"
                                onClick={() => onColorMoveRight(index)}
                            />
                        )}
                    </div>
                    <ColorPicker inputColor={hex} onChange={onChange} index={index} />
                </div>
            ))}
            <div className="flex items-center justify-center">
                <CircleIcon
                    circleClass="shadow-[0_0px_7px_1px_rgba(0,0,0,0.5)]"
                    onClick={onColorCreate}
                >
                    <Plus color={COLORS["neutral-content"]} size="38" />
                </CircleIcon>
            </div>
        </div>
    );
};
