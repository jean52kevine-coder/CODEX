import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { PremiumLayout } from '@/components/PremiumLayout';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Altéra — Agence digitale premium',
  description:
    'Création et maintenance de sites web ultra premium, performants et orientés conversion pour entreprises ambitieuses.',
  metadataBase: new URL('https://altera.agency'),
  openGraph: {
    title: 'Altéra — Agence digitale premium',
    description: 'Des sites web ultra premium. Sans le prix ultra premium.',
    type: 'website',
    url: 'https://altera.agency',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <PremiumLayout>{children}</PremiumLayout>
      </body>
    </html>
  );
}
