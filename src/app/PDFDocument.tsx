'use client';

import { Table, TD, TH, TR } from '@ag-media/react-pdf-table';
import { Document, Font, Link, Page, Text, View } from '@react-pdf/renderer';
import currency from 'currency.js';
import { format } from 'date-fns';
import { createTw } from 'react-pdf-tailwind';

import { InvoiceFormValues } from '@/app/invoice-form';

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

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export function PDFDocument({
  bill_to,
  bill_to_address,
  company_address,
  company_name,
  currency: invoiceCurrency = 'USD',
  due_date,
  notes,
  vat_id,
  services = [],
  invoice_id,
}: InvoiceFormValues & {
  invoice_id: string;
}) {
  const currentDate = new Date();

  const total = services
    .map((service) => currency(service.amount).multiply(service.quantity))
    .reduce((acc, amount) => acc.add(amount), currency(0));

  const totalFormatted = formatCurrency(total.value, invoiceCurrency);

  const invoiceDate = format(currentDate, 'yyyy-MM-dd');
  const dueDate = format(new Date(due_date), 'yyyy-MM-dd');

  return (
    <Document
      title={`Invoice ${invoice_id}`}
      creator="Free Invoice"
      producer="freeinvoice.dev"
      author={company_name}
      subject={`Invoice for ${bill_to}`}
      creationDate={currentDate}
    >
      <Page size="A4" style={tw('pt-[36px] px-[36px] font-sans text-primary antialiased')}>
        <View style={tw('flex flex-row justify-between')}>
          <View>
            <Text style={tw('text-[24px] font-bold leading-none')}>Invoice</Text>
            <Text style={tw('text-[10px] mt-6 leading-none font-medium tracking-wide')}>#{invoice_id}</Text>
          </View>
        </View>

        <View style={tw('mt-12')}>
          <View style={tw('flex flex-row items-center')}>
            <Text style={tw('text-[10px] mr-[15px] leading-none')}>Invoice Date</Text>
            <Text style={tw('text-[10px] font-bold leading-none')}>{invoiceDate}</Text>
          </View>
          <View style={tw('flex flex-row items-center mt-2')}>
            <Text style={tw('text-[10px] mr-[30px] leading-none')}>Due Date</Text>
            <Text style={tw('text-[10px] font-bold leading-none')}>{dueDate}</Text>
          </View>
        </View>

        <View style={tw('h-px bg-[#E7EBF4] w-full mt-12')} />

        <View style={tw('mt-11 flex flex-row items-center')}>
          <View style={tw('w-full')}>
            <Text style={tw('text-[10px] font-bold leading-none')}>Billed To</Text>
            <View style={tw('mt-5')}>
              <Text style={tw('text-[10px] leading-none')}>{bill_to}</Text>
              <Text style={tw('text-[10px] leading-none mt-2')}>{bill_to_address}</Text>
              {vat_id ? <Text style={tw('text-[10px] leading-none mt-2')}>VAT-ID: {vat_id}</Text> : null}
            </View>
          </View>
          <View style={tw('w-full')}>
            <Text style={tw('text-[10px] font-bold leading-none')}>From</Text>
            <View style={tw('mt-5')}>
              <Text style={tw('text-[10px] leading-none')}>{company_name}</Text>
              <Text style={tw('text-[10px] leading-none mt-2')}>{company_address}</Text>
            </View>
          </View>
        </View>

        <View style={tw('mt-11')}>
          <Table style={{ border: 'none' }}>
            <TH style={tw('border-b border-[#E7EBF4] pb-2')}>
              <TD style={tw('text-[10px] font-bold leading-none px-2')} weighting={0.5}>
                Description
              </TD>
              <TD style={tw('text-[10px] font-bold justify-center leading-none px-2')} weighting={0.1}>
                Quantity
              </TD>
              <TD style={tw('text-[10px] font-bold leading-none justify-end px-2')} weighting={0.2}>
                Price
              </TD>
              <TD style={tw('text-[10px] font-bold leading-none justify-end pr-2')} weighting={0.2}>
                Amount
              </TD>
            </TH>
            {services.map((item) => (
              <TR key={item.description} style={tw('border-b border-[#E7EBF4]')}>
                <TD style={tw('text-[10px] items-center leading-none p-2')} weighting={0.5}>
                  {item.description}
                </TD>
                <TD style={tw('text-[10px] font-bold items-center justify-center leading-none p-2')} weighting={0.1}>
                  {item.quantity}
                </TD>
                <TD style={tw('text-[10px] font-bold items-center leading-none justify-end p-2 ')} weighting={0.2}>
                  {formatCurrency(currency(item.amount).value, invoiceCurrency)}
                </TD>
                <TD style={tw('text-[10px] font-bold items-center leading-none justify-end pr-2 py-2')} weighting={0.2}>
                  {formatCurrency(currency(item.amount).multiply(item.quantity).value, invoiceCurrency)}
                </TD>
              </TR>
            ))}
            <TR>
              <TD weighting={0.75} />
              <TD
                style={tw(
                  'text-[10px] font-bold leading-none justify-end border-b border-[#E7EBF4] flex flex-row justify-between items-center p-2'
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
            <Text style={tw('text-[10px] font-bold leading-none')}>Additional Information</Text>
            <Text style={tw('text-[10px] leading-[20px] font-medium mt-5')}>{notes}</Text>
          </View>
        ) : null}

        <View fixed style={tw('mt-auto py-4 border-t border-[#E7EBF4] flex flex-row items-center justify-between')}>
          <Text style={tw('text-[8px] font-medium')}>
            #{invoice_id} · {totalFormatted} due {dueDate}
          </Text>
          <Link style={tw('text-[8px] font-medium text-primary')} href="https://freeinvoice.dev">
            freeinvoice.dev
          </Link>
        </View>
      </Page>
    </Document>
  );
}
