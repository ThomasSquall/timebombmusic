import { useChat } from "./chat";
import { useUser } from "./user";
import { ApiResponse } from "../models/api-response";
import { Message } from "../types/Chat";

export const use: { useChat: ReturnType<typeof useChat>, useUser: ReturnType<typeof useUser> } = {
  useChat: {
    thread: undefined,
    participants: [],
    searchContacts: ({
      accessToken,
      query,
    }: {
      accessToken: string;
      query: string;
    }) => new Promise<ApiResponse>({} as any),
    activeThreadId: "",
    contacts: [],
    threads: [],
    addMessageToThread: (message: Message) => {},
  },
  useUser: {
    avatar: '',
    email: '',
    name: '',
    id: 0,
    is_admin: false,
    auth0_id: '',
    impersonator: null,
    isImpersonating: false,
  }
};
