import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';

import { Header } from '@/components/header';
import { isProd } from '@/lib/isProd';

import appCss from './globals.css?url';

declare global {
  interface Window {
    posthog?: {
      capture: (name: string) => void;
    };
  }
}

const pageTitle = 'FreeInvoice.dev — Free invoice generator. No sign-up.';
const pageDescription = `Free invoice generator for freelancers and small teams. Client-side — your data never leaves your browser. Instant PDF, no sign-up.`;

const posthogSnippet = `
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init('phc_prwwSb8b5lRzv19Qbtw8XUsTD4ZtQ2i5jq4o1PJgD7U', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
  })
`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: 'oklch(99% 0.003 60)' },
      { title: pageTitle },
      { name: 'description', content: pageDescription },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: pageDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'FreeInvoice.dev' },
      { property: 'og:url', content: 'https://freeinvoice.dev/' },
      { property: 'og:image', content: 'https://freeinvoice.dev/og-image.jpg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '640' },
      { property: 'og:image:alt', content: 'FreeInvoice.dev' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: pageDescription },
      { name: 'google-adsense-account', content: 'ca-pub-3117643386114963' },
      {
        name: 'keywords',
        content:
          'free invoice generator, online invoice maker, professional invoice template, VAT invoice generator, PDF invoice creator, business invoice generator, free billing software, invoice generator no sign up',
      },
    ],
    links: [
      { rel: 'canonical', href: 'https://freeinvoice.dev/' },
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-dvh flex flex-col">
        <Header />
        <Outlet />
        {isProd && <script dangerouslySetInnerHTML={{ __html: posthogSnippet }} />}
        <Scripts />
      </body>
    </html>
  );
}
