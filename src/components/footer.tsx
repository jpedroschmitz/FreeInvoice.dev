import { Link } from '@/lib/ui/link';

export function Footer() {
  return (
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
  );
}
