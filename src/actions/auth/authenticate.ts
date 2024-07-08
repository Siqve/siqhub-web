"use server";
import getFirestoreAdmin from "@/libs/firebase/firebaseAdmin";

const PASSWORD = process.env.SIQHUE_WEB_APP_PASSWORD ?? "123";

export type AuthResponse = {
    firebaseCustomToken: string;
};
export type ErrorResponse = {
    error: string;
};

export const authenticateFirebase = async (
    password: string,
): Promise<AuthResponse | ErrorResponse> => {
    console.log("Incoming request to POST /api/auth");
    if (!password) {
        console.log("No password provided");
        return { error: "No password provided" };
    }

    if (password !== PASSWORD) {
        console.log("Incorrect password provided");
        return { error: "Incorrect password" };
    }

    const firebaseCustomToken: string = await getFirestoreAdmin()
        .auth()
        .createCustomToken("String(Date.now())");
    console.log("Successfully created custom token. Sending to client");
    return { firebaseCustomToken };
};
