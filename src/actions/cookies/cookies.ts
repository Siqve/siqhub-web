'use server';
import { cookies } from "next/headers";

export const setCookie = async (key: string, value: string) => {
    cookies().set(key, value);
};
