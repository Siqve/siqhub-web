import { DeviceType } from "@/types/DeviceType";

export type Device = {
    id: string;
    type: DeviceType;
    name: string;
    ip: string;
    gradientClass: string;
    textClass: string;
};