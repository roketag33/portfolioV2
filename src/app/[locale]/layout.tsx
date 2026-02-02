import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "../globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { GamificationProvider } from "@/context/GamificationContext";

// import FeatureLoader from '@/components/layout/FeatureLoader'
import LoadingScreen from '@/components/ui/LoadingScreen'
import { Toaster } from 'sonner'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

// Hardcoded metadata to ensure static SEO generation
const metaDescriptions: Record<string, string> = {
  en: "Senior Software Engineer & Architect specializing in Cloud, IoT, Mobile and Fullstack systems. Building scalable solutions from hardware to cloud.",
  fr: "Ingénieur Logiciel Senior & Architecte spécialisé Cloud, IoT, Mobile et systèmes Fullstack. Création de solutions évolutives du hardware au cloud."
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return {
    title: {
      default: "Alexandre Sarrazin | Ingénieur Logiciel & Architecte",
      template: "%s | Alexandre Sarrazin"
    },
    metadataBase: new URL('https://www.alexandresarrazin.fr'),
    description: metaDescriptions[locale] || metaDescriptions['en'],
    keywords: ["Software Engineer", "Architect", "Fullstack", "IoT", "Cloud", "React", "Next.js", "TypeScript", "Node.js", "Freelance", "Bordeaux"],
    authors: [{ name: "Alexandre Sarrazin", url: "https://www.alexandresarrazin.fr" }],
    creator: "Alexandre Sarrazin",
    publisher: "Alexandre Sarrazin",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-icon.png',
    },
    manifest: '/manifest.json',
    openGraph: {
      title: "Alexandre Sarrazin | Ingénieur Logiciel & Architecte",
      description: metaDescriptions[locale] || metaDescriptions['en'],
      url: 'https://www.alexandresarrazin.fr',
      siteName: 'Alexandre Sarrazin Portfolio',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: locale === 'fr' ? 'en_US' : 'fr_FR',
      type: 'website',
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: 'Alexandre Sarrazin - Portfolio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: "Alexandre Sarrazin | Ingénieur Logiciel & Architecte",
      description: metaDescriptions[locale] || metaDescriptions['en'],
      creator: "@alex_sarrazin",
      images: ['/opengraph-image.png'],
    },
  };
}

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
      <head>
        <meta name="description" content={metaDescriptions[locale] || metaDescriptions['en']} />
        <link rel="canonical" href={`https://www.alexandresarrazin.fr/${locale}`} />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased selection:bg-primary selection:text-primary-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Alexandre Sarrazin',
              url: 'https://www.alexandresarrazin.fr',
              jobTitle: 'Software Engineer & Architect',
              description: 'Senior Software Engineer & Architect specializing in Cloud, IoT, Mobile, and Fullstack systems.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Bordeaux',
                addressCountry: 'FR'
              },
              sameAs: [
                'https://github.com/roketag33',
                'https://www.linkedin.com/in/alexandre-sarrazin-344b98210/'
              ]
            })
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <GamificationProvider>
            {/* <LoadingScreen /> */}
            <SmoothScroll>
              <Header />
              {/* <FeatureLoader /> */}
              {children}
              <Footer />
            </SmoothScroll>
            <Toaster />
            <Analytics />
            <SpeedInsights />
          </GamificationProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
