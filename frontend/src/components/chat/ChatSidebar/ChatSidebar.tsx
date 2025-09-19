import type { ChangeEvent, FC, MutableRefObject } from "react";
import React, { useState } from "react";
import PropTypes from "prop-types";
import type { Theme } from "@mui/material";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Plus as PlusIcon } from "../../../icons/plus";
import { X as XIcon } from "../../../icons/x";
import type { Contact, Participant, Thread } from "types/Chat";
import { Scrollbar } from "components/core/Scrollbar";
import { ChatContactSearch } from "components/chat/ChatContactSearch";
import { ChatThreadItem } from "components/chat/ChatThread";
import { use } from "hooks/use";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "contexts/jwt-provider";
import { useUser } from "../../../hooks/user";
import { getThreadByUser } from "../../../services/chat.service";

interface ChatSidebarProps {
  containerRef?: MutableRefObject<HTMLDivElement | null>;
  onClose?: () => void;
  open?: boolean;
}

const ChatSidebarDesktop = styled(Drawer)({
  flexShrink: 0,
  width: 380,
  "& .MuiDrawer-paper": {
    position: "relative",
    width: 380,
  },
});

const ChatSidebarMobile = styled(Drawer)({
  maxWidth: "100%",
  width: 380,
  "& .MuiDrawer-paper": {
    height: "calc(100% - 64px)",
    maxWidth: "100%",
    top: 64,
    width: 380,
  },
});

export const ChatSidebar: FC<ChatSidebarProps> = (props) => {
  const { containerRef, onClose, open, ...other } = props;
  const { threads, activeThreadId } = use.useChat;
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Contact[]>([]);
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const { searchContacts } = use.useChat;
  const { getAccessTokenSilently } = useAuth();
  const user = useUser();

  const handleGroupClick = (): void => {
    if (!mdUp) {
      onClose?.();
    }
  };

  const handleSearchClickAway = (): void => {
    setIsSearchFocused(false);
    setSearchQuery("");
  };

  const handleSearchChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    try {
      const { value: query } = event.target;

      setSearchQuery(query);

      if (query) {
        const accessToken = await getAccessTokenSilently();
        const _contacts = await searchContacts({ accessToken, query });

        setSearchResults(_contacts.data);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchFocus = (): void => {
    setIsSearchFocused(true);
  };

  const handleSearchSelect = (result: Contact): void => {
    setIsSearchFocused(false);
    setSearchQuery("");

    if (!mdUp) {
      onClose?.();
    }

    (async () => {
      const accessToken = await getAccessTokenSilently();
      const thread = (await getThreadByUser({ accessToken, id: result.id }))
        .data as Thread;

      navigate(`/chat?threadId=${thread.id}`);
    })();
  };

  const handleSelectThread = (threadId: string): void => {
    if (!mdUp) {
      onClose?.();
    }

    navigate(`/chat?threadId=${threadId}`);
  };

  const content = (
    <div>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          p: 2,
        }}
      >
        <Typography variant="h5">Chat</Typography>
        <Box sx={{ flexGrow: 1 }} />
        {/*
        <Link to="/chat?compose=true">
          <Button
            component="h2"
            onClick={handleGroupClick}
            startIcon={<PlusIcon />}
            variant="contained"
          >
            Group
          </Button>
        </Link>
        */}
        <IconButton
          onClick={onClose}
          sx={{
            display: {
              sm: "none",
            },
            ml: 2,
          }}
        >
          <XIcon fontSize="small" />
        </IconButton>
      </Box>
      <ChatContactSearch
        isFocused={isSearchFocused}
        onChange={handleSearchChange}
        onClickAway={handleSearchClickAway}
        onFocus={handleSearchFocus}
        onSelect={handleSearchSelect}
        query={searchQuery}
        results={searchResults}
      />
      <Box
        sx={{
          borderTopColor: "divider",
          borderTopStyle: "solid",
          borderTopWidth: 1,
          display: isSearchFocused ? "none" : "block",
        }}
      >
        <Scrollbar>
          <List disablePadding>
            {threads?.map((thread) => (
              <ChatThreadItem
                active={activeThreadId === thread.id}
                key={thread.id}
                onSelect={(): void => handleSelectThread(thread.id as string)}
                thread={thread}
              />
            ))}
          </List>
        </Scrollbar>
      </Box>
    </div>
  );

  if (mdUp) {
    return (
      <ChatSidebarDesktop
        anchor="left"
        open={open}
        SlideProps={{ container: containerRef?.current }}
        variant="persistent"
        {...other}
      >
        {content}
      </ChatSidebarDesktop>
    );
  }

  return (
    <ChatSidebarMobile
      anchor="left"
      ModalProps={{ container: containerRef?.current }}
      onClose={onClose}
      open={open}
      SlideProps={{ container: containerRef?.current }}
      variant="temporary"
      {...other}
    >
      {content}
    </ChatSidebarMobile>
  );
};

ChatSidebar.propTypes = {
  containerRef: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
