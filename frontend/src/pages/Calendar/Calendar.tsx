import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";
import "@fullcalendar/timeline/main.css";
import itLocale from "@fullcalendar/core/locales/it";
import React, { useEffect, useState } from "react";
import FullCalendar, { EventInput } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import timelinePlugin from "@fullcalendar/timeline";
import type { Theme } from "@mui/material";
import { Box, useMediaQuery } from "@mui/material";
import { CalendarEventDialog } from "components/calendar/CalendarEventDialog";
import { CalendarToolbar } from "components/calendar/CalendarToolbar";
import useCalendarHandles from "./useCalendarHandles";
import { FullCalendarWrapper } from "./index.style";
import { gtm } from "lib/gtm";
import { useCalendar } from "hooks/calendar";
import { useUser } from "hooks/user";
import { Todo } from "types/Todo";
import { getUser } from "services/user.service";
import { User } from "types/User";
import { getInitials } from "utils/get-initials";
import { useAuth } from "contexts/jwt-provider";

export const Calendar = () => {
  const user = useUser();
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const { todos } = useCalendar(user?.is_admin);

  const [userDetails, setUserDetails] = useState<{ [key: number]: User }>({});
  const { getAccessTokenSilently } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user?.is_admin) {
        const userMap: { [key: number]: User } = {};
        const accessToken = await getAccessTokenSilently();

        if (todos) {
          for (const todo of todos) {
            if (todo.user_id && !userMap[todo.user_id]) {
              const { data } = await getUser({ accessToken, id: todo.user_id });
              userMap[todo.user_id] = data as User;
            }
          }
        }
        setUserDetails(userMap);
      }
    };

    fetchUserDetails();
  }, [todos, getAccessTokenSilently, user?.is_admin]);

  const events: EventInput[] =
    todos?.map((todo) => {
      const user = userDetails[todo.user_id ?? 0];
      return {
        id: `${todo.id}`,
        title: todo.name,
        start: todo.due_date,
        end: todo.due_date,
        allDay: true,
        extendedProps: {
          notes: todo.notes,
          completed: todo.completed,
          userId: todo.user_id,
          userInitials: user ? getInitials(user.name) : "",
          userName: user ? user.name : "test",
        },
      };
    }) ?? [];

  const refetchTodos = async () => {
    console.log("aggiorna");
    // window.location.reload();
  };

  // const getUserInitials = (user) => {
  //   if (!user) return '';
  //   const names = user.name.split(' ');
  //   return names.map(name => name[0]).join('');
  // };

  const {
    calendarRef,
    date,
    dialog,
    view,
    handleDateToday,
    handleDelete,
    handleViewChange,
    handleDatePrev,
    handleDateNext,
    handleAddClick,
    handleNewEvent,
    handleRangeSelect,
    handleEventSelect,
    handleEventResize,
    handleEventDrop,
    handleCloseDialog,
    handleResize,
  } = useCalendarHandles();

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    handleResize();
  }, [handleResize, smDown]);

  const selectedEvent =
    dialog.eventId && events?.find((event) => event.id === dialog.eventId);

  const renderEventContent = (eventInfo: {
    event: { title: any; extendedProps: any };
  }) => {
    const { title, extendedProps } = eventInfo.event;

    // Array di colori per diversi utenti
    const colors = [
      "#3f51b5",
      "#f50057",
      "#00bcd4",
      "#4caf50",
      "#ff9800",
      "#9c27b0",
      "#2196f3",
      "#ff5722",
      "#607d8b",
      "#e91e63",
      "#9e9e9e",
      "#795548",
      "#673ab7",
      "#009688",
      "#f44336",
    ];

    // Usa l'ID utente come indice per selezionare il colore
    const colorIndex = (extendedProps.userId || 0) % colors.length;
    const backgroundColor = colors[colorIndex];

    return (
      <>
        <div
          style={{
            position: "absolute",
            top: "2px",
            right: "-3px",
            width: "8px",
            height: "8px",
            backgroundColor: "#00ff00",
            opacity: extendedProps.completed ? 1 : 0,
            borderRadius: "50%",
            margin: "4px",
          }}
        />
        <div
          className="fc-custom-event"
          style={{ opacity: extendedProps.completed ? 0.5 : 1 }}
        >
          {user?.is_admin ? (
            <div className="fc-custom-event-avatar">
              <div
                className="fc-custom-event-avatar-initials"
                style={{
                  backgroundColor,
                }}
              >
                {extendedProps.userInitials}
              </div>
              <p className="fc-custom-event-avatar-name">
                {extendedProps.userName}
              </p>
            </div>
          ) : null}
          <div className="fc-custom-event-title">
            <p>{title}</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: "white",
          flexGrow: 1,
          py: 8,
        }}
      >
        <CalendarToolbar
          date={date}
          onAddClick={handleAddClick}
          onDateNext={handleDateNext}
          onDatePrev={handleDatePrev}
          onDateToday={handleDateToday}
          onViewChange={handleViewChange}
          view={view}
          mobile={smDown}
        />
        <FullCalendarWrapper>
          <FullCalendar
            locale={itLocale}
            allDayMaintainDuration
            dayMaxEventRows={3}
            droppable={user?.is_admin}
            editable={user?.is_admin}
            eventDurationEditable={false}
            eventClick={handleEventSelect}
            eventDisplay="block"
            eventDrop={handleEventDrop}
            displayEventEnd={false}
            eventResizableFromStart={false}
            eventResize={handleEventResize}
            events={events}
            headerToolbar={false}
            height={800}
            initialDate={date}
            initialView={view}
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              listPlugin,
              timeGridPlugin,
              timelinePlugin,
            ]}
            ref={calendarRef}
            rerenderDelay={10}
            selectable={false}
            weekends
            eventContent={renderEventContent}
          />
        </FullCalendarWrapper>
      </Box>
      {/*event={selectedEvent === "" ? undefined : selectedEvent}*/}

      <CalendarEventDialog
        event={
          selectedEvent
            ? {
                id: selectedEvent.id,
                allDay: true,
                start: selectedEvent.start as number,
                end: selectedEvent.end as number,
                title: selectedEvent.title ?? "",
                description:
                  todos?.find((todo) => `${todo.id}` === selectedEvent.id)
                    ?.notes ?? "",
                completed:
                  todos?.find((todo) => `${todo.id}` === selectedEvent.id)
                    ?.completed ?? false,
              }
            : undefined
        }
        onAddComplete={async (event) => {
          await handleNewEvent(event);
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        }}
        onClose={handleCloseDialog}
        onDeleteComplete={async () => {
          await handleDelete(selectedEvent ? selectedEvent?.id ?? "" : "");
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        }}
        onEditComplete={handleCloseDialog}
        open={dialog.isOpen}
        range={dialog.range}
        refetchTodos={refetchTodos}
      />
    </>
  );
};

export default Calendar;
