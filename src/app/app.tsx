import { createFileRoute } from '@tanstack/react-router';

import { InvoiceForm } from '@/components/invoice-form';
import { Footer } from '@/components/footer';

const pageTitle = `Create invoice — FreeInvoice.dev`;
const pageDescription = `Build a professional invoice in your browser and export it as a PDF. Free, no sign-up, no data leaves your device.`;

export const Route = createFileRoute('/app')({
  component: App,
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: 'description', content: pageDescription },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: pageDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://freeinvoice.dev/app' },
      { property: 'og:image', content: 'https://freeinvoice.dev/og-image.jpg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '640' },
      { property: 'og:image:alt', content: 'FreeInvoice.dev' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: pageDescription },
    ],
    links: [{ rel: 'canonical', href: 'https://freeinvoice.dev/app' }],
  }),
});

function App() {
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
