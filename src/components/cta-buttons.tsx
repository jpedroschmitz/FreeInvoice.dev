'use client';

import { ArrowRight, ArrowUpRight } from '@/lib/ui/icons';
import { Link } from '@/lib/ui/link';

function captureEvent(name: string) {
  if (typeof window !== 'undefined' && typeof window.posthog !== 'undefined') {
    window.posthog.capture(name);
  }
}

export function HeroCTAs() {
  return (
    <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
      <a
        href="/app"
        onClick={() => captureEvent('Create_Invoice_Click')}
        className="group inline-flex items-center gap-3 bg-accent px-5 py-3.5 font-mono text-sm font-medium uppercase tracking-caps text-paper transition-[background-color,transform] duration-150 ease-out hover:bg-accent-press active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Create invoice
        <ArrowRight className="transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
      </a>
      <Link
        href="/invoice-example.pdf"
        onClick={() => captureEvent('Sample_Invoice_Test')}
        target="_blank"
        className="-my-2 inline-flex items-center gap-1.5 py-2 font-mono text-2xs uppercase tracking-caps text-muted transition-colors hover:text-ink-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        See the output
        <ArrowUpRight />
      </Link>
    </div>
  );
}
