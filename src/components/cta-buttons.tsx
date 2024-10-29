'use client';

import { Link } from '@/lib/ui/link';

export function CTAButtons() {
  return (
    <>
      <Link
        href="/app"
        onClick={() => {
          if (typeof window.plausible !== 'undefined') {
            window.plausible('Create_Invoice_Click', {
              callback: () => {
                console.log('Plausible event sent: Create_Invoice_Click');
              },
            });
          }
        }}
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Create Invoice Now
      </Link>
      <Link
        href="/invoice-example.pdf"
        onClick={() => {
          if (typeof window.plausible !== 'undefined') {
            window.plausible('Sample_Invoice_Test', {
              callback: () => {
                console.log('Plausible event sent: Sample_Invoice_Test');
              },
            });
          }
        }}
        target="_blank"
        className="text-sm font-semibold leading-6 text-gray-900"
      >
        View Sample Invoice <span aria-hidden="true">→</span>
      </Link>
    </>
  );
}
