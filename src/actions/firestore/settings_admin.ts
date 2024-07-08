"use server";

import { FIRESTORE } from "@/libs/firebase/constants";
import getFirestoreAdmin from "@/libs/firebase/firebaseAdmin";
import { SettingsDocument } from "@/libs/firebase/types";
import { getFirstColorFromFirestore } from "@actions/firestore/colors";

const GENERAL = FIRESTORE.COLLECTION.GENERAL;

export const getSettingsInFirestore = async (): Promise<SettingsDocument | undefined> =>
    getFirestoreAdmin()
        .collection(GENERAL.ID)
        .doc(GENERAL.SETTINGS.ID)
        .get()
        .then((documentSnapshot) => documentSnapshot.data() as SettingsDocument);

export const updateSettingsInFirestore = async (
    settingsDocument: SettingsDocument,
): Promise<void> => {
    await getFirestoreAdmin().collection(GENERAL.ID).doc(GENERAL.SETTINGS.ID).update({
        settingsDocument,
    });
};

export const resetActiveColorInFirestore = async (): Promise<void> => {
    const firstColor = await getFirstColorFromFirestore();
    await getFirestoreAdmin()
        .collection(GENERAL.ID)
        .doc(GENERAL.SETTINGS.ID)
        .update({
            activeColorId: firstColor?.id ?? "undefined",
        });
};
