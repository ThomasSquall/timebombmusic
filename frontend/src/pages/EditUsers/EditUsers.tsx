import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { User } from "../../types/User";
import { getUser } from "../../services/user.service";
import { useAuth } from "contexts/jwt-provider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Typography, Link as MUILink, Avatar, Chip } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import { getInitials } from "../../utils/get-initials";
import { UserEditForm } from "components/users/UserEditForm";
export const EditUsers = (): React.ReactElement => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();

  const { getAccessTokenSilently } = useAuth();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const accessToken = await getAccessTokenSilently();
        const formData = new FormData();
        formData.append("avatar", file);
        // Adjust the URL to your server endpoint
        const response = await fetch(process.env.REACT_APP_API_SERVER_URL + "/upload-avatar", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        });
        const data = await response.json();
        setUser((prevUser) => ({ ...(prevUser as User), avatar: data.avatar }));
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

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
        backgroundColor: "background.default",
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ mb: 4 }}>
          <Link to="/users">
            <MUILink
              color="textPrimary"
              component="h2"
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
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            overflow: "hidden",
          }}
        >
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="avatar-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="avatar-upload">
            <Avatar
              src={process.env.REACT_APP_ASSETS_SERVER_URL + user.avatar}
              sx={{
                height: 64,
                mr: 2,
                width: 64,
                cursor: "pointer",
              }}
            >
              {getInitials(user.name == "" ? user.email : user.name)}
            </Avatar>
          </label>
          <div>
            <Typography noWrap variant="h4">
              {user.name == "" ? user.email : user.name}
            </Typography>
            {/* <Box
              sx={{
                alignItems: "center",
                display: "flex",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <Typography variant="subtitle2">auth0_id:</Typography>
              <Chip label={user.auth0_id} size="small" sx={{ ml: 1 }} />
            </Box> */}
          </div>
        </Box>
        <Box mt={3}>
          <UserEditForm user={user} />
        </Box>
      </Container>
    </Box>
  );
};
