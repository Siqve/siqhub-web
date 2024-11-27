"use server";
import { cookies } from "next/headers";

export const setCookie = async (key: string, value: string) => {
    (await cookies()).set(key, value);
};
