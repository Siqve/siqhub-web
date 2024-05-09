"use server";

import { doc, getDoc } from "@firebase/firestore";
import { db } from "@/libs/firebase/firebase";
import { Device } from "@/types/Device";
import { FIREBASE } from "@/libs/firebase/constants";
import { getDeviceFromDocumentSnapshot } from "@/utils/firebaseUtils";

export const getDeviceFromFirebase = async (
    deviceRef: string,
): Promise<Device | undefined> =>
    getDoc(doc(db, FIREBASE.COLLECTION.DEVICES, deviceRef)).then(
        (device) => {
            if (!device.exists()) {
                return undefined;
            }
            return getDeviceFromDocumentSnapshot(device);
        }
    );
