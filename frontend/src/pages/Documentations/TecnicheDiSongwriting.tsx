import React from "react";
import PDFViewer from "components/core/PDFViewer";

const pdfFileUrl9 = require("./../../assets/pdfs/news/9_tecniche-di-songwriting.pdf");

export const TecnicheDiSongwriting: React.FC = () => {
  return (
    <div className="tecniche-di-songwriting">
      <PDFViewer pdfFileUrl={pdfFileUrl9} />
    </div>
  );
};
