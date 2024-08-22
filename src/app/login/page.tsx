"use client";
import { Content } from "@/containers/Content";
import { LoginForm } from "@components/LoginForm";
import { Suspense } from "react";

const Login = () => {
    return (
        <Content>
            <div className="mx-auto flex h-screen w-fit flex-col justify-center">
                <Suspense>
                    <LoginForm />
                </Suspense>
            </div>
        </Content>
    );
};

export default Login;
