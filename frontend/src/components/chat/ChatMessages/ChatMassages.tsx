import type { FC } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import type { Message, Participant } from "types/Chat";
import { ChatMessage } from "components/chat/ChatMessage";
import { useUser } from "../../../hooks/user";
import { User } from "../../../types/User";
import { use } from "../../../hooks/use";

interface ChatMessagesProps {
  messages: Message[];
  participants: Participant[];
}

export const ChatMessages: FC<ChatMessagesProps> = (props) => {
  const { messages: m, participants: p, ...other } = props;
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`
  const user = useUser() as User;

  const { thread } = use.useChat;
  const messages = thread?.messages ?? [];
  const participants = thread?.participants ?? [];

  if (user) {
    user.avatar = "/static/mock-images/avatars/avatar-anika_visser.png";
    user.name = "Anika Visser";
  }

  return (
    <Box sx={{ p: 2 }} {...other}>
      {messages.map((message) => {
        const participant = participants.find(
          (_participant) => _participant.id === message.author_id
        );
        let authorAvatar: string | null;
        let authorName: string;
        let authorType: "user" | "contact";

        // Since chat mock db is not synced with external auth providers
        // we set the user details from user auth state instead of thread participants
        if ("" + message.author_id === "" + user?.id) {
          authorAvatar = user?.avatar ?? "";
          authorName = "Me";
          authorType = "user";
        } else {
          authorAvatar = participant?.avatar ?? "";
          authorName = participant?.name ?? (participant?.email ?? "");
          authorType = "contact";
        }

        return (
          <ChatMessage
            authorAvatar={authorAvatar}
            authorName={authorName}
            authorType={authorType}
            body={message.body}
            contentType={message.content_type}
            createdAt={message.created_at}
            key={message.id}
          />
        );
      })}
    </Box>
  );
};

ChatMessages.propTypes = {
  // @ts-ignore
  messages: PropTypes.array,
  // @ts-ignore
  participants: PropTypes.array,
};
