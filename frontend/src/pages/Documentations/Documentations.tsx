import React from "react";
import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

interface DocumentationItem {
  title: string;
  path: string;
}

const documentations: DocumentationItem[] = [
  { title: "Manuale Dell'Artista", path: "/documentation/manuale-dell-artista" },
  { title: "Dal Sogno Alla Realtà", path: "/documentation/dal-sogno-alla-realta" },
  { title: "40 Modi Per Non Procrastinare", path: "/documentation/quaranta-modi-per-non-procrastinare" },
  { title: "Video Motivazionali", path: "/documentation/video-motivazionali" },
  { title: "Video Per La Meditazione", path: "/documentation/video-per-la-meditazione" },
  { title: "Come Diventare Manager Leader Di Te Stesso", path: "/documentation/come-diventare-manager-leader-di-te-stesso" },
  { title: "Mindset Musicale", path: "/documentation/mindset-musicale" },
  { title: "Protocollo Business Artist", path: "/documentation/protocollo-business-artist" },
  { title: "Tecniche Di Songwriting", path: "/documentation/tecniche-di-songwriting" },
  { title: "Marketing Musicale", path: "/documentation/marketing-musicale" },
  { title: "Strategia Di Marketing Musicale", path: "/documentation/strategia-di-marketing-musicale" },
  { title: "Attiva La Tua Calamita Energetica", path: "/documentation/attiva-la-tua-calamita-energetica" },
];

const Documentation: React.FC = () => {
  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h1">Documentazione</Typography>
      </Box>
      <Box mt={4}>
        <List sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr"
          },
          gap: 2
        }}>
          {documentations.map((doc, index) => (
            <ListItem 
              key={index} 
              component={Link} 
              to={doc.path}
              sx={{
                backgroundColor: "white",
                padding: "16px",
                borderRadius: "8px",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "primary.main",
                  transform: "translateX(8px)",
                  "& .MuiListItemText-primary": {
                    color: "white"
                  }
                }
              }}
            >
              <ListItemText 
                primary={`${index + 1}. ${doc.title}`}
                primaryTypographyProps={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  color: "#333333"
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Documentation;
