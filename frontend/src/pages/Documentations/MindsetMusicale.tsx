import React from "react";
import PDFViewer from "components/core/PDFViewer";

const pdfFileUrl7 = require("./../../assets/pdfs/news/7_mindset-musicale.pdf");

export const MindsetMusicale: React.FC = () => {
  return (
    <div className="mindset-musicale">
      <PDFViewer pdfFileUrl={pdfFileUrl7} />
    </div>
  );
};
