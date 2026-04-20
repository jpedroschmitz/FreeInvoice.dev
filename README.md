# FreeInvoice.dev

Free invoice generator. Client-side, PDF out, no sign-up.

[FreeInvoice.dev](https://freeinvoice.dev) · [Issues](https://github.com/jpedroschmitz/freeinvoice.dev/issues)

## Stack

- [TanStack Start](https://tanstack.com/start) on [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Recursive](https://www.recursive.design/) via [`@fontsource-variable/recursive`](https://fontsource.org/fonts/recursive)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- [`@react-pdf/renderer`](https://react-pdf.org/)
- [Headless UI](https://headlessui.com/) for a11y primitives
- [oxlint](https://oxc.rs/docs/guide/usage/linter.html) + [oxfmt](https://oxc.rs/)
- [Playwright](https://playwright.dev/) for E2E

## Getting started

Requires Node.js 24 and pnpm 10.

```bash
pnpm install
pnpm dev
```

Opens at [http://localhost:3000](http://localhost:3000).

## Scripts

- `pnpm dev` — Vite dev server
- `pnpm build` — production build
- `pnpm start` — run the built server
- `pnpm type-check` — `tsc --noEmit`
- `pnpm lint` / `pnpm lint:fix` — oxlint
- `pnpm format` / `pnpm format:check` — oxfmt
- `pnpm test:e2e` — Playwright E2E
- `pnpm test:e2e:playwright` — Playwright with UI

## Project layout

```
src/
├── app/            TanStack Router file-based routes
├── components/     shared UI (header, footer, preview drawer, …)
├── hooks/          shared React hooks
├── lib/            validation, icons, utilities
├── router.tsx      router setup
└── routeTree.gen.ts  generated — do not edit
```

## Contributing

Issues and pull requests welcome. For anything substantial, open an issue first.

## License

MIT — see [LICENSE.md](./LICENSE.md).

---

Built by [João Pedro Schmitz](https://joaopedro.dev).
