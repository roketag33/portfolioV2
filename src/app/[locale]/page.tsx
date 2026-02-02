import HomeClient from './PageClient';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }];
}

export default function Page() {
  return <HomeClient />
}
