import React from "react";
import PDFViewer from "components/core/PDFViewer";

const pdfFileUrl6 = require("./../../assets/pdfs/news/6_come-diventare-manager-leader-di-te-stesso.pdf");

export const ComeDiventareManagerLeaderDiTeStesso: React.FC = () => {
  return (
    <div className="come-diventare-manager-leader-di-te-stesso">
      <PDFViewer pdfFileUrl={pdfFileUrl6} />
    </div>
  );
};