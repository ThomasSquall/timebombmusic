import React from "react";
import PDFViewer from "components/core/PDFViewer";

const pdfFileUrl11 = require("./../../assets/pdfs/news/11_strategia-di-marketing-musicale.pdf");

export const StrategiaDiMarketingMusicale: React.FC = () => {
  return (
    <div className="strategia-di-marketing-musicale">
      <PDFViewer pdfFileUrl={pdfFileUrl11} />
    </div>
  );
};
