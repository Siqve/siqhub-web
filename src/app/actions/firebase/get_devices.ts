"use server";

import { collection, getDocs, QuerySnapshot } from "@firebase/firestore";
import { db } from "@/libs/firebase/firebase";
import { Device } from "@/types/Device";
import { FIREBASE } from "@/libs/firebase/constants";
import { getDeviceFromDocumentSnapshot } from "@/utils/firebaseUtils";

export const getDevicesFromFirebase = async (): Promise<Device[]> =>
    getDocs(collection(db, FIREBASE.COLLECTION.DEVICES)).then(
        (querySnapshot: QuerySnapshot) =>
            Promise.all(
                querySnapshot.docs.map((deviceDocument) => {
                    return getDeviceFromDocumentSnapshot(deviceDocument);
                }),
            ),
    );
