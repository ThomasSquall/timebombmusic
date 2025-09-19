import type { FC } from "react";
import React, { useRef, useState } from "react";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { DotsHorizontal as DotsHorizontalIcon } from "icons/dots-horizontal";

export type MoreMenuAction = {
  label: string;
  onClick: () => void;
  Icon: React.ReactNode;
};

interface MoreMenuProps {
  actions: MoreMenuAction[];
}

export const MoreMenu: FC<MoreMenuProps> = ({ actions, ...otherProps }) => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleMenuOpen = (): void => {
    setOpenMenu(true);
  };

  const handleMenuClose = (): void => {
    setOpenMenu(false);
  };

  return (
    <>
      <Tooltip title="More options">
        <IconButton onClick={handleMenuOpen} ref={anchorRef} {...otherProps}>
          <DotsHorizontalIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: "left",
          vertical: "top",
        }}
        onClose={handleMenuClose}
        open={openMenu}
        PaperProps={{
          sx: {
            maxWidth: "100%",
            width: 256,
            backgroundColor: "primary.main"
          },
        }}
        transformOrigin={{
          horizontal: "left",
          vertical: "top",
        }}
      >
        {actions.map((action) => (
          <MenuItem
            onClick={action.onClick}
            sx={{ "&.MuiListItem-root": { backgroundColor: "primary.main" } }}
          >
            <ListItemIcon>{action.Icon}</ListItemIcon>
            <ListItemText primary={action.label} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
