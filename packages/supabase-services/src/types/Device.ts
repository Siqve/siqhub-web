import { ColorTheme } from "./ColorTheme";
import { DeviceType } from "./DeviceType";

export type Device = {
    id: string;
    name: string;
    ip: string;
    settings_json: string;
    type: DeviceType;
    color_theme: ColorTheme;
};
