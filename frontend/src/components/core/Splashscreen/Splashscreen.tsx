import React from "react";
import { Box } from "@mui/material";
import { Logo } from "components/core/Logo";
import { keyframes } from "@emotion/react";

const bounce1 = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 1px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`;

const bounce3 = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 3px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`;

export const Splashscreen = (): React.ReactElement => (
  <Box
    sx={{
      alignItems: "center",
      backgroundColor: "#3cbdc9",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      justifyContent: "center",
      left: 0,
      p: 3,
      position: "fixed",
      top: 0,
      width: "100vw",
      zIndex: 2000,
    }}
  >
    <img 
      style={{ 
        width: '200px', 
        animation: `${bounce1} 1s ease-in-out infinite`
      }} 
      src="/logo_tbm.png" 
      alt="Logo" 
    />
  </Box>
);
