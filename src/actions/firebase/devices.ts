"use server";

import { FIREBASE } from "@/libs/firebase/constants";
import { db } from "@/libs/firebase/firebase";
import { Device } from "@/types/Device";
import { getDeviceFromDocumentSnapshot } from "@/utils/firebaseUtils";
import { collection, doc, getDoc, getDocs, QuerySnapshot } from "@firebase/firestore";

export const getDeviceFromFirebase = async (
    deviceDocumentId: string,
): Promise<Device | undefined> =>
    getDoc(doc(db, FIREBASE.COLLECTION.DEVICES.ID, deviceDocumentId)).then((deviceDocSnapshot) => {
        if (!deviceDocSnapshot.exists()) {
            return undefined;
        }
        return getDeviceFromDocumentSnapshot(deviceDocSnapshot);
    });

export const getDevicesFromFirebase = async (): Promise<Device[]> =>
    getDocs(collection(db, FIREBASE.COLLECTION.DEVICES.ID)).then((querySnapshot: QuerySnapshot) =>
        Promise.all(
            querySnapshot.docs.map((deviceDocSnapshot) => {
                return getDeviceFromDocumentSnapshot(deviceDocSnapshot);
            }),
        ),
    );
