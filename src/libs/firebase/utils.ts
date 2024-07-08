import admin, { ServiceAccount } from "firebase-admin";

export const initializeFirebaseAdmin = (FIREBASE_SERVICE_ACCOUNT: ServiceAccount): string | undefined => {
    if (!FIREBASE_SERVICE_ACCOUNT.projectId || !FIREBASE_SERVICE_ACCOUNT.clientEmail || !FIREBASE_SERVICE_ACCOUNT.privateKey) {
        return "Firebase environment variables not set";
    }

    try {
        admin.initializeApp({
            credential: admin.credential.cert(FIREBASE_SERVICE_ACCOUNT),
        });
    } catch (error) {
        return `Failed to initialize firebase admin. ${error}`;
    }
}

export const isFirebaseInitialized = (): boolean => admin.apps.length > 0;