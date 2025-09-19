import React from "react";
// import PDFViewer from "components/core/PDFViewer";
// const pdfFileUrl5 = require("./../../assets/pdfs/news/5_video-per-la-meditazione.pdf");

export const VideoPerLaMeditazione: React.FC = () => {
  return (
    <div className="video-per-la-meditazione" style={{ display: "flex", flexDirection: "column", gap: "20px", backgroundColor: "white", padding: "40px" }}>
      {/* <PDFViewer pdfFileUrl={pdfFileUrl5} /> */}

      <h1>Video Per La Meditazione</h1>

      <div style={{ 
        marginTop: "20px", 
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(560px, 1fr))",
        gap: "20px",
        maxWidth: "100%"
      }}>
        <div>
          <h3>SESSIONE NEURO NEURO-TRAINING</h3>
          <iframe 
            width="100%"
            style={{ aspectRatio: "16/9" }}
            src="https://www.youtube.com/embed/ho5qYY8PY00"
            title="SESSIONE NEURO NEURO-TRAINING"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        <div>
          <h3>MEDITAZIONE PER DIVENTARE SICURO DI SE'</h3>
          <iframe
            width="100%"
            style={{ aspectRatio: "16/9" }}
            src="https://www.youtube.com/embed/kpk_6Kw4zjg" 
            title="MEDITAZIONE PER DIVENTARE SICURO DI SE'"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div>
          <h3>Ho'oponopono</h3>
          <iframe
            width="100%"
            style={{ aspectRatio: "16/9" }}
            src="https://www.youtube.com/embed/RMIm3e-5_B4"
            title="Ho'oponopono"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div>
          <h3>MEDITAZIONE GUIDATA - Apertura e Riequilibrio Chakra (India)</h3>
          <iframe
            width="100%"
            style={{ aspectRatio: "16/9" }}
            src="https://www.youtube.com/embed/fScj5Kj2PcQ"
            title="MEDITAZIONE GUIDATA - Apertura e Riequilibrio Chakra (India)"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div>
          <h3>Primo Chakra, Chakra della Radice, Rilassamento Profondo, Energia Positiva, Calma, Fiducia</h3>
          <iframe
            width="100%"
            style={{ aspectRatio: "16/9" }}
            src="https://www.youtube.com/embed/gJ7F7lkyTnY"
            title="Primo Chakra, Chakra della Radice, Rilassamento Profondo, Energia Positiva, Calma, Fiducia"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div>
          <h3>Chakra della Gola, Quinto Chakra, Attivazione, Parola, Espressione, Vishudda, Meditazione Guidata</h3>
          <iframe
            width="100%"
            style={{ aspectRatio: "16/9" }}
            src="https://www.youtube.com/embed/Z6QULCsbt-c"
            title="Chakra della Gola, Quinto Chakra, Attivazione, Parola, Espressione, Vishudda, Meditazione Guidata"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
