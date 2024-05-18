"use server";

import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    QuerySnapshot,
    setDoc,
} from "@firebase/firestore";
import { db } from "@/libs/firebase/firebase";
import { FIREBASE } from "@/libs/firebase/constants";
import { getColorFromDocumentSnapshot } from "@/utils/firebaseUtils";
import { ColorDocument } from "@/libs/firebase/types";
import { Color } from "@/types/Color";

export const getColorFromFirebase = async (colorDocumentId: string): Promise<Color | undefined> =>
    getDoc(doc(db, FIREBASE.COLLECTION.COLORS, colorDocumentId)).then((colorDocSnapshot) => {
        if (!colorDocSnapshot.exists()) {
            return undefined;
        }
        return getColorFromDocumentSnapshot(colorDocSnapshot);
    });

export const getColorsFromFirebase = async (): Promise<Color[]> =>
    getDocs(query(collection(db, FIREBASE.COLLECTION.COLORS), orderBy("createdAt", "asc"))).then(
        (colorDocSnapshots: QuerySnapshot) =>
            Promise.all(
                colorDocSnapshots.docs.map((colorDocSnapshot) => {
                    return getColorFromDocumentSnapshot(colorDocSnapshot);
                }),
            ),
    );

/**
 * Create a new color in Firebase.
 * @returns The ID of the newly created color document.
 */
export const createColorInFirebase = async (color: string): Promise<string> =>
    addDoc(collection(db, FIREBASE.COLLECTION.COLORS), {
        hex: color,
        createdAt: Date.now(),
    }).then((colorDocRef) => colorDocRef.id);

export const updateColorInFirebase = async (
    colorId: string,
    colorDocument: ColorDocument,
): Promise<void> => {
    const existingColor = await getDoc(doc(db, FIREBASE.COLLECTION.COLORS, colorId));
    if (!existingColor.exists()) {
        throw new Error(`Attempted to update non-existent color with ID: ${colorId}`);
    }

    return setDoc(doc(db, FIREBASE.COLLECTION.COLORS, colorId), colorDocument);
};
