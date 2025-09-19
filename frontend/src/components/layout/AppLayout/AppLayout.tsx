import type { FC, ReactNode } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Sidebar } from "components/layout/Sidebar";
import { Box } from "@mui/material";
import { Navbar } from "components/layout/Navbar";

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
