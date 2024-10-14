import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import Script from 'next/script';

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: `TypeScript starter for Next.js by João Pedro Schmitz`,
  description: `TypeScript starter for Next.js that includes all you need to build amazing apps`,
};

declare global {
  interface Window {
    plausible: (event: string, options?: { u: string }) => void;
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
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
    </html>
  );
}
