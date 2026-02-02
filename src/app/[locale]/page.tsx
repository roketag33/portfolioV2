import HomeClient from './PageClient';

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
      canonical: 'https://www.alexandresarrazin.fr',
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
