import { ColorTheme } from "@/types/ColorTheme";
import { DeviceType } from "@/types/DeviceType";

export type Device = {
    id: string;
    name: string;
    ip: string;
    settings_json: string;
    type: DeviceType;
    color_theme: ColorTheme;
};
