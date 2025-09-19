import type { FC } from "react";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import type { Theme } from "@mui/material";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Scrollbar } from "components/core/Scrollbar";
import { SidebarSection } from "./SidebarSection";
import { Section, useSections } from "hooks/dashboard/useSections";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  onClose?: () => void;
  open?: boolean;
}

export const Sidebar: FC<SidebarProps> = (props) => {
  const { onClose, open } = props;
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const sections = useSections();
  const location = useLocation();
  const previousPathnameRef = useRef(location.pathname);

  useEffect(() => {
    if (previousPathnameRef.current !== location.pathname) {
      previousPathnameRef.current = location.pathname;

      if (!lgUp && open) {
        onClose?.();
      }
    }
  }, [lgUp, location.pathname, onClose, open]);

  const content = (
    <>
      <Scrollbar
        sx={{
          height: "100%",
          "& .simplebar-content": {
            height: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div>
            <Box sx={{ p: 3 }}>
              <Link
                to={"/"}
                style={{ display: "block", width: "100%", textAlign: "center" }}
              >
                {/* <Logo /> */}
                <img
                  style={{ width: "150px" }}
                  src="/logo_tbm.png"
                  alt="Time Bomb Music"
                />
              </Link>
            </Box>
          </div>
          <Divider
            sx={{
              borderColor: "#2D3748", // dark divider
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {sections.map((section: Section) => (
              <SidebarSection
                key={section.title}
                path={"/" + section.title.toLowerCase()}
                sx={{
                  mt: 2,
                  "& + &": {
                    mt: 2,
                  },
                }}
                {...section}
              />
            ))}
          </Box>
          <Divider
            sx={{
              borderColor: "#2D3748", // dark divider
            }}
          />
          <Box sx={{ p: 2 }}>
            <Typography color="neutral.100" variant="subtitle2">
              {"Serve aiuto?"}
            </Typography>
            <Typography color="neutral.100" variant="body2">
              {"Controlla la documentazione"}
            </Typography>
            <Link to="/documentation">
              <Button
                component="h1"
                fullWidth
                sx={{ mt: 2, backgroundColor: "rgba(0,0,0,0.25)", color: "white" }}
                variant="contained"
              >
                {"Documentazione"}
              </Button>
            </Link>
            <Link to="https://wa.me/393405257622">
              <Button
                component="h1"
                fullWidth
                sx={{ mt: 2 }}
                variant="contained"
                className={"pop-animation"}
              >
                {"Prenota una consulenza"}
              </Button>
            </Link>
          </Box>
        </Box>
      </Scrollbar>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "primary.main",
            borderRightColor: "divider",
            borderRightStyle: "solid",
            borderRightWidth: (theme) =>
              theme.palette.mode === "dark" ? 1 : 0,
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "primary.main",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
