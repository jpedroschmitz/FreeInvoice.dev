import {
  CheckCircleIcon,
  CloudArrowDownIcon,
  CurrencyDollarIcon,
  DocumentCheckIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  UserPlusIcon,
} from '@heroicons/react/20/solid';

import { CTAButtons } from '@/components/cta-buttons';
import { Link } from '@/lib/ui/link';

const features = [
  {
    name: 'Always Free',
    description:
      'Create unlimited professional invoices without any costs. No premium features, no subscription fees, and no hidden charges - everything is completely free.',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Private & Secure',
    description:
      'All data processing happens in your browser. We never store, transmit, or access your business information. Your sensitive data stays with you.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'No Registration',
    description:
      'Start creating invoices immediately. Skip the tedious sign-up process - no email verification, no account creation, no passwords to remember.',
    icon: UserPlusIcon,
  },
  {
    name: 'Instant PDF Export',
    description:
      'Download your professional invoice as a PDF with one click. Perfect for sending to clients or keeping for your records.',
    icon: CloudArrowDownIcon,
  },
  {
    name: 'Global Currencies',
    description:
      'Support for USD, EUR, GBP, AUD, CAD and more. Automatic formatting and currency symbol handling for professional presentation.',
    icon: GlobeAltIcon,
  },
  {
    name: 'VAT Support',
    description:
      'Include your VAT ID and customize tax information. Perfect for businesses in the EU and international trade requiring tax documentation.',
    icon: DocumentCheckIcon,
  },
];

