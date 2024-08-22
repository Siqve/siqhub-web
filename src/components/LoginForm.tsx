import { _login } from "@/app/login/_actions";
import { Card } from "@/containers/Card";
import { useSearchParams } from "next/navigation";

const ERROR_MAPPINGS = {
    "0": "Invalid password",
    "1": "Failed to log in",
};

export const LoginForm = () => {
    const searchParams = useSearchParams();

    const path = searchParams.get("path");
    const error = searchParams.get("error");
    const errorMessage = error ? ERROR_MAPPINGS[error as keyof typeof ERROR_MAPPINGS] : undefined;
    return (
        <Card>
            <div className="flex flex-col gap-4 p-3">
                <h2 className="w-fit">Log in</h2>
                <div className="flex flex-wrap gap-3">
                    <form className="flex flex-col items-center gap-3">
                        {path && (
                            <input
                                readOnly={true}
                                hidden={true}
                                id="path"
                                name="path"
                                value={path}
                            />
                        )}
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                                className="bg-background-main rounded-l shadow-[0_0_6px_1px_rgba(0,0,0,0.5)]"
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
                </div>
            </div>
        </Card>
    );
};
