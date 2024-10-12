'use client';

import { Table, TD, TH, TR } from '@ag-media/react-pdf-table';
import { Document, Font, Page, Text, View } from '@react-pdf/renderer';
import { createTw } from 'react-pdf-tailwind';

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

export function PDFDocument() {
  return (
    <Document
      title="Invoice"
      creator="Invoice"
      producer="freeinvoice.dev"
      author="Invoice"
      subject="Invoice"
      creationDate={new Date()}
    >
      <Page size="A4" style={tw('pt-[36px] px-[36px] font-sans text-primary antialiased')}>
        <View style={tw('flex flex-row justify-between')}>
          <View>
            <Text style={tw('text-[24px] font-bold leading-none')}>Invoice</Text>
            <Text style={tw('text-[10px] mt-6 leading-none font-medium tracking-wide')}>#27346733-022</Text>
          </View>
        </View>

        <View style={tw('mt-12')}>
          <View style={tw('flex flex-row items-center')}>
            <Text style={tw('text-[10px] mr-[15px] leading-none')}>Invoice Date</Text>
            <Text style={tw('text-[10px] font-bold leading-none')}>6 March, 2023</Text>
          </View>
          <View style={tw('flex flex-row items-center mt-2')}>
            <Text style={tw('text-[10px] mr-[30px] leading-none')}>Due Date</Text>
            <Text style={tw('text-[10px] font-bold leading-none')}>7 March, 2023</Text>
          </View>
        </View>

        <View style={tw('h-px bg-[#E7EBF4] w-full mt-12')} />

        <View style={tw('mt-11 flex flex-row items-center')}>
          <View style={tw('w-full')}>
            <Text style={tw('text-[10px] font-bold leading-none')}>Billed To</Text>
            <View style={tw('mt-5')}>
              <Text style={tw('text-[10px] font-bold leading-none')}>João Pedro</Text>
              <Text style={tw('text-[10px] font-bold leading-none mt-2')}>joao@mobg.com.br</Text>
              <Text style={tw('text-[10px] font-medium leading-none mt-2')}>9029 Salt Lake, Mandalor</Text>
              <Text style={tw('text-[10px] font-medium leading-none mt-2')}>(+254) 724-453-233</Text>
            </View>
          </View>
          <View style={tw('w-full')}>
            <Text style={tw('text-[10px] font-bold leading-none')}>From</Text>
            <View style={tw('mt-5')}>
              <Text style={tw('text-[10px] font-bold leading-none')}>João Pedro</Text>
              <Text style={tw('text-[10px] font-bold leading-none mt-2')}>joao@mobg.com.br</Text>
              <Text style={tw('text-[10px] font-medium leading-none mt-2')}>9029 Salt Lake, Mandalor</Text>
              <Text style={tw('text-[10px] font-medium leading-none mt-2')}>(+254) 724-453-233</Text>
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
            {[1, 2, 3].map((item) => (
              <TR key={item} style={tw('border-b border-[#E7EBF4]')}>
                <TD style={tw('text-[10px] items-center leading-none p-2')} weighting={0.5}>
                  5 pager static website design
                </TD>
                <TD style={tw('text-[10px] font-bold items-center justify-center leading-none p-2')} weighting={0.1}>
                  5
                </TD>
                <TD style={tw('text-[10px] font-bold items-center leading-none justify-end p-2 ')} weighting={0.2}>
                  $ 900
                </TD>
                <TD style={tw('text-[10px] font-bold items-center leading-none justify-end pr-2 py-2')} weighting={0.2}>
                  $ 45,000
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
                <Text>$ 135,000</Text>
              </TD>
            </TR>
          </Table>
        </View>

        <View style={tw('mt-11')}>
          <Text style={tw('text-[10px] font-bold leading-none')}>Additional Information</Text>
          <Text style={tw('text-[10px] leading-[20px] font-medium mt-5')}></Text>
        </View>

        <View fixed style={tw('mt-auto py-4 border-t border-[#E7EBF4] flex flex-row items-center justify-between')}>
          <Text style={tw('text-[8px] font-medium')}>#27346733-022 · $93,100 due 7 March, 2023</Text>
          <Text style={tw('text-[8px] font-medium')}>freeinvoice.dev</Text>
        </View>
      </Page>
    </Document>
  );
}
