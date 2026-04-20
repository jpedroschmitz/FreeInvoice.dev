import { Table, TD, TH, TR } from '@ag-media/react-pdf-table';
import { Document, Font, Link, Page, Text, View } from '@react-pdf/renderer';
import currency from 'currency.js';
import { format, parseISO } from 'date-fns';
import { createTw } from 'react-pdf-tailwind';

import { InvoiceFormValues } from '@/lib/invoice-validation';

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

Font.register({
  family: `DM Sans`,
  fonts: [
    {
      src: `https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxRSW3z.ttf`,
    },
    {
      src: `https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAkJxRSW3z.ttf`,
      fontWeight: 500,
    },
    {
      src: `https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwARZtRSW3z.ttf`,
      fontWeight: 700,
    },
  ],
});

const tw = createTw({
  theme: {
    fontFamily: {
      sans: 'DM Sans',
    },
    extend: {
      colors: {
        primary: '#333333',
      },
    },
  },
});

type InvoiceData = InvoiceFormValues & {
  invoice_id: string;
};

export function PdfDocument({ invoice }: { invoice: InvoiceData }) {
  const {
    bill_to,
    bill_to_address,
    company_address,
    company_name,
    currency: invoiceCurrency,
    due_date,
    notes,
    vat_id,
    services,
    invoice_id,
  } = invoice;

  const currentDate = new Date();

  const total = services
    .map((service) => currency(service.amount).multiply(service.quantity))
    .reduce((acc, amount) => acc.add(amount), currency(0));

  const totalFormatted = formatCurrency(total.value, invoiceCurrency);

  const invoiceDate = format(currentDate, 'd MMMM, yyyy');
  const dueDate = format(parseISO(due_date), 'd MMMM, yyyy');

  return (
    <Document
      title={`Invoice ${invoice_id}`}
      creator="FreeInvoice.dev"
      producer="FreeInvoice.dev"
      author={company_name}
      subject={`Invoice for ${bill_to}`}
      creationDate={currentDate}
    >
      <Page size="A4" style={tw('text-primary px-[36px] pt-[36px] font-sans antialiased')}>
        <View style={tw('flex flex-row justify-between')}>
          <View>
            <Text style={tw('text-[24px] leading-none font-bold')}>Invoice</Text>
            <Text style={tw('mt-6 text-[10px] leading-none font-medium tracking-wide')}>#{invoice_id}</Text>
          </View>
        </View>

        <View style={tw('mt-12')}>
          <View style={tw('flex flex-row items-center')}>
            <Text style={tw('mr-[15px] text-[10px] leading-none')}>Invoice Date</Text>
            <Text style={tw('text-[10px] leading-none font-bold')}>{invoiceDate}</Text>
          </View>
          <View style={tw('mt-2 flex flex-row items-center')}>
            <Text style={tw('mr-[30px] text-[10px] leading-none')}>Due Date</Text>
            <Text style={tw('text-[10px] leading-none font-bold')}>{dueDate}</Text>
          </View>
        </View>

        <View style={tw('mt-12 h-px w-full bg-[#E7EBF4]')} />

        <View style={tw('mt-11 flex flex-row items-center')}>
          <View style={tw('w-full')}>
            <Text style={tw('text-[10px] leading-none font-bold')}>Billed To</Text>
            <View style={tw('mt-5')}>
              <Text style={tw('text-[10px] leading-none font-bold')}>{bill_to}</Text>
              <Text style={tw('mt-2 text-[10px] leading-none')}>{bill_to_address}</Text>
              {vat_id ? <Text style={tw('mt-2 text-[10px] leading-none')}>VAT-ID: {vat_id}</Text> : null}
            </View>
          </View>
          <View style={tw('w-full')}>
            <Text style={tw('text-[10px] leading-none font-bold')}>From</Text>
            <View style={tw('mt-5')}>
              <Text style={tw('text-[10px] leading-none font-bold')}>{company_name}</Text>
              <Text style={tw('mt-2 text-[10px] leading-none')}>{company_address}</Text>
              {vat_id ? <Text style={tw('pointer-events-none mt-2 text-[10px] leading-none')}>&nbsp;</Text> : null}
            </View>
          </View>
        </View>

        <View style={tw('mt-11')}>
          <Table style={{ border: 'none' }}>
            <TH style={tw('border-b border-[#E7EBF4] pb-2')}>
              <TD style={tw('px-2 text-[10px] leading-none font-bold')} weighting={0.5}>
                Description
              </TD>
              <TD style={tw('justify-center px-2 text-[10px] leading-none font-bold')} weighting={0.1}>
                Quantity
              </TD>
              <TD style={tw('justify-end px-2 text-[10px] leading-none font-bold')} weighting={0.2}>
                Price
              </TD>
              <TD style={tw('justify-end pr-2 text-[10px] leading-none font-bold')} weighting={0.2}>
                Amount
              </TD>
            </TH>
            {services.map((item) => (
              <TR key={item.description} style={tw('border-b border-[#E7EBF4]')}>
                <TD style={tw('items-center p-2 text-[10px] leading-none')} weighting={0.5}>
                  {item.description}
                </TD>
                <TD style={tw('items-center justify-center p-2 text-[10px] leading-none')} weighting={0.1}>
                  {item.quantity}
                </TD>
                <TD style={tw('items-center justify-end p-2 text-[10px] leading-none')} weighting={0.2}>
                  {formatCurrency(currency(item.amount).value, invoiceCurrency)}
                </TD>
                <TD style={tw('items-center justify-end py-2 pr-2 text-[10px] leading-none')} weighting={0.2}>
                  {formatCurrency(currency(item.amount).multiply(item.quantity).value, invoiceCurrency)}
                </TD>
              </TR>
            ))}
            <TR>
              <TD weighting={0.75} />
              <TD
                style={tw(
                  'flex flex-row items-center justify-between justify-end border-b border-[#E7EBF4] p-2 text-[10px] leading-none font-bold',
                )}
                weighting={0.25}
              >
                <Text>Total</Text>
                <Text>{totalFormatted}</Text>
              </TD>
            </TR>
          </Table>
        </View>

        {notes ? (
          <View style={tw('mt-11')}>
            <Text style={tw('text-[10px] leading-none font-bold')}>Additional Information</Text>
            <Text style={tw('mt-5 text-[10px] leading-[20px] font-medium')}>{notes}</Text>
          </View>
        ) : null}

        <View fixed style={tw('mt-auto flex flex-row items-center justify-between border-t border-[#E7EBF4] py-4')}>
          <Text style={tw('text-[8px] font-medium')}>
            #{invoice_id} · {totalFormatted} due {dueDate}
          </Text>
          <Link style={tw('text-primary text-[8px] font-medium')} href="https://freeinvoice.dev">
            FreeInvoice.dev
          </Link>
        </View>
      </Page>
    </Document>
  );
}
