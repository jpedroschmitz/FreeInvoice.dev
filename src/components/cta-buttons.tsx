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
      <Link
        to="/app"
        onClick={() => captureEvent('Create_Invoice_Click')}
        className="group bg-accent tracking-caps text-paper hover:bg-accent-press focus-visible:outline-accent inline-flex items-center gap-3 px-5 py-3.5 font-mono text-sm font-medium uppercase transition-[background-color,transform] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]"
      >
        Create invoice
        <ArrowRight className="transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
      </Link>
      <a
        href="/invoice-example.pdf?v=2"
        onClick={() => captureEvent('Sample_Invoice_Test')}
        target="_blank"
        rel="noreferrer"
        className="text-2xs tracking-caps text-muted hover:text-ink-strong focus-visible:outline-accent -my-2 inline-flex items-center gap-1.5 py-2 font-mono uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        See the output
        <ArrowUpRight />
      </a>
    </div>
  );
}
