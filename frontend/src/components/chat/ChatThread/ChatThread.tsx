import type { FC } from "react";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Box, Divider } from "@mui/material";
import type { Message } from "types/Chat";
import { Scrollbar } from "components/core/Scrollbar";
import { ChatMessageAdd } from "components/chat/ChatMessageAdd";
import { ChatMessages } from "components/chat/ChatMessages";
import { ChatThreadToolbar } from "components/chat/ChatThreadToolbar";
import { use } from "hooks/use";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/jwt-provider";
import { useWebsockets } from "../../../hooks/websockets";
import { sendMessage } from "../../../services/chat.service";

interface ChatThreadProps {
  threadId: string;
}

export const ChatThread: FC<ChatThreadProps> = (props) => {
  const { threadId } = props;
  const navigate = useNavigate();
  const { thread, participants, addMessageToThread } = use.useChat;
  const messagesRef = useRef<any>(null);
  const { getAccessTokenSilently } = useAuth();

  const getDetails = async (): Promise<void> => {
    try {
      // @ts-ignore
      /*const threadId: string = dispatch(
        getThread({
          threadId,
        })
      );

      dispatch(
        setActiveThread({
          threadId,
        })
      );
      dispatch(
        markThreadAsSeen({
          threadId,
        })
      );
      
       */
    } catch (err) {
      // If thread key is not a valid key (thread id or contact id)
      // the server throws an error, this means that the user tried a shady route
      // and we redirect them on the home view
      console.error(err);
      navigate(`/dashboard/chat`);
    }
  };

  useEffect(
    () => {
      getDetails();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [threadId]
  );

  useEffect(() => {
    // Scroll to bottom of the messages after loading the thread
    if (thread?.messages && messagesRef?.current) {
      const scrollElement = messagesRef.current.getScrollElement();

      scrollElement.scrollTop = messagesRef.current.el.scrollHeight;
    }
  }, [thread]);

  const { echo } = useWebsockets();

  useEffect(() => {
    if (!echo) {
      return;
    }

    echo
      .channel("thread." + thread?.id)
      .listen("NewMessage", ({ message }: { message: Message }) => {
        addMessageToThread(message);
      });
  }, [addMessageToThread, echo, thread]);

  // If we have the thread, we use its ID to add a new message
  // Otherwise we use the recipients IDs. When using participant IDs, it means that we have to
  // get the thread.
  const handleSendMessage = async (body: string): Promise<void> => {
    await (async () => {
      const accessToken = await getAccessTokenSilently();
      await sendMessage({ accessToken, threadId, body });
    })();
    /*

  try {
    if (thread) {
      dispatch(
        addMessage({
          threadId: thread.id,
          body,
        })
      );
    } else {
      const recipientIds = participants
        .filter((participant) => participant.id !== user.id)
        .map((participant) => participant.id);

      // @ts-ignore
      const threadId: string = dispatch(
        addMessage({
          recipientIds,
          body,
        })
      );

      dispatch(
        getThread({
          threadId: threadId,
        })
      );
      // @ts-ignore
      dispatch(setActiveThread(threadId));
    }

    // Scroll to bottom of the messages after adding the new message
    if (messagesRef?.current) {
      const scrollElement = messagesRef.current.getScrollElement();

      scrollElement.scrollTo({
        top: messagesRef.current.el.scrollHeight,
        behavior: "smooth",
      });
    }
  } catch (err) {
    console.error(err);
  }
     */
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        overflow: "hidden",
      }}
      {...props}
    >
      <ChatThreadToolbar participants={participants} />
      <Box
        sx={{
          backgroundColor: "background.default",
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <Scrollbar ref={messagesRef} sx={{ maxHeight: "100%" }}>
          <ChatMessages
            messages={thread?.messages || []}
            participants={thread?.participants || []}
          />
        </Scrollbar>
      </Box>
      <Divider />
      <ChatMessageAdd disabled={false} onSend={handleSendMessage} />
    </Box>
  );
};

ChatThread.propTypes = {
  threadId: PropTypes.string.isRequired,
};
