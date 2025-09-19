import React from "react";
import PDFViewer from "components/core/PDFViewer";

const pdfFileUrl1 = require("./../../assets/pdfs/news/1_manuale-dell-artista.pdf");

export const ManualeDellArtista: React.FC = () => {
  return (
    <div className="manuale-dell-artista">
      <PDFViewer pdfFileUrl={pdfFileUrl1} />
    </div>
  );
};
