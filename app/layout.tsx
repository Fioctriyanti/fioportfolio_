import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display, Geist } from "next/font/google"; // MODIFIKASI 1: Memperbaiki import bawaan Next.js
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// MODIFIKASI 2: Konfigurasi Playfair Display yang benar
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500", "700"],
  variable: "--font-safira-style",
  display: "swap",
});

const poppins = localFont({
  src: [
    { path: "../public/fonts/poppins-300.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/poppins-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/poppins-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: [
    { path: "../public/fonts/jbmono-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/jbmono-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fio Octriyanti — Data Science Undergraduate",
  description:
    "Data Science undergraduate at UNESA specializing in machine learning, NLP, and data analytics. Google Student Ambassador. Available for internships.",
  keywords: [
    "Data Science",
    "Machine Learning",
    "NLP",
    "Indonesia",
    "UNESA",
    "Python",
    "Surabaya",
  ],
  openGraph: {
    title: "Fio Octriyanti — Data Science Undergraduate",
    description:
      "Turning raw data into clear, human decisions. Machine learning, NLP, and analytics.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      {/* MODIFIKASI 3: Memasukkan playfair.variable ke dalam className body */}
      <body className={`${poppins.variable} ${jetbrainsMono.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}