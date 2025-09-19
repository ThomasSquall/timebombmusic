import { useEffect, useState } from "react";
import { Todo } from "types/Todo";
import { getAllTodos, getTodos } from "services/todos.service";
import { useAuth } from "contexts/jwt-provider";

type UseCalendarReturnType = {
  todos?: Todo[];
};

export const useCalendar = (isAdmin: boolean | undefined): UseCalendarReturnType => {
  const [todos, setTodos] = useState<Todo[]>();

  const { getAccessTokenSilently } = useAuth();

  useEffect(() => {
    (async () => {
      if (isAdmin === undefined) return; // Evita di eseguire la chiamata se `isAdmin` è undefined
      
      const accessToken = await getAccessTokenSilently();

      let _todos: Todo[] = [];
      if (isAdmin) {
        _todos = (await getAllTodos({ accessToken })).data as Todo[];
      } else {
        _todos = (await getTodos({ accessToken })).data as Todo[];
      }

      setTodos(_todos);
    })();
  }, [isAdmin, getAccessTokenSilently]); // Aggiunto `isAdmin` come dipendenza

  return {
    todos,
  };
};