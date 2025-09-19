import React from "react";
import PDFViewer from "components/core/PDFViewer";

const pdfFileUrl3 = require("./../../assets/pdfs/news/3_40-modi-per-non-procrastinare.pdf");

export const QuarantaModiPerNonProcrastinare: React.FC = () => {
  return (
    <div className="quaranta-modi-per-non-procrastinare">
      <PDFViewer pdfFileUrl={pdfFileUrl3} />
    </div>
  );
};
