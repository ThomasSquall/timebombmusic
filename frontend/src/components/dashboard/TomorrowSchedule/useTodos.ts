import { Todo } from "types/Todo";
import { useEffect, useState } from "react";
import { getTomorrowTodos } from "../../../services/todos.service";
import { useAuth } from "contexts/jwt-provider";

const useTodos = (): Todo[] => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { getAccessTokenSilently } = useAuth();

  useEffect(() => {
    (async () => {
      const accessToken = await getAccessTokenSilently();
      const _todos = await getTomorrowTodos({
        accessToken,
      });

      setTodos(_todos.data as Todo[]);
    })();
  }, [getAccessTokenSilently, setTodos]);

  return todos;
};

export default useTodos;
