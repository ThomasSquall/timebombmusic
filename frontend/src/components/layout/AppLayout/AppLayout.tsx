import type { FC, ReactNode } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Sidebar } from "components/layout/Sidebar";
import { Alert, Box, Button, Typography } from "@mui/material";
import { Navbar } from "components/layout/Navbar";
import { useAuth } from "contexts/jwt-provider";
import toast from "react-hot-toast";

interface DashboardLayoutProps {
  children?: ReactNode;
}

const AppLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

export const AppLayout: FC<DashboardLayoutProps> = (props) => {
  const { children } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const { user, stopImpersonation } = useAuth();

  const handleStopImpersonation = async () => {
    const { success, error } = await stopImpersonation();

    if (!success) {
      toast.error(error ?? "Impossibile tornare all'amministratore.");
      return;
    }

    toast.success("Accesso come amministratore ripristinato.");
  };

  return (
    <>
      <AppLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {user?.impersonator && (
            <Alert
              severity="warning"
              sx={{
                borderRadius: 0,
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
              }}
              action={
                <Button color="inherit" size="small" onClick={handleStopImpersonation}>
                  Torna a {user.impersonator.name || user.impersonator.email}
                </Button>
              }
            >
              <Typography variant="body2">
                Stai impersonando {user.name || user.email}
              </Typography>
            </Alert>
          )}
          {children}
        </Box>
      </AppLayoutRoot>
      <Navbar onOpenSidebar={(): void => setIsSidebarOpen(true)} />
      <Sidebar
        onClose={(): void => setIsSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
};
