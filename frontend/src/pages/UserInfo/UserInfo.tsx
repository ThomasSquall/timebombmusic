import React, { useCallback, useEffect, useState } from "react";
import { User } from "../../types/User";
import { useAuth } from "contexts/jwt-provider";
import { getUser } from "../../services/user.service";
import { useParams } from "react-router";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  Link as MUILink,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PencilAlt as PencilAltIcon } from "icons/pencil-alt";
import { getInitials } from "utils/get-initials";
import { UserBasicDetails } from "components/users";
import { UserTodos } from "../../components/users/UserTodos";

export const UserInfo = (): React.ReactElement => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);

  const { getAccessTokenSilently } = useAuth();

  const getEditUser = useCallback(async () => {
    if (id === undefined) {
      return;
    }

    try {
      const accessToken = await getAccessTokenSilently();
      const data = await getUser({ accessToken, id: parseInt(id) });

      setUser(data.data as User);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  useEffect(() => {
    void getEditUser();
  }, []);

  if (!user) {
    return <></>;
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <div>
          <Box sx={{ mb: 4 }}>
            <Link to="/users">
              <MUILink
                color="textPrimary"
                component="h1"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Utenti</Typography>
              </MUILink>
            </Link>
          </Box>
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid
              item
              sx={{
                alignItems: "center",
                display: "flex",
                overflow: "hidden",
              }}
            >
              <Avatar
                src={process.env.REACT_APP_ASSETS_SERVER_URL + user.avatar}
                sx={{
                  height: 64,
                  mr: 2,
                  width: 64,
                }}
              >
                {getInitials(user.name == "" ? user.email : user.name)}
              </Avatar>
              <div>
                <Typography variant="h4">
                  {user.name == "" ? user.email : user.name}
                </Typography>
                {/* <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle2">auth0_id:</Typography>
                  <Chip label={user.auth0_id} size="small" sx={{ ml: 1 }} />
                </Box> */}
              </div>
            </Grid>
          </Grid>
        </div>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <UserBasicDetails name={user.name} email={user.email} user_id={user.id} />
            </Grid>
            <Grid item xs={12}>
              <UserTodos todos={user.todos ?? []} user={user} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
