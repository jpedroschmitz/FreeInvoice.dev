import { Metadata } from 'next';

import { Footer } from '@/components/footer';

const pageTitle = `Privacy Policy — FreeInvoice.dev`;
const pageDescription = `FreeInvoice.dev runs entirely in your browser. No cookies, no accounts, no data collection. Privacy-first by design.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: 'website',
    url: '/privacy',
    images: [
      {
        alt: 'FreeInvoice.dev',
        url: '/og-image.jpg',
        width: 1200,
        height: 640,
      },
    ],
  },
  twitter: {
    title: pageTitle,
    description: pageDescription,
  },
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold text-ink-strong">{children}</h2>;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-base leading-[1.7] text-ink">{children}</p>;
}

function List({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-2.5 text-base leading-[1.55] text-ink">{children}</ul>;
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden="true" className="font-mono text-muted">
        —
      </span>
      <span>{children}</span>
    </li>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-ink-strong underline decoration-hairline decoration-1 underline-offset-[3px] transition-colors hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      {children}
    </a>
  );
}

export default function Privacy() {
  return (
    <main className="flex flex-1 flex-col">
      <article className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-6 py-12 lg:px-10 lg:py-16">
          <div className="max-w-[65ch]">
            <p className="font-mono text-2xs uppercase tracking-caps text-muted">Policy</p>
            <h1 className="mt-3 font-display text-4xl font-medium tracking-display text-ink-strong sm:text-5xl">
              Privacy policy
            </h1>
            <p className="mt-8 text-lg leading-[1.55] text-ink">
              FreeInvoice.dev runs entirely in your browser. We don&apos;t store, transmit, or have access to your
              business information. This page describes exactly how data is handled.
            </p>

            <section className="mt-16 space-y-5">
              <SectionHeading>Our privacy-first approach</SectionHeading>
              <Paragraph>
                All invoice generation and data processing happen entirely in your browser. We never store, transmit, or
                have access to any of your business information or invoice data. The source code is open and available
                on <ExternalLink href="https://github.com/jpedroschmitz/FreeInvoice.dev">GitHub</ExternalLink>.
              </Paragraph>
              <List>
                <ListItem>We don&apos;t use cookies</ListItem>
                <ListItem>We don&apos;t store any personal data</ListItem>
                <ListItem>We don&apos;t process or transmit your invoice information</ListItem>
                <ListItem>We don&apos;t have user accounts or registration</ListItem>
                <ListItem>We don&apos;t track individual users</ListItem>
              </List>
            </section>

            <section className="mt-16 space-y-5">
              <SectionHeading>Analytics</SectionHeading>
              <Paragraph>
                We use <ExternalLink href="https://posthog.com">PostHog</ExternalLink>, a privacy-focused analytics
                service, to collect anonymous usage metrics. PostHog is GDPR, CCPA, and PECR compliant. It doesn&apos;t
                use cookies and doesn&apos;t collect personal information.
              </Paragraph>
              <Paragraph>We track the following anonymous metrics:</Paragraph>
              <List>
                <ListItem>Page views</ListItem>
                <ListItem>Unique visitors</ListItem>
                <ListItem>
                  Anonymous event counts for actions like &ldquo;View Sample Invoice&rdquo;, &ldquo;Create Invoice
                  Now&rdquo;, and &ldquo;Download PDF&rdquo;
                </ListItem>
              </List>
              <Paragraph>
                This information helps us understand how the tool is used and where it can be improved.
              </Paragraph>
            </section>

            <section className="mt-16 space-y-5">
              <SectionHeading>Data processing location</SectionHeading>
              <Paragraph>
                Invoice generation and PDF creation happen locally in your browser — your data never leaves your device.
                PostHog is hosted in the United States and complies with applicable data protection regulations.
              </Paragraph>
            </section>

            <section className="mt-16 space-y-5">
              <SectionHeading>Your rights under GDPR</SectionHeading>
              <Paragraph>
                While we don&apos;t collect personal data, you retain the following rights under GDPR:
              </Paragraph>
              <List>
                <ListItem>The right to access</ListItem>
                <ListItem>The right to rectification</ListItem>
                <ListItem>The right to erasure</ListItem>
                <ListItem>The right to restrict processing</ListItem>
                <ListItem>The right to object to processing</ListItem>
                <ListItem>The right to data portability</ListItem>
              </List>
            </section>

            <section className="mt-16 space-y-5">
              <SectionHeading>CCPA privacy rights</SectionHeading>
              <Paragraph>
                Under the CCPA, California consumers have specific rights regarding personal information. Because we
                don&apos;t collect personal information, these rights are automatically protected through our
                privacy-first approach.
              </Paragraph>
            </section>

            <section className="mt-16 space-y-5">
              <SectionHeading>Changes to this policy</SectionHeading>
              <Paragraph>
                We may update this policy from time to time. Changes will be posted to this page with an updated date
                below.
              </Paragraph>
            </section>

            <p className="mt-20 font-mono text-2xs uppercase tracking-caps text-muted">
              Last updated <span className="tabular-nums text-ink">2024-11-09</span>
            </p>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
