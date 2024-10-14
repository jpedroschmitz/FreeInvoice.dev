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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
      <Script
        defer
        data-domain="freeinvoice.dev"
        src="https://plausible.io/js/script.outbound-links.pageview-props.js"
      />
    </html>
  );
}
