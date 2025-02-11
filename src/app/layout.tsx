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
    title: "SiqHub",
    description: "A smart hub for your smart home",
};

const RootLayout = ({
    children,
}: Readonly<{
    children: ReactNode;
}>) => {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <main>{children}</main>
            </body>
        </html>
    );
};

export default RootLayout;
