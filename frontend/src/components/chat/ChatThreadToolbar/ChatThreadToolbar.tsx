import type { FC } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNowStrict } from "date-fns";
import { Avatar, AvatarGroup, Box, Typography } from "@mui/material";
import type { Participant } from "types/Chat";
import { useUser } from "../../../hooks/user";

interface ChatThreadToolbarProps {
  participants: Participant[];
}

export const ChatThreadToolbar: FC<ChatThreadToolbarProps> = (props) => {
  const { participants, ...other } = props;
  const user = useUser();

  const recipients = participants.filter(
    (participant) => participant.id !== "" + user?.id
  );
  const name = recipients
    .reduce(
      (names: string[], participant) => [
        ...names,
        participant.name ?? participant.email,
      ],
      []
    )
    .join(", ");

  return (
    <Box
      sx={{
        alignItems: "center",
        backgroundColor: "primary.white",
        borderBottomColor: "divider",
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        display: "flex",
        flexShrink: 0,
        minHeight: 64,
        px: 2,
        py: 1,
      }}
      {...other}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
        }}
      >
        <AvatarGroup
          max={2}
          sx={{
            ...(recipients.length > 1 && {
              "& .MuiAvatar-root": {
                height: 30,
                width: 30,
                "&:nth-of-type(2)": {
                  mt: "10px",
                },
              },
            }),
          }}
        >
          {recipients.map((recipient) => (
            <Avatar key={recipient.id} src={recipient.avatar || undefined} />
          ))}
        </AvatarGroup>
        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle2">{name}</Typography>
          {Boolean(recipients.length === 1 && recipients[0].lastActivity) && (
            <Typography color="textSecondary" variant="caption">
              Last active{" "}
              {formatDistanceToNowStrict(recipients[0].lastActivity!, {
                addSuffix: true,
              })}
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );
};

ChatThreadToolbar.propTypes = {
  // @ts-ignore
  participants: PropTypes.array,
};

ChatThreadToolbar.defaultProps = {
  participants: [],
};
