import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Analytics } from "@vercel/analytics/react"
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { GamificationProvider } from "@/context/GamificationContext";

import Terminal from '@/components/features/Terminal'
import SpeedRunner from '@/components/features/SpeedRunner'
import { Toaster } from 'sonner'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Alexandre Sarrazin | Software Engineer & Architect",
    template: "%s | Alexandre Sarrazin"
  },
  description: "Senior Software Engineer & Architect specializing in Cloud, IoT, Mobile, and Fullstack systems. Building scalable solutions from hardware to cloud.",
  // ... other metadata
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary selection:text-primary-foreground`}
      >
        <NextIntlClientProvider messages={messages}>
          <GamificationProvider>
            <SmoothScroll>
              <Header />
              <SpeedRunner />
              <Terminal />
              {children}
              <Footer />
            </SmoothScroll>
            <Toaster />
            <Analytics />
          </GamificationProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
