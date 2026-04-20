import { Metadata } from 'next';

import { InvoiceForm } from '@/app/invoice-form';
import { Footer } from '@/components/footer';

const pageTitle = `Create invoice — FreeInvoice.dev`;
const pageDescription = `Build a professional invoice in your browser and export it as a PDF. Free, no sign-up, no data leaves your device.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/app',
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: 'website',
    url: '/app',
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
};

export default function App() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-6 py-12 lg:px-10 lg:py-16">
          <p className="font-mono text-2xs uppercase tracking-caps text-muted">
            New invoice <span aria-hidden="true" className="text-hairline">·</span> draft
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-display text-ink-strong sm:text-5xl">
            Create invoice
          </h1>

          <div className="mt-12">
            <InvoiceForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
