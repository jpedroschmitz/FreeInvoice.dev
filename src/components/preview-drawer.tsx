import { Dialog, DialogPanel } from '@headlessui/react';

import { ArrowRight } from '@/lib/ui/icons';

type Props = {
  open: boolean;
  loading: boolean;
  pdfUrl: string | null;
  onClose: () => void;
  onDownload: () => void;
  downloading: boolean;
};

export function PreviewDrawer({ open, loading, pdfUrl, onClose, onDownload, downloading }: Props) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div aria-hidden="true" className="bg-ink-strong/25 fixed inset-0" />

      <div className="fixed inset-0 flex justify-end">
        <DialogPanel className="border-border-subtle bg-paper relative flex h-full w-full flex-col border-l md:w-[min(640px,60vw)]">
          <header className="border-border-subtle flex items-center justify-between border-b px-6 py-4">
            <p className="tracking-caps text-muted font-mono text-xs uppercase">Preview</p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="tracking-caps text-muted hover:text-ink-strong focus-visible:outline-accent -my-2 py-2 font-mono text-xs uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Close
            </button>
          </header>

          <div className="bg-paper-elev flex-1 overflow-hidden">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <p className="tracking-caps text-muted font-mono text-xs uppercase">Rendering…</p>
              </div>
            ) : pdfUrl ? (
              <iframe src={pdfUrl} title="Invoice preview" className="h-full w-full border-0" />
            ) : null}
          </div>

          <footer className="border-border-subtle flex items-center justify-end border-t px-6 py-4">
            <button
              type="button"
              onClick={onDownload}
              disabled={loading || downloading}
              className="bg-accent tracking-caps text-paper hover:bg-accent-press focus-visible:outline-accent inline-flex items-center gap-3 px-5 py-3.5 font-mono text-sm font-medium uppercase transition-[background-color,transform] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
            >
              {downloading ? 'Preparing…' : 'Download PDF'}
              <ArrowRight />
            </button>
          </footer>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
