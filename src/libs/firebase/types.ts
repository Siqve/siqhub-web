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