
import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { HeaderNav } from '@/components/layout/HeaderNav';
import { getDictionary } from '@/dictionaries';
import { i18n, type Locale } from '../../../i18n.config';
import React from 'react';
import { FirebaseClientProvider } from '@/firebase';
import { ClientOnly } from '@/components/ui/client-only';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<{ title: string; description: string }> {
  const dictionary = await getDictionary(params.lang);
  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const dictionary = await getDictionary(params.lang);

  return (
    <FirebaseClientProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b">
          <Header dictionary={dictionary.header} />
          <ClientOnly>
            <HeaderNav lang={params.lang} dictionary={dictionary.headerNav} />
          </ClientOnly>
        </header>
        <main className="flex-1">{children}</main>
        <Footer dictionary={dictionary.footer} lang={params.lang} />
      </div>
      <WhatsAppButton />
      <Toaster />
    </FirebaseClientProvider>
  );
}
