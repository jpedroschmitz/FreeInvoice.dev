import './globals.css';

import { LightBulbIcon } from '@heroicons/react/16/solid';
import { HomeIcon } from '@heroicons/react/20/solid';
import { Viewport } from 'next';
import Script from 'next/script';

import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/lib/ui/navbar';
import { Sidebar, SidebarBody, SidebarHeader, SidebarItem, SidebarLabel, SidebarSection } from '@/lib/ui/sidebar';
import { SidebarLayout } from '@/lib/ui/sidebar-layout';

export const viewport: Viewport = {
  themeColor: '#f4f4f5',
};

declare global {
  interface Window {
    plausible: (event: string, options?: { u?: string; callback?: () => void }) => void;
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-100 dark:bg-zink-900">
        <SidebarLayout
          navbar={
            <Navbar>
              <NavbarSpacer />
              <NavbarSection>
                <NavbarItem href="/">
                  FreeInvoice.dev
                  {/*<Avatar src="/profile-photo.jpg" square />*/}
                </NavbarItem>
              </NavbarSection>
            </Navbar>
          }
          sidebar={
            <Sidebar>
              <SidebarHeader>
                <SidebarLabel className="hidden lg:block">FreeInvoice.dev</SidebarLabel>
              </SidebarHeader>
              <SidebarBody>
                <SidebarSection>
                  <SidebarItem href="/">
                    <HomeIcon />
                    <SidebarLabel>Home</SidebarLabel>
                  </SidebarItem>
                  <SidebarItem href="https://tally.so/r/wQJqag">
                    <LightBulbIcon />
                    <SidebarLabel>Feedback</SidebarLabel>
                  </SidebarItem>
                </SidebarSection>
                {/*<SidebarSection className="max-lg:hidden">*/}
                {/*  <SidebarHeading>Advertisement</SidebarHeading>*/}
                {/*</SidebarSection>*/}
              </SidebarBody>
            </Sidebar>
          }
        >
          {children}
        </SidebarLayout>
      </body>
      {process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production' && (
        <>
          <Script
            defer
            data-domain="freeinvoice.dev"
            src="https://plausible.io/js/script.outbound-links.tagged-events.js"
          />
          <Script
            id="plausible-init"
            dangerouslySetInnerHTML={{
              __html: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`,
            }}
          />
        </>
      )}
    </html>
  );
}
