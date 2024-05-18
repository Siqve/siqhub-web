import clsx from "clsx";
import { ReactNode } from "react";

export type CircleIconProps = {
    circleClass?: string;
    color?: string;
    size?: "small" | "medium" | "large";
    onClick?: () => void;
    children?: ReactNode;
};

export const CircleIcon = ({ circleClass, color, size, onClick, children }: CircleIconProps) => {
    const sizeClass = {
        small: "h-14 w-14",
        medium: "h-20 w-20",
        large: "h-28 w-28",
    }[size ?? "medium"];
    return (
        <div
            className={clsx("flex items-center justify-center", "rounded-full", sizeClass, circleClass)}
            style={{ backgroundColor: color }}
            onClick={onClick}
        >
            {children}
        </div>
    );
};
