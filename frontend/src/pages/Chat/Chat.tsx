import React, { useEffect, useRef, useState } from "react";
import { Container, Theme } from "@mui/material";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChatComposer } from "components/chat/ChatComposer";
import { ChatSidebar } from "components/chat/ChatSidebar";
import { ChatThread } from "components/chat/ChatThread";
import { ChatAlt2 as ChatAlt2Icon } from "icons/chat-alt2";
import { MenuAlt4 as MenuAlt4Icon } from "icons/menu-alt-4";
import { useSearchParams } from "react-router-dom";

const ChatInner = styled("div", {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  overflow: "hidden",
  [theme.breakpoints.up("md")]: {
    marginLeft: -380,
  },
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    [theme.breakpoints.up("md")]: {
      marginLeft: 0,
    },
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// In our case there two possible routes
// one that contains /chat and one with a chat?threadId={{threadId}}
// if threadId does not exist, it means that the chat is in compose mode

export const Chat = (): React.ReactElement => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchParams] = useSearchParams();
  const compose =
    (searchParams.get("compose") as string | undefined) === "true";
  const threadId = searchParams.get("threadId") as string | undefined;
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"), {
    noSsr: true,
  });

  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"), {
    noSsr: true,
  });

  useEffect(() => {
    if (!mdUp) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [mdUp]);

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const view = threadId ? "thread" : compose ? "compose" : "blank";

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Box
          ref={rootRef}
          sx={{
            display: "flex",
            position: "absolute",
            top: 64,
            right: 0,
            bottom: 0,
            left: lgUp ? 279 : 0,
          }}
        >
          <ChatSidebar
            containerRef={rootRef}
            onClose={handleCloseSidebar}
            open={isSidebarOpen}
          />
          <ChatInner open={isSidebarOpen}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "primary.white",
                borderBottomColor: "divider",
                borderBottomStyle: "solid",
                borderBottomWidth: 1,
                display: "flex",
                p: 2,
              }}
            >
              <IconButton onClick={handleToggleSidebar}>
                <MenuAlt4Icon fontSize="small" />
              </IconButton>
            </Box>
            {view === "thread" && <ChatThread threadId={threadId!} />}
            {view === "compose" && <ChatComposer />}
            {view === "blank" && (
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexGrow: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    height: 56,
                    width: 56,
                  }}
                >
                  <ChatAlt2Icon fontSize="small" />
                </Avatar>
                <Typography
                  color="textSecondary"
                  sx={{ mt: 2 }}
                  variant="subtitle1"
                >
                  Avvia conversazioni di valore!
                </Typography>
              </Box>
            )}
          </ChatInner>
        </Box>
      </Container>
    </Box>
  );
};

export default Chat;
