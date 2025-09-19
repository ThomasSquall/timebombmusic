import type { FC } from "react";
import { useState } from "react";
import { Box, Divider } from "@mui/material";
import type { Contact } from "types/Chat";
import { ChatComposerToolbar } from "./ChatComposerToolbar";
import { ChatMessageAdd } from "components/chat/ChatMessageAdd";
import { useNavigate } from "react-router-dom";
import { useChatComposer } from "./useChatComposer";

interface ChatComposerProps {}

export const ChatComposer: FC<ChatComposerProps> = (props) => {
  const [recipients, setRecipients] = useState<Contact[]>([]);
  const navigate = useNavigate();
  const { createThread } = useChatComposer();

  const handleAddRecipient = (recipient: Contact): void => {
    setRecipients((prevState) => {
      const exists = prevState.find(
        (_recipient) => _recipient.id === recipient.id
      );

      if (!exists) {
        return [...recipients, recipient];
      }

      return recipients;
    });
  };

  const handleRemoveRecipient = (recipientId: string): void => {
    setRecipients((prevState) =>
      prevState.filter((recipient) => recipient.id !== recipientId)
    );
  };

  const handleSendMessage = async (body: string): Promise<void> => {
    try {
      const threadId = createThread(recipients, body);
      navigate(`/chat?threadId=${threadId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
      {...props}
    >
      <ChatComposerToolbar
        onAddRecipient={handleAddRecipient}
        onRemoveRecipient={handleRemoveRecipient}
        recipients={recipients}
      />
      <Box
        sx={{
          backgroundColor: "background.default",
          flexGrow: 1,
        }}
      />
      <Divider />
      <ChatMessageAdd
        disabled={recipients.length === 0}
        onSend={handleSendMessage}
      />
    </Box>
  );
};
