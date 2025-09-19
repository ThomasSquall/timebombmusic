import React, { useEffect } from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/";
import { createTheme } from "theme";
import { CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { Splashscreen } from "components/core/Splashscreen";
import { use } from "hooks/use";
import { useChat } from "hooks/chat";
import { useUser } from "hooks/user";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { JWTProvider, useAuth } from "contexts/jwt-provider";
import { AppRoutes } from "./app-routes";

const InternalApp = (): React.ReactElement => {
  const { loading } = useAuth();
  use.useChat = useChat();
  use.useUser = useUser();

  if (loading) {
    return <Splashscreen />;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider
        theme={createTheme({
          direction: "ltr",
          responsiveFontSizes: true,
          mode: "light",
        })}
      >
        <CssBaseline />
        <Toaster position="top-center" />
        <InternalAppRoutes />
      </ThemeProvider>
    </LocalizationProvider>
  );
};

const InternalAppRoutes = () => {
  useEffect(() => {
    window.addEventListener("error", (e) => {
      if (e.message === "ResizeObserver loop limit exceeded") {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div"
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay"
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute("style", "display: none");
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute("style", "display: none");
        }
      }
    });
  }, []);

  return <AppRoutes />;
};

export const App = (): React.ReactElement => (
  <BrowserRouter>
    <JWTProvider>
      <InternalApp />
    </JWTProvider>
  </BrowserRouter>
);

export default App;
