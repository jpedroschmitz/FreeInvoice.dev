import { Metadata } from 'next';

import { Link } from '@/lib/ui/link';

const pageTitle = `Privacy Policy - FreeInvoice.dev | Privacy-First Invoice Generator`;
const pageDescription = `Our privacy-first approach means your data stays in your browser. No cookies, no tracking, no data collection. Transparent analytics with Posthog`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: 'website',
    url: '/privacy',
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

export default function Privacy() {
  return (
    <div className="relative isolate pt-14">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="pt-24 sm:pt-32">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl text-center">
            Privacy Policy
          </h1>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="mx-auto max-w-2xl px-6 lg:px-8 mt-10">
        <p>
          At FreeInvoice.dev, accessible from <Link href="https://freeinvoice.dev">https://freeinvoice.dev</Link>, we
          take privacy seriously. This Privacy Policy outlines our practices regarding data handling and user privacy.
        </p>

        <h2 className="mt-12 text-2xl font-semibold text-gray-900">Our Privacy-First Approach</h2>
        <p className="mt-4">
          FreeInvoice.dev is designed with privacy at its core. All invoice generation and data processing happen
          entirely in your browser. We never store, transmit, or have access to any of your business information or
          invoice data. The entire source code is open-source and available on GitHub at{' '}
          <Link href="https://github.com/jpedroschmitz/FreeInvoice.dev">jpedroschmitz/FreeInvoice.dev</Link>.
        </p>

        <ul className="mt-4 list-disc pl-6 space-y-2">
          <li>We don&#39;t use cookies</li>
          <li>We don&#39;t store any personal data</li>
          <li>We don&#39;t process or transmit your invoice information</li>
          <li>We don&#39;t have user accounts or registration</li>
          <li>We don&#39;t track individual users</li>
        </ul>

        <h2 className="mt-12 text-2xl font-semibold text-gray-900">Analytics</h2>
        <p className="mt-4">
          We use <Link href="https://posthog.com">Posthog</Link>, a privacy-focused analytics service, to collect
          anonymous usage metrics. Posthog is GDPR, CCPA, and PECR compliant, doesn&#39;t use cookies, and doesn&#39;t
          collect any personal information.
        </p>

        <p className="mt-4">We track the following anonymous metrics:</p>
        <ul className="mt-4 list-disc pl-6 space-y-2">
          <li>Page views</li>
          <li>Unique visitors</li>
          <li>
            Anonymous event counts for features like &#34;View Sample Invoice&#34;, &#34;Create Invoice Now&#34;, and
            &#34;Download PDF&#34;
          </li>
        </ul>

        <p className="mt-4">This information helps us understand how our service is used and how we can improve it.</p>

        <h2 className="mt-12 text-2xl font-semibold text-gray-900">Data Processing Location</h2>
        <p className="mt-4">
          All invoice generation and PDF creation happen locally in your web browser. Your data never leaves your
          device. Our analytics service, Posthog, is hosted in the United States and complies with data protection
          regulations.
        </p>

        <h2 className="mt-12 text-2xl font-semibold text-gray-900">Your Rights Under GDPR</h2>
        <p className="mt-4">While we don&#39;t collect personal data, you have rights under GDPR including:</p>
        <ul className="mt-4 list-disc pl-6 space-y-2">
          <li>The right to access</li>
          <li>The right to rectification</li>
          <li>The right to erasure</li>
          <li>The right to restrict processing</li>
          <li>The right to object to processing</li>
          <li>The right to data portability</li>
        </ul>

        <h2 className="mt-12 text-2xl font-semibold text-gray-900">CCPA Privacy Rights</h2>
        <p className="mt-4">
          Under the CCPA, California consumers have specific rights regarding their personal information. As we
          don&#39;t collect personal information, these rights are automatically protected through our privacy-first
          approach.
        </p>

        <h2 className="mt-12 text-2xl font-semibold text-gray-900">Changes to This Privacy Policy</h2>
        <p className="mt-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the effective date.
        </p>

        <p className="mt-12 text-sm text-gray-500">Last updated: 09 November 2024</p>
      </div>
    </div>
  );
}
