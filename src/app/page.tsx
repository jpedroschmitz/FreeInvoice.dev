import { HeroCTAs } from '@/components/cta-buttons';
import { Link } from '@/lib/ui/link';

export default function Homepage() {
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

      <footer className="border-t border-border-subtle">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-2 px-6 py-5 font-mono text-2xs uppercase tracking-caps text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-4 lg:px-10">
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <li>
              <Link
                href="/privacy"
                className="-my-1 py-1 transition-colors hover:text-ink-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Privacy
              </Link>
            </li>
            <li aria-hidden="true" className="text-hairline">
              ·
            </li>
            <li>
              <a
                href="https://github.com/jpedroschmitz/FreeInvoice.dev"
                target="_blank"
                rel="noreferrer"
                className="-my-1 py-1 transition-colors hover:text-ink-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Source
              </a>
            </li>
            <li aria-hidden="true" className="text-hairline">
              ·
            </li>
            <li>
              <a
                href="https://github.com/jpedroschmitz/FreeInvoice.dev/blob/main/LICENSE.md"
                target="_blank"
                rel="noreferrer"
                className="-my-1 py-1 transition-colors hover:text-ink-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                MIT
              </a>
            </li>
          </ul>
          <p>
            Built by{' '}
            <Link
              href="https://joaopedro.dev"
              className="-my-1 py-1 text-ink transition-colors hover:text-ink-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              João Pedro Schmitz
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
}
