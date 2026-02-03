import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/charts/styles.css";
import "@rainbow-me/rainbowkit/styles.css";

import "./globals.css";

import { Providers } from "./providers";
import { BackgroundCanvas } from "@/widgets/bg-gradient";
import { Header } from "@/widgets/header";
import { ErrorHandler } from "./error-handler";
import { LoaderWrapper } from "./loader-wrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Miner Front",
  description: "Dashboard for monitoring mining operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <LoaderWrapper>
          <ErrorHandler />
          <Providers>
            <Header />
            <BackgroundCanvas />
            {children}
          </Providers>
        </LoaderWrapper>
      </body>
    </html>
  );
}
