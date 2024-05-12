import clsx from "clsx";
import Link from "next/link";
import { Device } from "@/types/Device";
import { HueGraphic } from "@components/graphic/HueGraphic";

export type CircleIconProps = {
    circleClass: string;
    children: React.ReactNode;
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
