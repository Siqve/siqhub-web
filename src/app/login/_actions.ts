"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseService } from "@siqve/supabase-services";

const SIQHUE_PASSWORD = process.env.SIQHUE_WEB_APP_PASSWORD ?? "123";

export async function _login(formData: FormData) {
    const password = formData.get("password") as string | null;
    console.log("password", password)

    if (!password) {
        redirect("/login");
    }
    if (password !== SIQHUE_PASSWORD) {
        redirect("/login?error=0");
    }

    const { error } = await supabaseService.admin().login();
    if (error) {
        redirect("/login?error=1");
    }

    revalidatePath("/", "layout");
    redirect("/");
}
