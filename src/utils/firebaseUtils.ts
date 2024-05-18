import { Device } from "@/types/Device";
import { DocumentSnapshot, getDoc } from "@firebase/firestore";
import { ColorDocument, DeviceDocument, IconClassDocument } from "@/libs/firebase/types";
import { Color } from "@/types/Color";

export const getDeviceFromDocumentSnapshot = async (deviceDocSnapshot: DocumentSnapshot): Promise<Device> => {
    const { iconClass, ...rest } = deviceDocSnapshot.data() as DeviceDocument;
    const iconClassDoc = (await getDoc(iconClass)).data() as IconClassDocument;
    return {
        id: deviceDocSnapshot.id,
        gradientClass: iconClassDoc.gradientClass,
        textClass: iconClassDoc.textClass,
        ...rest,
    } as Device;
}

export const getColorFromDocumentSnapshot = async (deviceDocSnapshot: DocumentSnapshot): Promise<Color> => {
    const colorData = deviceDocSnapshot.data() as ColorDocument;
    return {
        id: deviceDocSnapshot.id,
        ...colorData,
    } as Color;
}