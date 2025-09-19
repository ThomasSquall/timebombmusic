import { ReactNode } from "react";
import { Home as HomeIcon } from "icons/home";
import { Camera } from "icons/camera";
import { ChartPie as ChartPieIcon } from "icons/chart-pie";
import { ChatAlt2 as ChatAlt2Icon } from "icons/chat-alt2";
import { Users as UsersIcon } from "icons/users";
import { CalendarMonth } from "@mui/icons-material";

export interface Item {
  title: string;
  children?: Item[];
  chip?: ReactNode;
  icon?: ReactNode;
  path?: string;
}

export interface Section {
  title: string;
  items: Item[];
}

export const getSections = (): Section[] => [
  {
    title: "Generali",
    items: [
      {
        title: "Dashboard",
        path: "/",
        icon: <HomeIcon fontSize="small" />,
      },
      /*{
        title: "Video",
        path: "/video",
        icon: <Camera fontSize="small" />,
      },*/
      {
        title: "Calendario",
        path: "/calendar",
        icon: <CalendarMonth fontSize="small" />,
      },
      /*{
        title: "Chat",
        path: "/chat",
        icon: <ChatAlt2Icon fontSize="small" />,
      },*/
    ],
  },
];

export const getAdminSections = (): Section[] => [
  {
    title: "Amministrazione",
    items: [
      {
        title: "Utenti",
        path: "/users",
        icon: <UsersIcon fontSize="small" />,
      },
      {
        title: "Calendario",
        path: "/calendar",
        icon: <CalendarMonth fontSize="small" />,
      },
    ],
  },
];
