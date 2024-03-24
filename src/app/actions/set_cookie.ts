'use server';
import {  setCookie } from "@/managers/CookieManager";

export const setCookieAsync = async (cookie: string, data: string) => {
    setCookie(cookie, data);
};

