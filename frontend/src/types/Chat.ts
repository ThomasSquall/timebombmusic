export interface Contact {
  id: string;
  avatar: string;
  isActive: boolean;
  lastActivity?: number;
  name: string;
  email: string;
}

interface Attachment {
  id: string;
  url: string;
}

export interface Message {
  id: string;
  attachments: Attachment[];
  body: string;
  content_type: string;
  created_at: number;
  author_id: string;
}

export interface Participant {
  id: string;
  avatar: string | null;
  lastActivity?: number;
  name: string;
  email: string;
}

export interface Thread {
  id?: string;
  messages: Message[];
  participants?: Participant[];
  type: "ONE_TO_ONE" | "GROUP";
  unreadCount?: number;
}
