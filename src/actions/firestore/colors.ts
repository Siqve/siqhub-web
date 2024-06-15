"use server";

import { FIRESTORE } from "@/libs/firebase/constants";
import { db } from "@/libs/firebase/firebase";
import { ColorDocument } from "@/libs/firebase/types";
import { Color } from "@/types/Color";
import { getColorFromDocumentSnapshot } from "@/utils/firebaseUtils";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    QuerySnapshot,
    setDoc,
} from "@firebase/firestore";

export const getFirstColorFromFirestore = async (): Promise<Color | undefined> =>
    getDocs(
        query(
            collection(db, FIRESTORE.COLLECTION.COLORS.ID),
            orderBy(FIRESTORE.COLLECTION.COLORS.COLUMN.CREATED_AT, "asc"),
            limit(1),
        ),
    ).then((querySnapshot: QuerySnapshot) => {
        if (querySnapshot.empty) {
            return undefined;
        }
        return getColorFromDocumentSnapshot(querySnapshot.docs[0]);
    });

export const getColorFromFirestore = async (colorDocumentId: string): Promise<Color | undefined> =>
    getDoc(doc(db, FIRESTORE.COLLECTION.COLORS.ID, colorDocumentId)).then((documentSnapshot) => {
        if (!documentSnapshot.exists()) {
            return undefined;
        }
        return getColorFromDocumentSnapshot(documentSnapshot);
    });

export const getColorsFromFirestore = async (): Promise<Color[]> =>
    getDocs(
        query(
            collection(db, FIRESTORE.COLLECTION.COLORS.ID),
            orderBy(FIRESTORE.COLLECTION.COLORS.COLUMN.CREATED_AT, "asc"),
        ),
    ).then((querySnapshot: QuerySnapshot) =>
        querySnapshot.docs.map((documentSnapshot) => {
            return getColorFromDocumentSnapshot(documentSnapshot);
        }),
    );

/**
 * Create a new color in firestore.
 * @returns The ID of the newly created color document.
 */
export const createColorInFirestore = async (color: string): Promise<string> =>
    addDoc(collection(db, FIRESTORE.COLLECTION.COLORS.ID), {
        hex: color,
        createdAt: Date.now(),
    }).then((documentReference) => documentReference.id);

export const deleteColorInFirestore = async (colorId: string) => {
    await deleteDoc(doc(db, FIRESTORE.COLLECTION.COLORS.ID, colorId));
};

export const updateColorInFirestore = async (
    colorId: string,
    colorDocument: ColorDocument,
): Promise<void> => {
    const documentSnapshot = await getDoc(doc(db, FIRESTORE.COLLECTION.COLORS.ID, colorId));
    if (!documentSnapshot.exists()) {
        throw new Error(`Attempted to update non-existent color with ID: ${colorId}`);
    }

    return setDoc(doc(db, FIRESTORE.COLLECTION.COLORS.ID, colorId), colorDocument);
};
