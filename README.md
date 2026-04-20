# FreeInvoice.dev

Create unlimited professional invoices without signing up or paying anything. Your data stays in your browser, making it completely secure and private. Start invoicing immediately with our free, simple tool.

[View Demo](https://freeinvoice.dev) · [Report Bug](https://github.com/jpedroschmitz/freeinvoice.dev/issues) · [Request Feature](https://github.com/jpedroschmitz/freeinvoice.dev/issues)

## 🌟 Features

- **Always Free** - No hidden costs, no premium features, no subscription fees
- **Private & Secure** - Client-side processing, no data storage
- **No Registration** - Start creating invoices immediately
- **Instant PDF Export** - Download professional PDFs with one click
- **Global Currencies** - Support for USD, EUR, GBP, AUD, CAD, and more
- **VAT Support** - Include VAT IDs and tax information

## 🚀 Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [@react-pdf/renderer](https://react-pdf.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)
- [@headlessui/react](https://headlessui.com/)
- [@heroicons/react](https://heroicons.com/)

## 📁 Directory Structure

```
FreeInvoice.dev/
├── .github/              # GitHub workflows
├── .husky/               # Husky hooks
├── public/               # Static assets
├── src/                  # Source code directory
│   ├── app/               # Next.js app
│   ├── components/        # Reusable components
│   ├── lib/               # Utility functions and shared UI code
└── tests/                # E2E tests
```

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 24
- pnpm 10

### Installation

1. Clone the repository

2. Install dependencies

```bash
pnpm install
```

3. Start the development server

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Create an optimized production build
- `pnpm build:analyze` - Build with bundle analysis
- `pnpm start` - Start the production server
- `pnpm test:e2e` - Run end-to-end tests with Playwright
- `pnpm test:e2e:playwright` - Run Playwright tests with UI
- `pnpm type-check` - Run TypeScript compiler check
- `pnpm lint` - Run ESLint on source files
- `pnpm format` - Format source files with Prettier

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [João Pedro](https://github.com/jpedroschmitz)
