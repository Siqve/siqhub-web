import { DeviceType } from "./DeviceType";
import { ColorTheme } from "./ColorTheme";

export type Device = {
    id: string;
    name: string;
    ip: string;
    settings_json: string;
    type: DeviceType;
    color_theme: ColorTheme;
};
