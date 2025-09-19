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

const pdfFileUrl2 = require("./../../assets/pdfs/news/2_dal-sogno-alla-realta.pdf");

export const DalSognoAllaRealta: React.FC = () => {
  return (
    <div className="dal-sogno-alla-realta">
      <PDFViewer pdfFileUrl={pdfFileUrl2} />
    </div>
  );
};

const pdfFileUrl3 = require("./../../assets/pdfs/news/3_40-modi-per-non-procrastinare.pdf");

export const QuarantaModiPerNonProcrastinare: React.FC = () => {
  return (
    <div className="quaranta-modi-per-non-procrastinare">
      <PDFViewer pdfFileUrl={pdfFileUrl3} />
    </div>
  );
};

const pdfFileUrl4 = require("./../../assets/pdfs/news/4_video-motivazionali.pdf");

export const VideoMotivazionali: React.FC = () => {
  return (
    <div className="video-motivazionali">
      <PDFViewer pdfFileUrl={pdfFileUrl4} />
    </div>
  );
};

const pdfFileUrl5 = require("./../../assets/pdfs/news/5_video-per-la-meditazione.pdf");

export const VideoPerLaMeditazione: React.FC = () => {
  return (
    <div className="video-per-la-meditazione">
      <PDFViewer pdfFileUrl={pdfFileUrl5} />
    </div>
  );
};

const pdfFileUrl6 = require("./../../assets/pdfs/news/6_come-diventare-manager-leader-di-te-stesso.pdf");

export const ComeDiventareManagerLeaderDiTeStesso: React.FC = () => {
  return (
    <div className="come-diventare-manager-leader-di-te-stesso">
      <PDFViewer pdfFileUrl={pdfFileUrl6} />
    </div>
  );
};

const pdfFileUrl7 = require("./../../assets/pdfs/news/7_mindset-musicale.pdf");

export const MindsetMusicale: React.FC = () => {
  return (
    <div className="mindset-musicale">
      <PDFViewer pdfFileUrl={pdfFileUrl7} />
    </div>
  );
};

const pdfFileUrl8 = require("./../../assets/pdfs/news/8_protocollo-business-artist.pdf");

export const ProtocolloBusinessArtist: React.FC = () => {
  return (
    <div className="protocollo-business-artist">
      <PDFViewer pdfFileUrl={pdfFileUrl8} />
    </div>
  );
};

const pdfFileUrl9 = require("./../../assets/pdfs/news/9_tecniche-di-songwriting.pdf");

export const TecnicheDiSongwriting: React.FC = () => {
  return (
    <div className="tecniche-di-songwriting">
      <PDFViewer pdfFileUrl={pdfFileUrl9} />
    </div>
  );
};

const pdfFileUrl10 = require("./../../assets/pdfs/news/10_marketing-musicale.pdf");

export const MarketingMusicale: React.FC = () => {
  return (
    <div className="marketing-musicale">
      <PDFViewer pdfFileUrl={pdfFileUrl10} />
    </div>
  );
};

const pdfFileUrl11 = require("./../../assets/pdfs/news/11_strategia-di-marketing-musicale.pdf");

export const StrategiaDiMarketingMusicale: React.FC = () => {
  return (
    <div className="strategia-di-marketing-musicale">
      <PDFViewer pdfFileUrl={pdfFileUrl11} />
    </div>
  );
};

const pdfFileUrl12 = require("./../../assets/pdfs/news/12_attiva-la-tua-calamita-energetica.pdf");

export const AttivaLaTuaCalamitaEnergetica: React.FC = () => {
  return (
    <div className="attiva-la-tua-calamita-energetica">
      <PDFViewer pdfFileUrl={pdfFileUrl12} />
    </div>
  );
};