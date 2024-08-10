"use client";
import { _login } from "@/app/login/_actions";
import { CardListSection } from "@/containers/CardListSection";
import { Content } from "@/containers/Content";
import { useSearchParams } from "next/navigation";

const ERROR_MAPPINGS = {
    "0": "Invalid password",
    "1": "Failed to log in",
};

const Login = () => {
    const searchParams = useSearchParams();

    const path = searchParams.get("path");
    const error = searchParams.get("error");
    const errorMessage = error ? ERROR_MAPPINGS[error as keyof typeof ERROR_MAPPINGS] : undefined;

    return (
        <Content>
            <div className="mx-auto flex h-screen w-fit flex-col justify-center">
                <CardListSection title="Login">
                    <form className="flex flex-col items-center gap-3">
                        {path && <input hidden={true} id="path" name="path" value={path} />}
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                        />
                        <button
                            className="w-fit rounded-2xl p-2 text-primary shadow-[0_0_6px_1px_rgba(0,0,0,0.5)]"
                            formAction={_login}
                        >
                            Log in
                        </button>

                        <p>
                            {errorMessage && (
                                <span className="text-red-500">
                                    <strong>Error:</strong> {errorMessage}
                                </span>
                            )}
                        </p>
                    </form>
                </CardListSection>
            </div>
        </Content>
    );
};

export default Login;
