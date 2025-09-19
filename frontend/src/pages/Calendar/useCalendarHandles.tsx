import React, { useCallback, useRef, useState } from "react";
import { CalendarView } from "types/Calendar";
import FullCalendar, {
  DateSelectArg,
  EventClickArg,
  EventDropArg,
} from "@fullcalendar/react";
import { EventResizeDoneArg } from "@fullcalendar/interaction";
import { Theme, useMediaQuery } from "@mui/material";
import { changeTodoDate, createTodo, deleteTodo } from "services/todos.service";
import { useAuth } from "contexts/jwt-provider";
import { useUser } from "hooks/user";

interface Dialog {
  isOpen: boolean;
  eventId?: string;
  range?: {
    start: number;
    end: number;
  };
}

export type useCalendarHandlesReturn = {
  calendarRef: React.MutableRefObject<FullCalendar | null>;
  date: Date;
  dialog: Dialog;
  view: CalendarView;
  handleDateToday: () => void;
  handleViewChange: (newView: CalendarView) => void;
  handleDatePrev: () => void;
  handleDateNext: () => void;
  handleAddClick: () => void;
  handleNewEvent: (event: {
    title: string;
    description: string;
    start: number;
    user_id: number;
  }) => Promise<void>;
  handleRangeSelect: (arg: DateSelectArg) => void;
  handleDelete: (id: string) => Promise<void>;
  handleEventSelect: (arg: EventClickArg) => void;
  handleEventResize: (arg: EventResizeDoneArg) => Promise<void>;
  handleEventDrop: (arg: EventDropArg) => Promise<void>;
  handleCloseDialog: () => void;
  handleResize: () => void;
};

export const useCalendarHandles = (): useCalendarHandlesReturn => {
  const { getAccessTokenSilently } = useAuth();
  const user = useUser();

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const calendarRef = useRef<FullCalendar | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [dialog, setDialog] = useState<Dialog>({
    isOpen: false,
    eventId: undefined,
    range: undefined,
  });
  const [view, setView] = useState<CalendarView>(
    smDown ? "timeGridDay" : "dayGridMonth",
  );

  const handleDateToday = useCallback((): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  }, [setDate]);

  const handleViewChange = useCallback(
    (newView: CalendarView): void => {
      const calendarEl = calendarRef.current;

      if (calendarEl) {
        const calendarApi = calendarEl.getApi();

        calendarApi.changeView(newView);
        setView(newView);
      }
    },
    [setView],
  );

  const handleDatePrev = useCallback((): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  }, [setDate]);

  const handleDateNext = useCallback((): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  }, [setDate]);

  const handleAddClick = useCallback((): void => {
    if (!user?.is_admin) {
      return;
    }

    setDialog({
      isOpen: true,
    });
  }, [user?.is_admin]);

  const handleNewEvent = useCallback(
    async (event: {
      title: string;
      description: string;
      start: number;
      user_id: number;
    }): Promise<void> => {
      if (!user?.is_admin) {
        return;
      }

      const accessToken = await getAccessTokenSilently();

      await createTodo({
        accessToken,
        name: event.title ?? "",
        notes: event.description,
        due_date: `${event.start}` ?? Date.now(),
        user_id: user.id,
      });

      setDialog({
        isOpen: true,
      });
    },
    [getAccessTokenSilently, user?.id, user?.is_admin],
  );

  const handleRangeSelect = useCallback(
    (arg: DateSelectArg): void => {
      if (!user?.is_admin) {
        return;
      }

      const calendarEl = calendarRef.current;

      if (calendarEl) {
        const calendarApi = calendarEl.getApi();

        calendarApi.unselect();
      }

      setDialog({
        isOpen: true,
        range: {
          start: arg.start.getTime(),
          end: arg.end.getTime(),
        },
      });
    },
    [user?.is_admin],
  );

  const handleEventSelect = useCallback((arg: EventClickArg): void => {
    setDialog({
      isOpen: true,
      eventId: arg.event.id,
    });
  }, []);

  const handleEventResize = useCallback(
    async (arg: EventResizeDoneArg): Promise<void> => {
      /*
      try {
        dispatch(
          updateEvent({
            eventId: event.id,
            update: {
              allDay: event.allDay,
              start: event.start?.getTime(),
              end: event.end?.getTime(),
            },
          })
        );
      } catch (err) {
        console.error(err);
      }

       */
    },
    [],
  );

  const handleDelete = useCallback(
    async (id: string): Promise<void> => {
      const accessToken = await getAccessTokenSilently();

      await deleteTodo({
        accessToken,
        id: parseInt(id),
      });

      setDialog({
        isOpen: false,
      });
    },
    [getAccessTokenSilently],
  );

  const handleEventDrop = useCallback(
    async (arg: EventDropArg): Promise<void> => {
      const { event } = arg;
      const accessToken = await getAccessTokenSilently();

      const date = new Date((event.start ?? "") as string);

      const formattedDate = date
        .toLocaleDateString("it-IT")
        .replace(/\//g, "/");

      await changeTodoDate({
        id: parseInt(event.id),
        due_date: formattedDate,
        accessToken,
      });
    },
    [getAccessTokenSilently],
  );

  const handleCloseDialog = useCallback((): void => {
    setDialog({
      isOpen: false,
    });
  }, [setDialog]);

  const handleResize = useCallback(() => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = smDown ? "timeGridDay" : "dayGridMonth";

      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [calendarRef, smDown]);

  return {
    calendarRef,
    date,
    dialog,
    view,
    handleDateToday,
    handleNewEvent,
    handleDelete,
    handleViewChange,
    handleDatePrev,
    handleDateNext,
    handleAddClick,
    handleRangeSelect,
    handleEventSelect,
    handleEventResize,
    handleEventDrop,
    handleCloseDialog,
    handleResize,
  };
};

export default useCalendarHandles;
