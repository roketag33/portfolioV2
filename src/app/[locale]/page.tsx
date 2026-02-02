import { getTranslations } from 'next-intl/server';
import HomeClient from './PageClient';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    metadataBase: new URL('https://www.alexandresarrazin.fr'),
    title: {
      default: "Alexandre Sarrazin | Ingénieur Logiciel & Architecte",
      template: "%s | Alexandre Sarrazin"
    },
    description: t('description') || "Senior Software Engineer & Architect",
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }];
}

export default function Page() {
  return <HomeClient />
}
