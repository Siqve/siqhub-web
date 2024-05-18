"use server";

import { FIRESTORE } from "@/libs/firebase/constants";
import { db } from "@/libs/firebase/firebase";
import { Device } from "@/types/Device";
import { getDeviceFromDocumentSnapshot } from "@/utils/firebaseUtils";
import { collection, doc, getDoc, getDocs, QuerySnapshot } from "@firebase/firestore";

export const getDeviceFromFirestore = async (
    deviceDocumentId: string,
): Promise<Device | undefined> =>
    getDoc(doc(db, FIRESTORE.COLLECTION.DEVICES.ID, deviceDocumentId)).then((deviceDocSnapshot) => {
        if (!deviceDocSnapshot.exists()) {
            return undefined;
        }
        return getDeviceFromDocumentSnapshot(deviceDocSnapshot);
    });

export const getDevicesFromFirestore = async (): Promise<Device[]> =>
    getDocs(collection(db, FIRESTORE.COLLECTION.DEVICES.ID)).then((querySnapshot: QuerySnapshot) =>
        Promise.all(
            querySnapshot.docs.map((deviceDocSnapshot) => {
                return getDeviceFromDocumentSnapshot(deviceDocSnapshot);
            }),
        ),
    );
