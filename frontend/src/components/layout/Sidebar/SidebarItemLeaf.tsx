import React, { ReactNode } from "react";
import { Box, Button, ListItem } from "@mui/material";
import { useStyles } from "hooks/dashboard/useStyles";
import { Link } from "react-router-dom";

interface SidebarItemLeafProps {
  depth: number;
  active?: boolean;
  icon?: ReactNode;
  title: string;
  info?: ReactNode;
  chip?: ReactNode;
  path?: string;
}

export const SidebarItemLeaf = ({
  depth,
  active,
  icon,
  title,
  info,
  path,
  chip,
}: SidebarItemLeafProps): React.ReactElement => {
  const { paddingLeft } = useStyles({ depth });

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
    >
      <Link to={path as string}>
        <Button
          component="h2"
          startIcon={icon}
          endIcon={chip}
          disableRipple
          sx={{
            borderRadius: 1,
            color: "primary.white",
            justifyContent: "flex-start",
            pl: `${paddingLeft}px`,
            pr: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            ...(active && {
              backgroundColor: "rgba(255,255,255, 0.08)",
              color: "primary.black",
              fontWeight: "fontWeightBold",
            }),
            "& .MuiButton-startIcon": {
              color: active ? "primary.black" : "primary.white",
            },
            "&:hover": {
              backgroundColor: "rgba(255,255,255, 0.08)",
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
          {info}
        </Button>
      </Link>
    </ListItem>
  );
};

export default SidebarItemLeaf;
