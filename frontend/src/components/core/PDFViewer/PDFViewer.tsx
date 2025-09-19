import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

interface PDFViewerProps {
  pdfFileUrl: string;
}

interface PDFViewerProps {
  pdfFileUrl: string;
}

const workerVersion = "3.4.120";

export const PDFViewer: React.FC<PDFViewerProps> = ({ pdfFileUrl }) => {
  return (
    // style={{ height: "750px" }}
    <div>
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@${workerVersion}/build/pdf.worker.min.js`}
      >
        <Viewer fileUrl={pdfFileUrl} />
      </Worker>
    </div>
  );
};

export default PDFViewer;
