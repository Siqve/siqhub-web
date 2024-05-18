import { ColorDocument, DeviceDocument, IconClassDocument } from "@/libs/firebase/types";
import { Color } from "@/types/Color";
import { Device } from "@/types/Device";
import { DocumentSnapshot, getDoc } from "@firebase/firestore";

export const getDeviceFromDocumentSnapshot = async (
    documentSnapshot: DocumentSnapshot,
): Promise<Device> => {
    const { iconClass, ...rest } = documentSnapshot.data() as DeviceDocument;
    const iconClassDoc = (await getDoc(iconClass)).data() as IconClassDocument;
    return {
        id: documentSnapshot.id,
        gradientClass: iconClassDoc.gradientClass,
        textClass: iconClassDoc.textClass,
        ...rest,
    } as Device;
};

export const getColorFromDocumentSnapshot = (documentSnapshot: DocumentSnapshot): Color => {
    const colorData = documentSnapshot.data() as ColorDocument;
    return {
        id: documentSnapshot.id,
        ...colorData,
    } as Color;
};
