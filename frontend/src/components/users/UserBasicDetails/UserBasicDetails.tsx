import React, { FC } from "react";
import {
  Box,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  Theme,
  useMediaQuery,
} from "@mui/material";
import PropertyList, { PropertyListItem } from "components/core/PropertyList";
import { PencilAlt as PencilAltIcon } from "icons/pencil-alt";
import { Link } from "react-router-dom";

interface UserBasicDetailsProps {
  email: string;
  name?: string;
  user_id: number;
}

export const UserBasicDetails: FC<UserBasicDetailsProps> = (props) => {
  const { name, email, user_id, ...other } = props;

  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const align = mdUp ? "horizontal" : "vertical";

  return (
    <Card {...props} sx={{ backgroundColor: "white" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 4,
        }}
      >
        <span className="MuiTypography-root MuiTypography-h6 MuiCardHeader-title" style={{ fontWeight: 600 }}>
          Dettagli dell'utente
        </span>

        <Link to={`/users/${user_id}/edit`}>
          <IconButton
            sx={{
              backgroundColor: "#ffffff",
              color: "#3cbdc9",
              "&:hover": {
                backgroundColor: "#eeeeee",
              },
              fontSize: "0.875rem",
              fontWeight: 600,
              border: "1px solid #3cbdc9",
            }}
          >
            <PencilAltIcon fontSize={"small"} sx={{ color: "#3cbdc9", mr: 1 }} />
            Modifica
          </IconButton>
        </Link>
      </Box>

      <Divider />
      <PropertyList>
        <PropertyListItem align={align} divider label="Nome" value={name} />
        <PropertyListItem align={align} label="Email" value={email} />
      </PropertyList>
    </Card>
  );
};
