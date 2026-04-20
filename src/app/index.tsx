import { createFileRoute } from '@tanstack/react-router';

import { HeroCTAs } from '@/components/cta-buttons';
import { Footer } from '@/components/footer';

export const Route = createFileRoute('/')({
  component: Homepage,
});

function Homepage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="flex flex-1 flex-col justify-center">
        <div className="mx-auto w-full max-w-6xl px-6 py-12 lg:px-10 lg:py-16">
          <h1 className="font-display text-display font-medium text-ink-strong">
            <span className="block">Invoices.</span>
            <span className="block">Nothing else.</span>
          </h1>

          <p className="mt-8 max-w-[38ch] text-lg leading-[1.55] text-ink">
            Free, client-side, PDF out. Your data never leaves this tab.
          </p>

          <div className="mt-12">
            <HeroCTAs />
          </div>

          <p className="mt-16 font-mono text-2xs uppercase tracking-caps text-muted sm:mt-24">
            <span aria-hidden="true" className="text-hairline">
              └─{' '}
            </span>
            INV-0001{' '}
            <span aria-hidden="true" className="text-hairline">
              ·
            </span>{' '}
            <span className="tabular-nums">2026-04-20</span>{' '}
            <span aria-hidden="true" className="text-hairline">
              ·
            </span>{' '}
            <span className="tabular-nums">USD 1,200.00</span>{' '}
            <span aria-hidden="true" className="text-hairline">
              ·
            </span>{' '}
            <span className="text-accent">paid</span>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
