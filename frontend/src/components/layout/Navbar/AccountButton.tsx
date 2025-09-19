import React, { useRef, useState } from "react";
import { Avatar, Box, ButtonBase } from "@mui/material";
import { AccountPopover } from "./AccountPopover";
import { useAuth } from "../../../contexts/jwt-provider";
import { getInitials } from "../../../utils/get-initials";

export const AccountButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  // To get the user from the authContext, you can use
  const { user } = useAuth();

  const handleOpenPopover = (): void => {
    setOpenPopover(true);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(false);
  };

  if (!user) {
    return <></>;
  }

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{
          alignItems: "center",
          display: "flex",
          ml: 2,
        }}
      >
        <Avatar
          src={
            user.avatar !== ""
              ? process.env.REACT_APP_ASSETS_SERVER_URL + user.avatar
              : "/static/mock-images/avatars/avatar-anika_visser.png"
          }
          sx={{
            height: 40,
            mr: 2,
            width: 40,
            cursor: "pointer",
          }}
        >
          {getInitials(user.name === "" ? user.email : user.name)}
        </Avatar>
      </Box>
      <AccountPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};
