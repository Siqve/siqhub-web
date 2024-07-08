"use server";

import { FIRESTORE } from "@/libs/firebase/constants";
import getFirestoreAdmin from "@/libs/firebase/firebaseAdmin";
import { Color } from "@/types/Color";
import { getColorFromDocumentSnapshot } from "@/utils/firebaseUtils";

export const getFirstColorFromFirestore = async (): Promise<Color | undefined> =>
    getFirestoreAdmin()
        .collectionGroup(FIRESTORE.COLLECTION.COLORS.ID)
        .orderBy("createdAt", "asc")
        .limit(1)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                return undefined;
            }
            return getColorFromDocumentSnapshot(querySnapshot.docs[0]);
        });

export const getColorFromFirestore = async (colorDocumentId: string): Promise<Color | undefined> =>
    getFirestoreAdmin()
        .collection(FIRESTORE.COLLECTION.COLORS.ID)
        .doc(colorDocumentId)
        .get()
        .then((documentSnapshot) => {
            if (!documentSnapshot.exists) {
                return undefined;
            }
            return getColorFromDocumentSnapshot(documentSnapshot);
        });

export const getColorsFromFirestore = async (): Promise<Color[]> =>
    getFirestoreAdmin()
        .collectionGroup(FIRESTORE.COLLECTION.COLORS.ID)
        .orderBy("createdAt", "asc")
        .get()
        .then((querySnapshot) =>
            querySnapshot.docs.map((documentSnapshot) => {
                return getColorFromDocumentSnapshot(documentSnapshot);
            }),
        );

/**
 * Create a new color in firestore.
 * @returns The ID of the newly created color document.
 */
export const createColorInFirestore = async (color: string): Promise<string> =>
    getFirestoreAdmin()
        .collection(FIRESTORE.COLLECTION.COLORS.ID)
        .add({
            hex: color,
            createdAt: Date.now(),
        })
        .then((documentReference) => documentReference.id);

export const deleteColorInFirestore = async (colorId: string) => {
    await getFirestoreAdmin().collection(FIRESTORE.COLLECTION.COLORS.ID).doc(colorId).delete();
};

export const updateColorInFirestore = async (colorId: string, colorHex: string): Promise<void> => {
    const documentReference = await getFirestoreAdmin()
        .collection(FIRESTORE.COLLECTION.COLORS.ID)
        .doc(colorId)
        .get();
    if (!documentReference.exists) {
        throw new Error(`Attempted to update non-existent color with ID: ${colorId}`);
    }

    await getFirestoreAdmin().collection(FIRESTORE.COLLECTION.COLORS.ID).doc(colorId).update({
        hex: colorHex,
    });
};
