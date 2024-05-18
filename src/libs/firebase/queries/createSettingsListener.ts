import { FIRESTORE } from "@/libs/firebase/constants";
import { db } from "@/libs/firebase/firebase";
import { SettingsDocument } from "@/libs/firebase/types";
import { doc, onSnapshot, Unsubscribe } from "@firebase/firestore";

export const createSettingsListener = (
    onSettingsUpdated: (settings: SettingsDocument) => void,
): Unsubscribe => {
    const unsubscribe = onSnapshot(
        doc(db, FIRESTORE.COLLECTION.GENERAL.ID, FIRESTORE.COLLECTION.GENERAL.SETTINGS.ID),
        (documentSnapshot) => {
            const data = documentSnapshot.data() as SettingsDocument;
            onSettingsUpdated(data);
        },
    );
    setTimeout(
        () => {
            unsubscribe();
        },
        1000 * 60 * 5,
    );
    return unsubscribe;
};
