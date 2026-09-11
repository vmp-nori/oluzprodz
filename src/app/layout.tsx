import type { Metadata, Viewport } from "next";
import { Archivo, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-label",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OluProdz | Sports Photographer & Videographer",
  description:
    "The sports photography and short-form video portfolio of Oluwasegun Ogunjobi.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d0d0f",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
