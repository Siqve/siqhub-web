"use server";

import { FIRESTORE } from "@/libs/firebase/constants";
import { db } from "@/libs/firebase/firebase";
import { SettingsDocument } from "@/libs/firebase/types";
import { doc, getDoc, setDoc } from "@firebase/firestore";

const GENERAL = FIRESTORE.COLLECTION.GENERAL;

export const getSettingsInFirestore = async (): Promise<SettingsDocument | undefined> =>
    getDoc(doc(db, GENERAL.ID, GENERAL.SETTINGS.ID)).then((documentSnapshot) => {
        return documentSnapshot.data() as SettingsDocument;
    });

export const updateSettingsInFirestore = async (
    settingsDocument: SettingsDocument,
): Promise<void> => {
    return setDoc(doc(db, GENERAL.ID, GENERAL.SETTINGS.ID), settingsDocument);
};
