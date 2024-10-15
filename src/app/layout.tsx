import { Inter } from 'next/font/google';

import './globals.css';

import Script from 'next/script';

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-sans',
});

declare global {
  interface Window {
    plausible: (event: string, options?: { u?: string; callback?: () => void }) => void;
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
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
