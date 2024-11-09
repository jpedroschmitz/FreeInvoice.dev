'use client';

import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { ArrowUpRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Link } from '@/lib/ui/link';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Privacy', href: '/privacy' },
  { name: 'Feedback', href: 'https://tally.so/r/wQJqag' },
  { name: 'GitHub', href: 'https://github.com/jpedroschmitz/FreeInvoice.dev' },
];

export function Header() {
  const params = useParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [params]);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <Link href="/" className="-m-1.5 p-1.5 font-semibold">
          FreeInvoice.dev
        </Link>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-2"
            >
              {item.name}
              {item.href.startsWith('http') ? (
                <ArrowUpRightIcon aria-hidden="true" className="size-3 shrink-0" />
              ) : null}
            </a>
          ))}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 font-semibold">
              FreeInvoice.dev
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    className="-mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-2"
                  >
                    {item.name}
                    {item.href.startsWith('http') ? (
                      <ArrowUpRightIcon aria-hidden="true" className="size-4 shrink-0" />
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
