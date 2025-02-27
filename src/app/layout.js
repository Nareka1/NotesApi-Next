// "use client";
import Image from "next/image";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["700", "400"],
});

export const metadata = {
  title: "The notes",
  description: "tahniah membuat Notes App",
};

export default function RootLayout({ children }) {
  return (
    <html className="dark hydrated" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased dark:bg-neutral-900`}
      >
        {children}
      </body>
    </html>
  );
}
