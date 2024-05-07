import { Device } from "@/types/Device";
import { DocumentSnapshot, getDoc } from "@firebase/firestore";
import { DeviceDocument, IconClassDocument } from "@/libs/firebase/types";

export const getDeviceFromDocumentSnapshot = async (deviceDoc: DocumentSnapshot): Promise<Device> => {
    const { iconClass, ...rest } = deviceDoc.data() as DeviceDocument;
    const iconClassDoc = (await getDoc(iconClass)).data() as IconClassDocument;
    return {
        ...rest,
        id: deviceDoc.id,
        gradientClass: iconClassDoc.gradientClass,
        textClass: iconClassDoc.textClass,
    } as Device;
}