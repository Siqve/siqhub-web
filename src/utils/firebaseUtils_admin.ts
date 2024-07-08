import getFirestoreAdmin from "@/libs/firebase/firebaseAdmin";
import { ColorDocument, DeviceDocument, IconClassDocument } from "@/libs/firebase/types";
import { Color } from "@/types/Color";
import { Device } from "@/types/Device";

export const getDeviceFromDocumentReference = async (
    documentSnapshot: FirebaseFirestore.DocumentSnapshot,
): Promise<Device> => {
    const { iconClass, ...rest } = documentSnapshot.data() as DeviceDocument;
    const iconClassDoc = (
        await getFirestoreAdmin().doc(iconClass.path).get()
    ).data() as IconClassDocument;
    return {
        id: documentSnapshot.id,
        gradientClass: iconClassDoc.gradientClass,
        textClass: iconClassDoc.textClass,
        ...rest,
    } as Device;
};

export const getColorFromDocumentSnapshot = (
    documentSnapshot: FirebaseFirestore.DocumentSnapshot,
): Color => {
    const colorData = documentSnapshot.data() as ColorDocument;
    return {
        id: documentSnapshot.id,
        ...colorData,
    } as Color;
};
