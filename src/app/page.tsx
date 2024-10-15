import { LightBulbIcon } from '@heroicons/react/16/solid';
import { HomeIcon } from '@heroicons/react/20/solid';
import { Metadata } from 'next';

import { InvoiceForm } from '@/app/invoice-form';
import { Heading, Subheading } from '@/lib/ui/heading';
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/lib/ui/navbar';
import { Sidebar, SidebarBody, SidebarHeader, SidebarItem, SidebarLabel, SidebarSection } from '@/lib/ui/sidebar';
import { SidebarLayout } from '@/lib/ui/sidebar-layout';

const pageTitle = 'FreeInvoice.dev - Simple and Free Invoice Tool. No sign-up.';
const pageDescription = `Create professional invoices effortlessly with FreeInvoice.dev. Completely free, user-friendly, and secure with client-side processing — your data stays with you.`;

export const metadata: Metadata = {
  metadataBase: new URL('https://freeinvoice.dev'),
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: 'website',
    url: '/',
  },
  twitter: {
    title: pageTitle,
    description: pageDescription,
  },
};

export default function Homepage() {
  return (
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
      <Heading>FreeInvoice.dev</Heading>
      <Subheading className="mt-2">Effortless, Beautiful Invoicing — Free, Secure, and No Tracking.</Subheading>

      <div className="mt-10">
        <InvoiceForm />
      </div>
    </SidebarLayout>
  );
}
