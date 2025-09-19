import { Contact, Message, Participant, Thread } from "types/Chat";
import { useCallback, useEffect, useState } from "react";
import {
  getThreads,
  getThread,
  getContacts,
  searchContacts,
} from "services/chat.service";
import { useAuth } from "contexts/jwt-provider";
import { useSearchParams } from "react-router-dom";

type UseChatReturnType = {
  thread?: Thread;
  threads: Thread[];
  contacts: Contact[];
  participants: Participant[];
  activeThreadId: string;
  searchContacts: typeof searchContacts;
  addMessageToThread: (message: Message) => void;
};

export const useChat = (): UseChatReturnType => {
  const [thread, setThread] = useState<Thread>();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const { getAccessTokenSilently } = useAuth();

  const [searchParams] = useSearchParams();

  const addMessageToThread = useCallback(
    (message: Message) => {
      if (!thread) {
        return;
      }

      if (thread.messages.find(m => "" + m.id === "" + message.id)) {
        return;
      }

      const _thread = { ...thread };
      _thread.messages.push(message);

      setThread(_thread);
    },
    [thread, setThread]
  );

  useEffect(() => {
    (async () => {
      const accessToken = await getAccessTokenSilently();
      const _threads = await getThreads({ accessToken });

      setThreads(_threads.data as Thread[]);
    })();
  }, [setThreads, getAccessTokenSilently]);

  useEffect(() => {
    (async () => {
      const threadId = searchParams.get("threadId");

      if (!threadId) {
        return;
      }

      const accessToken = await getAccessTokenSilently();
      const _thread = (await getThread({ accessToken, threadId }))
        .data as Thread;

      setThread(_thread);
      setParticipants(_thread.participants as Participant[]);
    })();
  }, [setThread, searchParams, getAccessTokenSilently]);

  useEffect(() => {
    (async () => {
      const accessToken = await getAccessTokenSilently();
      const _contacts = await getContacts({ accessToken });

      setContacts(_contacts.data as Contact[]);
    })();
  }, [setContacts, getAccessTokenSilently]);

  return {
    thread,
    threads,
    contacts,
    participants,
    activeThreadId: thread?.id ?? "",
    searchContacts,
    addMessageToThread
  };
};
