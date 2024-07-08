import { initializeFirebaseAdmin, isFirebaseInitialized } from "@/libs/firebase/utils";
import admin, { ServiceAccount } from "firebase-admin";

const FIREBASE_SERVICE_ACCOUNT: ServiceAccount = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_SVC_ACC_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_SVC_ACC_PRIVATE_KEY,
};

let firebaseInitializingError: string | undefined;

if (!isFirebaseInitialized()) {
    firebaseInitializingError = initializeFirebaseAdmin(FIREBASE_SERVICE_ACCOUNT);
}

const getFirestoreAdmin = () => {
    if (firebaseInitializingError) {
        throw new Error(firebaseInitializingError);
    }
    return admin;
};

export default getFirestoreAdmin;
