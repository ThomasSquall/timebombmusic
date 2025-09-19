import React from "react";
// import PDFViewer from "components/core/PDFViewer";
// const pdfFileUrl4 = require("./../../assets/pdfs/news/4_video-motivazionali.pdf");

export const VideoMotivazionali: React.FC = () => {
  return (
    <div
      className="video-motivazionali"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        backgroundColor: "white",
        padding: "40px",
      }}
    >
      {/* <PDFViewer pdfFileUrl={pdfFileUrl4} /> */}
      <h1>Video Motivazionali</h1>

      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(560px, 1fr))",
          gap: "20px",
        }}
      >
        <div>
          <h3>Impara ad attrarre ciò che vuoi</h3>
          <iframe
            width="100%"
            style={{ aspectRatio: "16/9" }}
            src="https://www.youtube.com/embed/BmigMpBr-Hc"
            title="Impara ad attrarre ciò che vuoi"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div>
          <h3>Gli studi di Einstein che hanno rivoluzionato la scienza</h3>
          <iframe
            width="100%"
            style={{ aspectRatio: "16/9" }}
            src="https://www.youtube.com/embed/gJK3zx8qXUU"
            title="Gli studi di Einstein che hanno rivoluzionato la scienza"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div>
          <h3>Come funziona la mente</h3>
          <iframe
            width="100%"
            style={{ aspectRatio: "16/9" }}
            src="https://www.youtube.com/embed/UxwEDQbgoag"
            title="Come funziona la mente"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div>
          <h3>Il potente messaggio del Dottor Joe Dispenza</h3>
          <iframe
            width="100%"
            style={{ aspectRatio: "16/9" }}
            src="https://www.youtube.com/embed/2KORW_BdZKY"
            title="Il potente messaggio del Dottor Joe Dispenza"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div>
          <h3>Questo discorso cambierà il tuo modo di pensare</h3>
          <iframe
            width="100%"
            style={{ aspectRatio: "16/9" }}
            src="https://www.youtube.com/embed/KbIODc0QsQc"
            title="Questo discorso cambierà il tuo modo di pensare"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div>
          <h3>Il segreto per raggiungere gli obiettivi</h3>
          <iframe
            width="100%"
            style={{ aspectRatio: "16/9" }}
            src="https://www.youtube.com/embed/xBfVtdUUwoA"
            title="Il segreto per raggiungere gli obiettivi"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div>
          <h3>Elimina la paura dalla tua vita</h3>
          <iframe
            width="100%"
            style={{ aspectRatio: "16/9" }}
            src="https://www.youtube.com/embed/PDcDPrI9Jw8"
            title="Elimina la paura dalla tua vita"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div>
          <h3>Successo e fallimento</h3>
          <iframe
            width="100%"
            style={{ aspectRatio: "16/9" }}
            src="https://www.youtube.com/embed/7hw-QNbpEo4"
            title="Successo e fallimento"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div>
          <h3>Anthony Robbins come cambiare mentalità</h3>
          <iframe
            width="100%"
            style={{ aspectRatio: "16/9" }}
            src="https://www.youtube.com/embed/naTHuYScC-E"
            title="Anthony Robbins come cambiare mentalità"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div>
          <h3>Testimonianza Jim Carrey</h3>
          <iframe
            width="100%"
            style={{ aspectRatio: "16/9" }}
            src="https://www.youtube.com/embed/l9UZR7h1bD4"
            title="Testimonianza Jim Carrey"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div>
          <h3>Legge dell'Attrazione – Will Smith</h3>
          <iframe
            width="100%"
            style={{ aspectRatio: "16/9" }}
            src="https://www.youtube.com/embed/RyWgT9otHkI"
            title="Legge dell'Attrazione – Will Smith"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div>
          <h3>Testimonianze di Grandi Celebrità</h3>
          <iframe
            width="100%"
            style={{ aspectRatio: "16/9" }}
            src="https://www.youtube.com/embed/i6XnH3jELhU"
            title="Testimonianze di Grandi Celebrità"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
