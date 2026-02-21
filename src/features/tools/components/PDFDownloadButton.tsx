"use client";

import dynamic from 'next/dynamic';
import { ReportPDF } from '../pdf/ReportPDF';
import { FileDown } from 'lucide-react';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

export default function PDFDownloadButton({ content }: { content: string }) {
  if (!content) return null;

  return (
    <PDFDownloadLink
      document={<ReportPDF content={content} />}
      fileName="ai-bug-report.pdf"
      title='export to pdf'
      className="px-5 py-3 bg-zinc-900 border border-zinc-800 text-white rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-zinc-800 transition-all active:scale-95"
    >
      {({ blob, loading, error }) => {
        if (error) return 'Error building PDF';
        if (loading || !blob) return 'Generating PDF...';

        return (
          <>
            <FileDown size={16} />
            <span className="hidden lg:flex">EXPORT TO PDF</span>
          </>
        );
      }}
    </PDFDownloadLink>
  );
}