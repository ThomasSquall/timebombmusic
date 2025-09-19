import React from "react";
import PDFViewer from "components/core/PDFViewer";

const pdfFileUrl12 = require("./../../assets/pdfs/news/12_attiva-la-tua-calamita-energetica.pdf");

export const AttivaLaTuaCalamitaEnergetica: React.FC = () => {
  return (
    <div className="attiva-la-tua-calamita-energetica">
      <PDFViewer pdfFileUrl={pdfFileUrl12} />
    </div>
  );
};