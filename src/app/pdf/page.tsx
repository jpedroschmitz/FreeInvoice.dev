'use client';

import dynamic from 'next/dynamic';

import { PDFDocument } from '@/app/PDFDocument';

// Workaround for SSR issue with @react-pdf/renderer
const PDFViewer = dynamic(() => import(`@react-pdf/renderer`).then((mod) => mod.PDFViewer), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function PDFPage() {
  return (
    <PDFViewer style={{ width: `100%`, height: `100vh` }}>
      <PDFDocument />
    </PDFViewer>
  );
}
