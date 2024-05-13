import clsx from "clsx";
import { ReactNode } from "react";

export type CircleIconProps = {
    circleClass: string;
    children?: ReactNode;
};

export const CircleIcon = ({ circleClass, children }: CircleIconProps) => {
    return (
        <div
            className={clsx(
                "flex items-center justify-center",
                "h-28 w-28 rounded-full ",
                circleClass,
            )}
        >
            {children}
        </div>
    );
};
