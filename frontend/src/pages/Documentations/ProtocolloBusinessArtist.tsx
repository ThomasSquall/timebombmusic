import React from "react";
import PDFViewer from "components/core/PDFViewer";

const pdfFileUrl8 = require("./../../assets/pdfs/news/8_protocollo-business-artist.pdf");

export const ProtocolloBusinessArtist: React.FC = () => {
  return (
    <div className="protocollo-business-artist">
      <PDFViewer pdfFileUrl={pdfFileUrl8} />
    </div>
  );
};
