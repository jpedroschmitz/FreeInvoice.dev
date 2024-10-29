import { Metadata } from 'next';

import { InvoiceForm } from '@/app/invoice-form';

const pageTitle = `Free Invoice Generator | Create Professional Invoices Online - FreeInvoice.dev`;
const pageDescription = `Create and download professional invoices instantly. Free invoice generator with VAT support, multiple currencies, and PDF export. No sign-up required, no hidden costs.`;

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
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Create Invoice</h1>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-3xl sm:mt-20">
        <InvoiceForm />
      </div>
    </div>
  );
}
