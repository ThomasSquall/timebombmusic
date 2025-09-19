import { Todo } from "types/Todo";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "contexts/jwt-provider";
import { completeTodo, getTodayTodos } from "services/todos.service";
import { toast } from 'react-hot-toast';

type UseTodosReturnType = {
  UpdateTodoCompleted: (index: number, completed: boolean) => void;
  todos: Todo[];
};

const useTodos = (): UseTodosReturnType => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { getAccessTokenSilently } = useAuth();

  const UpdateTodoCompleted = useCallback(
    async (index: number, completed: boolean) => {
      const _todos: Todo[] = [...todos];
      _todos[index].completed = completed;

      const accessToken = await getAccessTokenSilently();
      await completeTodo({ accessToken, id: _todos[index].id, completed });
      toast.success("Todo aggiornata con successo");
      setTodos(_todos);
    },
    [todos, getAccessTokenSilently]
  );

  useEffect(() => {
    (async () => {
      const accessToken = await getAccessTokenSilently();
      const _todos = await getTodayTodos({
        accessToken,
      });

      setTodos((t) => _todos.data as Todo[]);
    })();
  }, [getAccessTokenSilently, setTodos]);

  return {
    UpdateTodoCompleted,
    todos,
  };
};

export default useTodos;
