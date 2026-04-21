import { Table, TD, TH, TR } from '@ag-media/react-pdf-table';
import { Document, Font, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import currency from 'currency.js';
import { format, parseISO } from 'date-fns';

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

const TEXT_COLOR = '#333333';
const RULE_COLOR = '#E7EBF4';

const styles = StyleSheet.create({
  page: {
    color: TEXT_COLOR,
    paddingHorizontal: 36,
    paddingTop: 36,
    fontFamily: 'DM Sans',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    lineHeight: 1,
    fontWeight: 'bold',
  },
  invoiceId: {
    marginTop: 18,
    fontSize: 10,
    lineHeight: 1,
    fontWeight: 500,
    letterSpacing: 0.3,
  },
  datesSection: { marginTop: 36 },
  dateRowSpaced: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateLabel: {
    marginRight: 15,
    fontSize: 10,
    lineHeight: 1,
  },
  dueDateLabel: {
    marginRight: 30,
    fontSize: 10,
    lineHeight: 1,
  },
  dateValue: {
    fontSize: 10,
    lineHeight: 1,
    fontWeight: 'bold',
  },
  divider: {
    marginTop: 36,
    height: 1,
    width: '100%',
    backgroundColor: RULE_COLOR,
  },
  addressRow: {
    marginTop: 33,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressCol: { width: '100%' },
  label: {
    fontSize: 10,
    lineHeight: 1,
    fontWeight: 'bold',
  },
  addressBody: { marginTop: 15 },
  addressLine: {
    marginTop: 6,
    fontSize: 10,
    lineHeight: 1,
  },
  tableWrap: { marginTop: 33 },
  tableOuter: { border: 'none' },
  tableHeaderRow: {
    borderBottomWidth: 1,
    borderColor: RULE_COLOR,
    paddingBottom: 6,
  },
  th: {
    paddingHorizontal: 6,
    fontSize: 10,
    lineHeight: 1,
    fontWeight: 'bold',
  },
  thCenter: {
    justifyContent: 'center',
    paddingHorizontal: 6,
    fontSize: 10,
    lineHeight: 1,
    fontWeight: 'bold',
  },
  thRight: {
    justifyContent: 'flex-end',
    paddingHorizontal: 6,
    fontSize: 10,
    lineHeight: 1,
    fontWeight: 'bold',
  },
  thRightLast: {
    justifyContent: 'flex-end',
    paddingRight: 6,
    fontSize: 10,
    lineHeight: 1,
    fontWeight: 'bold',
  },
  tableRow: {
    borderBottomWidth: 1,
    borderColor: RULE_COLOR,
  },
  td: {
    alignItems: 'center',
    padding: 6,
    fontSize: 10,
    lineHeight: 1,
  },
  tdCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    fontSize: 10,
    lineHeight: 1,
  },
  tdRight: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 6,
    fontSize: 10,
    lineHeight: 1,
  },
  tdRightLast: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 6,
    paddingRight: 6,
    fontSize: 10,
    lineHeight: 1,
  },
  totalCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: RULE_COLOR,
    padding: 6,
    fontSize: 10,
    lineHeight: 1,
    fontWeight: 'bold',
    width: '100%',
  },
  notesWrap: { marginTop: 33 },
  notesBody: {
    marginTop: 15,
    fontSize: 10,
    fontWeight: 500,
  },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: RULE_COLOR,
    paddingVertical: 12,
  },
  footerText: {
    fontSize: 8,
    fontWeight: 500,
  },
  footerLink: {
    color: TEXT_COLOR,
    fontSize: 8,
    fontWeight: 500,
  },
  spacer: {
    marginTop: 6,
    fontSize: 10,
    lineHeight: 1,
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
      <Page size="A4" style={styles.page}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.title}>Invoice</Text>
            <Text style={styles.invoiceId}>#{invoice_id}</Text>
          </View>
        </View>

        <View style={styles.datesSection}>
          <View style={styles.row}>
            <Text style={styles.dateLabel}>Invoice Date</Text>
            <Text style={styles.dateValue}>{invoiceDate}</Text>
          </View>
          <View style={styles.dateRowSpaced}>
            <Text style={styles.dueDateLabel}>Due Date</Text>
            <Text style={styles.dateValue}>{dueDate}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.addressRow}>
          <View style={styles.addressCol}>
            <Text style={styles.label}>Billed To</Text>
            <View style={styles.addressBody}>
              <Text style={styles.label}>{bill_to}</Text>
              <Text style={styles.addressLine}>{bill_to_address}</Text>
              {vat_id ? <Text style={styles.addressLine}>VAT-ID: {vat_id}</Text> : null}
            </View>
          </View>
          <View style={styles.addressCol}>
            <Text style={styles.label}>From</Text>
            <View style={styles.addressBody}>
              <Text style={styles.label}>{company_name}</Text>
              <Text style={styles.addressLine}>{company_address}</Text>
              {vat_id ? <Text style={styles.spacer}>&nbsp;</Text> : null}
            </View>
          </View>
        </View>

        <View style={styles.tableWrap}>
          <Table style={styles.tableOuter}>
            <TH style={styles.tableHeaderRow}>
              <TD style={styles.th} weighting={0.5}>
                Description
              </TD>
              <TD style={styles.thCenter} weighting={0.1}>
                Quantity
              </TD>
              <TD style={styles.thRight} weighting={0.2}>
                Price
              </TD>
              <TD style={styles.thRightLast} weighting={0.2}>
                Amount
              </TD>
            </TH>
            {services.map((item) => (
              <TR key={item.description} style={styles.tableRow}>
                <TD style={styles.td} weighting={0.5}>
                  {item.description}
                </TD>
                <TD style={styles.tdCenter} weighting={0.1}>
                  {item.quantity}
                </TD>
                <TD style={styles.tdRight} weighting={0.2}>
                  {formatCurrency(currency(item.amount).value, invoiceCurrency)}
                </TD>
                <TD style={styles.tdRightLast} weighting={0.2}>
                  {formatCurrency(currency(item.amount).multiply(item.quantity).value, invoiceCurrency)}
                </TD>
              </TR>
            ))}
            <TR>
              <TD weighting={0.75} />
              <TD style={styles.totalCell} weighting={0.25}>
                <Text>Total</Text>
                <Text>{totalFormatted}</Text>
              </TD>
            </TR>
          </Table>
        </View>

        {notes ? (
          <View style={styles.notesWrap}>
            <Text style={styles.label}>Additional Information</Text>
            <Text style={styles.notesBody}>{notes}</Text>
          </View>
        ) : null}

        <View fixed style={styles.footer}>
          <Text style={styles.footerText}>
            #{invoice_id} · {totalFormatted} due {dueDate}
          </Text>
          <Link style={styles.footerLink} href="https://freeinvoice.dev">
            FreeInvoice.dev
          </Link>
        </View>
      </Page>
    </Document>
  );
}
