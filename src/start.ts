import { createMiddleware, createStart } from '@tanstack/react-start';

const PRODUCTION_HOST = 'freeinvoice.dev';

// workers.dev and preview URLs mirror the site; keep them out of search.
const noindexOutsideProduction = createMiddleware().server(async ({ request, next }) => {
  const result = await next();
  const { response } = result;

  if (new URL(request.url).hostname === PRODUCTION_HOST) return result;
  // Router redirects carry options the start handler reads; leave them as they are.
  if (!(response instanceof Response) || (response.status >= 300 && response.status < 400)) return result;

  const headers = new Headers(response.headers);
  headers.set('X-Robots-Tag', 'noindex');
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
});

export const startInstance = createStart(() => ({
  requestMiddleware: [noindexOutsideProduction],
}));
