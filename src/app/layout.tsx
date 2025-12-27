import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
  keywords: ["Software Engineer", "Solutions Architect", "Fullstack", "IoT", "Cloud Computing", "DevOps", "Mobile Development", "React", "Node.js"],
  authors: [{ name: "Alexandre Sarrazin", url: "https://roketag.com" }],
  creator: "Alexandre Sarrazin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://roketag.com",
    title: "Alexandre Sarrazin | Software Engineer & Architect",
    description: "Senior Software Engineer & Architect specializing in Cloud, IoT, Mobile, and Fullstack systems.",
    siteName: "Alexandre Sarrazin Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Needs to be added to public later or generated
        width: 1200,
        height: 630,
        alt: "Alexandre Sarrazin Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexandre Sarrazin | Software Engineer & Architect",
    description: "Senior Software Engineer & Architect specializing in Cloud, IoT, Mobile, and Fullstack systems.",
    // images: ["/twitter-image.jpg"],
    creator: "@roketag", // Placeholder
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://roketag.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary selection:text-primary-foreground`}
      >
        <GamificationProvider>
          <SmoothScroll>
            <Header />
            <SpeedRunner />
            <Terminal />
            {children}
            <Footer />
          </SmoothScroll>
          <Toaster />
        </GamificationProvider>
      </body>
    </html>
  );
}
