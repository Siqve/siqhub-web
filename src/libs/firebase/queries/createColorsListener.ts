import { FIRESTORE } from "@/libs/firebase/constants";
import { db } from "@/libs/firebase/firebase";
import { Color } from "@/types/Color";
import { getColorFromDocumentSnapshot } from "@/utils/firebaseUtils";
import { collection, onSnapshot, orderBy, query, Unsubscribe } from "@firebase/firestore";

export const createColorsListener = (onColorsUpdate: (settings: Color[]) => void): Unsubscribe => {
    const unsubscribe = onSnapshot(
        query(
            collection(db, FIRESTORE.COLLECTION.COLORS.ID),
            orderBy(FIRESTORE.COLLECTION.COLORS.COLUMN.CREATED_AT, "asc"),
        ),
        (querySnapshot) =>
            onColorsUpdate(
                querySnapshot.docs.map((documentSnapshot) => {
                    return getColorFromDocumentSnapshot(documentSnapshot);
                }),
            ),
    );
    setTimeout(
        () => {
            unsubscribe();
        },
        1000 * 60 * 5,
    );
    return unsubscribe;
};
