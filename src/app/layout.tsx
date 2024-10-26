import './globals.css';

import { Metadata, Viewport } from 'next';
import Script from 'next/script';

import { Header } from '@/components/header';

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
    url: '/',
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
      {process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production' && (
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
