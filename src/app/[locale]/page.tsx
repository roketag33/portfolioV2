import HomeClient from './PageClient';

// Force static generation to ensure metadata is in HTML, not streamed
export const dynamic = 'force-static';

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
    title: "Alexandre Sarrazin | Ingénieur Logiciel & Architecte",
    description: metaDescriptions[locale] || metaDescriptions['en'],
    alternates: {
      canonical: locale === 'en' ? 'https://www.alexandresarrazin.fr/en' : `https://www.alexandresarrazin.fr/${locale}`,
      languages: {
        'en': 'https://www.alexandresarrazin.fr/en',
        'fr': 'https://www.alexandresarrazin.fr/fr',
      },
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }];
}

export default function Page() {
  return <HomeClient />
}
