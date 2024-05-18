import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ReactNode } from "react";
import "../styles/globals.css";
import "../styles/reset.css";

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SiqHue",
    description: "An LED Strip controller",
};

const RootLayout = ({
    children,
}: Readonly<{
    children: ReactNode;
}>) => {
    return (
        <html lang="en">
            <body className={roboto.className}>{children}</body>
        </html>
    );
};

export default RootLayout;
