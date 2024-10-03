"use server";
import { supabaseService } from "@siqve/supabase-services";
import { redirect } from "next/navigation";

const SIQHUB_PASSWORD = process.env.SIQHUB_WEB_APP_PASSWORD ?? "123";

export async function _login(formData: FormData) {
    const password = formData.get("password") as string | null;
    const path = formData.get("path") as string | null;

    if (!password) {
        redirect(`/login${path ? `&path=${path}` : ""}`);
    }
    if (password !== SIQHUB_PASSWORD) {
        errorRedirect(0, path);
    }

    const { error } = await supabaseService.admin().login();
    if (error) {
        errorRedirect(1, path);
    }

    redirect(path ? atob(path) : "/");
}

function errorRedirect(errorCode: number, path: string | null) {
    redirect(`/login?error=${errorCode}${path ? `&path=${path}` : ""}`);
}
