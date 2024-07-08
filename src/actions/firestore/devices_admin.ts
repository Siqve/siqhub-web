"use server";

import { FIRESTORE } from "@/libs/firebase/constants";
import getFirestoreAdmin from "@/libs/firebase/firebaseAdmin";
import { Device } from "@/types/Device";
import { getDeviceFromDocumentReference } from "@/utils/firebaseUtils";

export const getDeviceFromFirestore = async (
    deviceDocumentId: string,
): Promise<Device | undefined> =>
    getFirestoreAdmin()
        .collection(FIRESTORE.COLLECTION.DEVICES.ID)
        .doc(deviceDocumentId)
        .get()
        .then((documentSnapshot) => {
            if (!documentSnapshot.exists) {
                return undefined;
            }
            return getDeviceFromDocumentReference(documentSnapshot);
        });

export const getDevicesFromFirestore = async (): Promise<Device[]> =>
    getFirestoreAdmin()
        .collection(FIRESTORE.COLLECTION.DEVICES.ID)
        .listDocuments()
        .then((documentReferences) =>
            Promise.all(
                documentReferences.map((documentReference) =>
                    documentReference
                        .get()
                        .then((documentSnapshot) =>
                            getDeviceFromDocumentReference(documentSnapshot),
                        ),
                ),
            ),
        );
