import React from "react";
import PDFViewer from "components/core/PDFViewer";

const pdfFileUrl10 = require("./../../assets/pdfs/news/10_marketing-musicale.pdf");

export const MarketingMusicale: React.FC = () => {
  return (
    <div className="marketing-musicale">
      <PDFViewer pdfFileUrl={pdfFileUrl10} />
    </div>
  );
};
