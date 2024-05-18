import { doc, onSnapshot, Unsubscribe } from "@firebase/firestore";
import { db } from "@/libs/firebase/firebase";
import { FIREBASE } from "@/libs/firebase/constants";
import { SettingsDocument } from "@/libs/firebase/types";

export const createSettingsListener = (
    onSettingsUpdated: (settings: SettingsDocument) => void,
): Unsubscribe => {
    const unsubscribe =  onSnapshot(
        doc(db, FIREBASE.COLLECTION.GENERAL.ID, FIREBASE.COLLECTION.GENERAL.SETTINGS.ID),
        (documentSnapshot) => {
            const data = documentSnapshot.data() as SettingsDocument;
            onSettingsUpdated(data);
        },
    );
    setTimeout(() => {
        unsubscribe();
    }, 1000*60*5);
    return unsubscribe;
};
