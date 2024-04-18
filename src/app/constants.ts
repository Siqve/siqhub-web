export type DeviceInfo = {
    name: string;
    graphic: string;
};

export const DEVICE_TYPE: Record<"LED_STRIP" | "LAMP", DeviceInfo> = {
    LED_STRIP: {
        name: "Ledstripe",
        graphic: "graphic/led-strip.svg",
    },
    LAMP: {
        name: "Lampe",
        graphic: "graphic/lamp.svg",
    },
} as const;

export type DeviceType = (typeof DEVICE_TYPE)[keyof typeof DEVICE_TYPE];
