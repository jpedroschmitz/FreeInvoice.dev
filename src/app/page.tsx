import { LightBulbIcon } from '@heroicons/react/16/solid';
import { HomeIcon, QuestionMarkCircleIcon, SparklesIcon } from '@heroicons/react/20/solid';

import { InvoiceForm } from '@/app/invoice-form';
import { Heading, Subheading } from '@/lib/ui/heading';
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/lib/ui/navbar';
import { Sidebar, SidebarBody, SidebarHeader, SidebarItem, SidebarLabel, SidebarSection } from '@/lib/ui/sidebar';
import { SidebarLayout } from '@/lib/ui/sidebar-layout';

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
              <SidebarItem href="mailto:hey@joaopedro.dev">
                <QuestionMarkCircleIcon />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/changelog">
                <SparklesIcon />
                <SidebarLabel>Changelog</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/share-feedback">
                <LightBulbIcon />
                <SidebarLabel>Share feedback</SidebarLabel>
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
