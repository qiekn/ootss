import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono, Cormorant } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const titleFont = localFont({
  src: [
    {
      path: "../public/fonts/KarminaReg.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/KarminaBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/KarminaBoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-karmina",
});

export const metadata: Metadata = {
  title: "OOTSS Wiki",
  description: "Order of the Sinking Star Wiki",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${titleFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
