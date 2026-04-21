import { Link } from '@/lib/ui/link';

export function Footer() {
  return (
    <footer className="border-border-subtle border-t">
      <div className="text-2xs tracking-caps text-muted mx-auto flex max-w-6xl flex-col items-start gap-2 px-6 py-5 font-mono uppercase sm:flex-row sm:items-center sm:justify-between sm:gap-4 lg:px-10">
        <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <li>
            <Link
              to="/privacy"
              className="hover:text-ink-strong focus-visible:outline-accent -my-1 py-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
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
              className="hover:text-ink-strong focus-visible:outline-accent -my-1 py-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
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
              className="hover:text-ink-strong focus-visible:outline-accent -my-1 py-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              MIT
            </a>
          </li>
        </ul>
        <p>
          Built by{' '}
          <a
            href="https://joaopedro.dev"
            target="_blank"
            rel="noreferrer"
            className="text-ink hover:text-ink-strong focus-visible:outline-accent -my-1 py-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            João Pedro Schmitz
          </a>
        </p>
      </div>
    </footer>
  );
}
