import type { FC } from "react";
import PropTypes from "prop-types";
import type { AppBarProps } from "@mui/material";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Menu as MenuIcon } from "icons/menu";
import { AccountButton } from "./AccountButton";
import { Link } from "react-router-dom";

interface NavbarProps extends AppBarProps {
  onOpenSidebar?: () => void;
}

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === "light"
    ? {
        boxShadow: theme.shadows[3],
      }
    : {
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        boxShadow: "none",
      }),
}));

export const Navbar: FC<NavbarProps> = (props) => {
  const { onOpenSidebar, ...other } = props;

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
            backgroundColor: "primary.white",
          }}
        >
          <IconButton
            onClick={onOpenSidebar}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <AccountButton />
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

Navbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};
