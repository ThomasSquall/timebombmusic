import { Box, Button, Collapse, ListItem } from "@mui/material";
import { ChevronRight as ChevronRightIcon } from "icons/chevron-right";
import { ChevronDown as ChevronDownIcon } from "icons/chevron-down";
import { useStyles } from "hooks/dashboard/useStyles";
import React, { ReactNode, useCallback, useState } from "react";

interface SidebarItemBranchProps {
  children?: ReactNode;
  depth: number;
  active?: boolean;
  open?: boolean;
  icon?: ReactNode;
  title: string;
  info?: ReactNode;
};

export const SidebarItemBranch = ({
  children,
  depth,
  active,
  open: openProp,
  icon,
  title,
  info,
  ...other
}: SidebarItemBranchProps) => {
  const [open, setOpen] = useState<boolean>(!!openProp);

  const { paddingLeft } = useStyles({ depth });

  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, [setOpen]);

  return (
    <ListItem
      disableGutters
      sx={{
        display: "block",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...other}
    >
      <Button
        endIcon={
          !open ? (
            <ChevronRightIcon fontSize="small" />
          ) : (
            <ChevronDownIcon fontSize="small" />
          )
        }
        disableRipple
        onClick={handleToggle}
        startIcon={icon}
        sx={{
          color: active ? "secondary.main" : "neutral.300",
          justifyContent: "flex-start",
          pl: `${paddingLeft}px`,
          pr: 3,
          textAlign: "left",
          textTransform: "none",
          width: "100%",
          "&:hover": {
            backgroundColor: "rgba(255,255,255, 0.08)",
          },
          "& .MuiButton-startIcon": {
            color: active ? "secondary.main" : "neutral.400",
          },
          "& .MuiButton-endIcon": {
            color: "neutral.400",
          },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>{title}</Box>
        {info}
      </Button>
      <Collapse in={open} sx={{ mt: 0.5 }}>
        {children}
      </Collapse>
    </ListItem>
  );
};
