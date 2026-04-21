import { Drawer } from '@base-ui/react/drawer';

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
    <Drawer.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
      swipeDirection="right"
    >
      <Drawer.Portal>
        <Drawer.Backdrop className="bg-ink-strong/25 fixed inset-0 opacity-[calc(1-var(--drawer-swipe-progress))] transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:opacity-0 data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-[starting-style]:opacity-0 data-[swiping]:duration-0" />
        <Drawer.Viewport className="fixed inset-0 flex items-stretch justify-end">
          <Drawer.Popup className="border-border-subtle bg-paper relative flex h-full w-full transform-[translateX(var(--drawer-swipe-movement-x))] flex-col border-l transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] outline-none data-[ending-style]:[transform:translateX(100%)] data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-[starting-style]:[transform:translateX(100%)] data-[swiping]:select-none md:w-1/2">
            <header className="border-border-subtle flex items-center justify-between border-b px-6 py-4">
              <Drawer.Title className="tracking-caps text-muted font-mono text-xs font-normal uppercase">
                Preview
              </Drawer.Title>
              <Drawer.Close
                aria-label="Close preview"
                className="tracking-caps text-muted hover:text-ink-strong focus-visible:outline-accent -my-2 py-2 font-mono text-xs uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                Close
              </Drawer.Close>
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
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
