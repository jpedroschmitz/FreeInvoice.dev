import './globals.css';

import { Metadata, Viewport } from 'next';
import Script from 'next/script';

import { Header } from '@/components/header';
import { isProd } from '@/lib/isProd';

import type { PostHog } from 'posthog-js';

export const viewport: Viewport = {
  themeColor: '#f4f4f5',
};

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
    siteName: 'FreeInvoice.dev',
    url: '/',
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
  verification: {
    other: {
      'google-adsense-account': 'ca-pub-3117643386114963',
    },
  },
  keywords: [
    'free invoice generator',
    'online invoice maker',
    'professional invoice template',
    'VAT invoice generator',
    'PDF invoice creator',
    'business invoice generator',
    'free billing software',
    'invoice generator no sign up',
  ],
};

declare global {
  interface Window {
    posthog?: PostHog;
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="bg-white">
          <Header />
          {children}
        </main>
      </body>
      {isProd && (
        <Script
          id="posthog-script"
          dangerouslySetInnerHTML={{
            __html: `
              !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
              posthog.init('phc_prwwSb8b5lRzv19Qbtw8XUsTD4ZtQ2i5jq4o1PJgD7U', {
                api_host: 'https://us.i.posthog.com',
                person_profiles: 'identified_only',
              })
            `,
          }}
        />
      )}
    </html>
  );
}
