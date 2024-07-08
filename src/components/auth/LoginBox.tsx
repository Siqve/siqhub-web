"use client";
import { CardListSection } from "@/containers/CardListSection";
import { auth } from "@/libs/firebase/firebase";
import { SIQHUE_WEB_APP_AUTH_COOKIE } from "@/middleware";
import { authenticateFirebase } from "@actions/auth/authenticate";
import { setCookie } from "@actions/cookies/cookies";
import { signInWithCustomToken } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export const LoginBox = () => {
    const router = useRouter();
    const [validationMessage, setValidationMessage] = useState<string | null>(null);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const password = getPasswordFromForm(event);
        if (!password) {
            return;
        }

        // TODO Renske denne her

        const firebaseUserCredential = await authenticateFirebase(password)
            .then((response) => {
                if ("error" in response) {
                    setValidationMessage(response.error);
                    return;
                }
                return signInWithCustomToken(auth, response.firebaseCustomToken);
            })
            .catch((error: unknown) => {
                if (error instanceof Error) {
                    console.log(error.message);
                    setValidationMessage("An error occurred");
                }
            });

        // TODO: Teste getDocs i DeviceList for å se om denne login huiten faktisk gjør noge. Må finne ut koss auth faktisk hjelpe her

        if (firebaseUserCredential) {
            firebaseUserCredential.user
                .getIdToken()
                .then(async (userToken) => {
                    await setCookie(SIQHUE_WEB_APP_AUTH_COOKIE, userToken);
                    router.push("/");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    return (
        <div className="mt-40 flex justify-center">
            <CardListSection title="Password">
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <input type="password" name="password" className="bg-neutral p-2" required />
                    <button type="submit" className="rounded-xl bg-primary p-2">
                        Log in
                    </button>
                    {validationMessage && <p className="text-accent">{validationMessage}</p>}
                </form>
            </CardListSection>
        </div>
    );
};

function getPasswordFromForm(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    return formData.get("password") as string;
}
