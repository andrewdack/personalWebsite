import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Hanken_Grotesk } from "next/font/google";
import Script from "next/script";
import { ThemeProvider, themeInitScript } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const hankenGrotesk = Hanken_Grotesk({
    variable: "--font-hanken-grotesk",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const fraunces = Fraunces({
    variable: "--font-fraunces",
    subsets: ["latin"],
});

const siteUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

const title = "Andrew Hu";
const description = "Personal site of Andrew Hu — projects, work, and contact.";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title,
    description,
    openGraph: {
        title,
        description,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${hankenGrotesk.variable} h-full antialiased`}
        >
            <body className="min-h-full bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
                <Script
                    id="theme-init"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{ __html: themeInitScript }}
                />
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
