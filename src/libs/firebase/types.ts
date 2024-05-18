import { DocumentReference } from "@firebase/firestore";

export type DeviceDocument = {
    name: string;
    ip: string;
    type: string;
    iconClass: DocumentReference;
};

export type IconClassDocument = {
    gradientClass: string;
    textClass: string;
};

export type ColorDocument = {
    hex: string;
    createdAt: number;
};

export type SettingsDocument = {
    activeColorId: string;
};
