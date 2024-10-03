import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import {Suspense} from "react";
import SplashScreen from "@/components/SplashScreen/SplashScreen";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Test-next-telegram",
  description: "Test-next-telegram",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-4 bg-white`}
      >
      <Navbar/>
      <Suspense fallback={<SplashScreen/>}>
      <main>
        {children}
      </main>
      </Suspense>
      </body>
    </html>
  );
}
