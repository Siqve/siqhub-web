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
    getDoc(doc(db, FIREBASE.COLLECTION.COLORS.ID, colorDocumentId)).then((documentSnapshot) => {
        if (!documentSnapshot.exists()) {
            return undefined;
        }
        return getColorFromDocumentSnapshot(documentSnapshot);
    });

export const getColorsFromFirebase = async (): Promise<Color[]> =>
    getDocs(
        query(
            collection(db, FIREBASE.COLLECTION.COLORS.ID),
            orderBy(FIREBASE.COLLECTION.COLORS.COLUMN.CREATED_AT, "asc"),
        ),
    ).then((querySnapshot: QuerySnapshot) =>
        Promise.all(
            querySnapshot.docs.map((documentSnapshot) => {
                return getColorFromDocumentSnapshot(documentSnapshot);
            }),
        ),
    );

/**
 * Create a new color in Firebase.
 * @returns The ID of the newly created color document.
 */
export const createColorInFirebase = async (color: string): Promise<string> =>
    addDoc(collection(db, FIREBASE.COLLECTION.COLORS.ID), {
        hex: color,
        createdAt: Date.now(),
    }).then((documentReference) => documentReference.id);

export const updateColorInFirebase = async (
    colorId: string,
    colorDocument: ColorDocument,
): Promise<void> => {
    const documentSnapshot = await getDoc(doc(db, FIREBASE.COLLECTION.COLORS.ID, colorId));
    if (!documentSnapshot.exists()) {
        throw new Error(`Attempted to update non-existent color with ID: ${colorId}`);
    }

    return setDoc(doc(db, FIREBASE.COLLECTION.COLORS.ID, colorId), colorDocument);
};
