import clsx from "clsx";
import { ReactNode } from "react";

export type CircleIconProps = {
    colors?: string[];
    circleClass?: string;
    size?: "small" | "medium" | "large";
    onClick?: () => void;
    children?: ReactNode;
};

export const CircleIcon = ({ circleClass, colors, size, onClick, children }: CircleIconProps) => {
    const sizeClass = {
        small: "h-14 w-14",
        medium: "h-20 w-20",
        large: "h-28 w-28",
    }[size ?? "medium"];

    return (
        <div
            className={clsx(
                "flex items-center justify-center",
                "rounded-full",
                sizeClass,
                circleClass,
            )}
            style={colors && getStyle(colors)}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

function getStyle(colors: string[]) {
    if (colors.length === 1) {
        return { backgroundColor: `#${colors[0]}` };
    }
    return { backgroundImage: createColorGradient(colors) };
}

function createColorGradient(colors: string[]): string {
    return `linear-gradient(to right, ${colors.map((color) => `#${color}`).join(",")})`;
}
