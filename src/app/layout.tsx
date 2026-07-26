import type { Metadata } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { SiteHeader } from '@/components/sections/SiteHeader';
import { SiteFooter } from '@/components/sections/SiteFooter';
import '../styles/globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '500', '600'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'House of Brusi — Bespoke Apparel & Western Wear',
  description:
    'Bespoke luxury apparel, artisan craftsmanship, and tailored Western wear.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body bg-bone text-ink antialiased flex min-h-screen flex-col">
        <SmoothScrollProvider>
          <SiteHeader />
          <div className="flex-1 pt-20">{children}</div>
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
