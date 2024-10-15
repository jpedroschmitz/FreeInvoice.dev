import { Metadata } from 'next';

import { InvoiceForm } from '@/app/invoice-form';
import { Heading, Subheading } from '@/lib/ui/heading';

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

export default function Homepage() {
  return (
    <main>
      <Heading>FreeInvoice.dev</Heading>
      <Subheading className="mt-2">Effortless, Beautiful Invoicing — Free, Secure, and No Tracking.</Subheading>

      <div className="mt-10">
        <InvoiceForm />
      </div>
    </main>
  );
}
