'use client';

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
      <div aria-hidden="true" className="fixed inset-0 bg-ink-strong/25" />

      <div className="fixed inset-0 flex justify-end">
        <DialogPanel className="relative flex h-full w-full flex-col border-l border-border-subtle bg-paper md:w-[min(640px,60vw)]">
          <header className="flex items-center justify-between border-b border-border-subtle px-6 py-4">
            <p className="font-mono text-xs uppercase tracking-caps text-muted">Preview</p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="-my-2 py-2 font-mono text-xs uppercase tracking-caps text-muted transition-colors hover:text-ink-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Close
            </button>
          </header>

          <div className="flex-1 overflow-hidden bg-paper-elev">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <p className="font-mono text-xs uppercase tracking-caps text-muted">Rendering…</p>
              </div>
            ) : pdfUrl ? (
              <iframe src={pdfUrl} title="Invoice preview" className="h-full w-full border-0" />
            ) : null}
          </div>

          <footer className="flex items-center justify-end border-t border-border-subtle px-6 py-4">
            <button
              type="button"
              onClick={onDownload}
              disabled={loading || downloading}
              className="inline-flex items-center gap-3 bg-accent px-5 py-3.5 font-mono text-sm font-medium uppercase tracking-caps text-paper transition-[background-color,transform] duration-150 ease-out hover:bg-accent-press active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50"
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
