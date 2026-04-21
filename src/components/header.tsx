import { ArrowUpRight } from '@/lib/ui/icons';
import { Link } from '@/lib/ui/link';

export function Header() {
  return (
    <header className="border-border-subtle border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <Link
          to="/"
          className="font-display tracking-wordmark text-ink-strong hover:text-accent focus-visible:outline-accent -my-1 py-1 text-base transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          FreeInvoice.dev
        </Link>
        <a
          href="https://github.com/jpedroschmitz/FreeInvoice.dev"
          target="_blank"
          rel="noreferrer"
          className="tracking-caps text-muted hover:text-ink-strong focus-visible:outline-accent -my-2 inline-flex items-center gap-1.5 py-2 font-mono text-xs uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Source
          <ArrowUpRight />
        </a>
      </div>
    </header>
  );
}
