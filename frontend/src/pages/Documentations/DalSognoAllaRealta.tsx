import React from "react";
import PDFViewer from "components/core/PDFViewer";

const pdfFileUrl2 = require("./../../assets/pdfs/news/2_dal-sogno-alla-realta.pdf");

export const DalSognoAllaRealta: React.FC = () => {
  return (
    <div className="dal-sogno-alla-realta">
      <PDFViewer pdfFileUrl={pdfFileUrl2} />
    </div>
  );
};