export default function Homepage() {
  return (
    <>
      <div className="relative isolate pt-14">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                Professional Invoices in Seconds
              </h1>
              <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                Create unlimited professional invoices without signing up or paying anything. Your data stays in your
                browser, making it completely secure and private. Start invoicing immediately with our free, simple
                tool.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <CTAButtons />
              </div>
            </div>
            {/*<div className="mt-16 flow-root sm:mt-24">*/}
            {/*  <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">*/}
            {/*    <img*/}
            {/*      alt="App screenshot"*/}
            {/*      src="https://tailwindui.com/plus/img/component-images/project-app-screenshot.png"*/}
            {/*      width={2432}*/}
            {/*      height={1442}*/}
            {/*      className="rounded-md shadow-2xl ring-1 ring-gray-900/10"*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <feature.icon aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
                {feature.name}
              </dt>{' '}
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="bg-white px-6 py-32 lg:px-8" id="about">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <p className="text-base font-semibold leading-7 text-indigo-600">Why Choose FreeInvoice.dev</p>
          <h2 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Professional Invoicing Made Simple
          </h2>
          <h3 className="mt-6 text-xl leading-8">
            In today&#39;s digital world, creating professional invoices shouldn&#39;t be complicated or expensive.
            We&#39;ve built the simplest way for freelancers and small businesses to create professional invoices
            instantly.
          </h3>
          <div className="mt-10 max-w-2xl">
            <p>
              Whether you&#39;re a freelance designer, developer, consultant, or running a small business, our platform
              adapts to your needs. Add your company details, customize payment terms, and maintain a professional image
              with your clients - all without signing up or paying a cent.
            </p>
            <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <CheckCircleIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                <span>
                  <strong className="font-semibold text-gray-900">Complete Privacy.</strong> Your data never leaves your
                  browser. We don&#39;t store, track, or transmit any of your business information.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                <span>
                  <strong className="font-semibold text-gray-900">Professional Templates.</strong> Create beautiful,
                  customizable invoices that reflect your brand and meet international billing standards.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                <span>
                  <strong className="font-semibold text-gray-900">Instant PDF Export.</strong> Download your
                  professionally formatted invoices immediately, ready to send to clients.
                </span>
              </li>
            </ul>
            {/*<p className="mt-8">*/}
            {/*  Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie auctor*/}
            {/*  fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac*/}
            {/*  adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.*/}
            {/*</p>*/}
            {/*<h2 className="mt-16 text-pretty text-3xl font-semibold tracking-tight text-gray-900">*/}
            {/*  From beginner to expert in 3 hours*/}
            {/*</h2>*/}
            {/*<p className="mt-6">*/}
            {/*  Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum urna nibh.*/}
            {/*  Pharetra, euismod vitae interdum mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed*/}
            {/*  tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi. Pellentesque nam sed nullam sed diam*/}
            {/*  turpis ipsum eu a sed convallis diam.*/}
            {/*</p>*/}
            {/*<figure className="mt-10 border-l border-indigo-600 pl-9">*/}
            {/*  <blockquote className="font-semibold text-gray-900">*/}
            {/*    <p>*/}
            {/*      &#34;Finally, a simple invoice generator that doesn&#39;t require signing up for yet another service.*/}
            {/*      Perfect for my freelance work. The fact that it&#39;s completely free and processes everything in my*/}
            {/*      browser gives me peace of mind.&#34;*/}
            {/*    </p>*/}
            {/*  </blockquote>*/}
            {/*  <figcaption className="mt-6 flex gap-x-4">*/}
            {/*    <div className="text-sm leading-6">*/}
            {/*      <strong className="font-semibold text-gray-900">David Chen</strong> – Independent Developer*/}
            {/*    </div>*/}
            {/*  </figcaption>*/}
            {/*</figure>*/}
            {/*<p className="mt-10">*/}
            {/*  Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet*/}
            {/*  vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque*/}
            {/*  erat velit.*/}
            {/*</p>*/}
          </div>
          {/*<figure className="mt-16">*/}
          {/*  <img*/}
          {/*    alt=""*/}
          {/*    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3"*/}
          {/*    className="aspect-video rounded-xl bg-gray-50 object-cover"*/}
          {/*  />*/}
          {/*  <figcaption className="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">*/}
          {/*    <InformationCircleIcon aria-hidden="true" className="mt-0.5 h-5 w-5 flex-none text-gray-300" />*/}
          {/*    Faucibus commodo massa rhoncus, volutpat.*/}
          {/*  </figcaption>*/}
          {/*</figure>*/}
          <div className="mt-16 max-w-2xl">
            <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6 mt-6">
              <div>
                <h3 className="font-semibold text-gray-900">Is FreeInvoice.dev really free?</h3>
                <p className="mt-3">
                  Yes, FreeInvoice.dev is completely free to use. There are no premium features, no subscription fees,
                  and no hidden costs. You can create unlimited invoices without ever paying a cent.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">How secure is my data?</h3>
                <p className="mt-3">
                  Very secure. FreeInvoice.dev processes everything locally in your browser. We never store, transmit,
                  or access your business information. Your sensitive data never leaves your device.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">What payment methods can I specify on my invoice?</h3>
                <p className="mt-3">
                  You can include any payment method in the invoice notes section. Common options include bank transfer
                  details, PayPal information, or custom payment instructions for your clients.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 max-w-2xl">
            <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900">
              Ready to Create Your First Invoice?
            </h2>
            <p className="mt-6">
              Stop wrestling with complex accounting software or basic spreadsheet templates. Create, customize, and
              download professional invoices in seconds. No learning curve, no complicated features - just
              straightforward invoicing that works.
            </p>
            <div className="mt-8">
              <a
                href="/app"
                // onClick={() => {
                //   if (typeof window.plausible !== 'undefined') {
                //     window.plausible('Create_Invoice_Click_Footer', {
                //       callback: () => {
                //         console.log('Plausible event sent: Create_Invoice_Click_Footer');
                //       },
                //     });
                //   }
                // }}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Invoice Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-6 pb-12 text-center lg:px-8">
          <p className="text-center text-sm/6 text-gray-600 md:order-1">
            &copy; {new Date().getFullYear()} Created with ❤️ by{' '}
            <Link href="https://joaopedro.dev">João Pedro Schmitz</Link>
          </p>
        </div>
      </footer>
    </>
  );
}
