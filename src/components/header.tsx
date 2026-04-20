import { ArrowUpRight } from '@/lib/ui/icons';
import { Link } from '@/lib/ui/link';

export function Header() {
  return (
    <header className="border-b border-border-subtle">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <Link
          to="/"
          className="-my-1 py-1 font-display text-base tracking-wordmark text-ink-strong transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          FreeInvoice.dev
        </Link>
        <a
          href="https://github.com/jpedroschmitz/FreeInvoice.dev"
          target="_blank"
          rel="noreferrer"
          className="-my-2 inline-flex items-center gap-1.5 py-2 font-mono text-xs uppercase tracking-caps text-muted transition-colors hover:text-ink-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Source
          <ArrowUpRight />
        </a>
      </div>
    </header>
  );
}
