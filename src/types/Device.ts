import { DeviceType } from "@/types/DeviceType";
import { ColorTheme } from "@/types/ColorTheme";

export type Device = {
    id: string;
    type: DeviceType;
    name: string;
    ip: string;
    gradientClass: string;
    textClass: string;
};

export type Device2 = {
    id: number;
    name: string;
    ip: string;
    type: DeviceType;
    color_theme: ColorTheme;
};
