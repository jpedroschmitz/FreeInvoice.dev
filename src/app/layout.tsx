import './globals.css';

import { Metadata, Viewport } from 'next';
import Script from 'next/script';

import { Header } from '@/components/header';
import { isProd } from '@/utils/isProd';

export const viewport: Viewport = {
  themeColor: '#f4f4f5',
};

const pageTitle = 'FreeInvoice.dev - Simple and Free Invoice Tool. No sign-up.';
const pageDescription = `Create professional invoices effortlessly with FreeInvoice.dev. Completely free, user-friendly, and secure with client-side processing — your data stays with you.`;

export const metadata: Metadata = {
  metadataBase: new URL('https://freeinvoice.dev'),
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: 'website',
    siteName: 'FreeInvoice.dev',
    url: '/',
    images: [
      {
        alt: 'FreeInvoice.dev',
        url: '/og-image.jpg',
        width: 1200,
        height: 640,
      },
    ],
  },
  twitter: {
    title: pageTitle,
    description: pageDescription,
  },
  verification: {
    other: {
      'google-adsense-account': 'ca-pub-3117643386114963',
    },
  },
  keywords: [
    'free invoice generator',
    'online invoice maker',
    'professional invoice template',
    'VAT invoice generator',
    'PDF invoice creator',
    'business invoice generator',
    'free billing software',
    'invoice generator no sign up',
  ],
};

declare global {
  interface Window {
    plausible: (event: string, options?: { u?: string; callback?: () => void }) => void;
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="bg-white">
          <Header />
          {children}
        </main>
      </body>
      {isProd && (
        <>
          <Script
            defer
            data-domain="freeinvoice.dev"
            src="https://plausible.io/js/script.outbound-links.tagged-events.js"
          />
          <Script
            id="plausible-init"
            dangerouslySetInnerHTML={{
              __html: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`,
            }}
          />
        </>
      )}
    </html>
  );
}
