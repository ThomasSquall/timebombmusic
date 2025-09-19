import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "contexts/jwt-provider";
import { Box, Link as MUILink, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getUser as getUserService } from "../../services/user.service";
import { User } from "../../types/User";
import { ucfirst } from "../../utils/string-utils";
import { UserTodosEditForm } from "../../components/users";
import { Todo } from "../../types/Todo";
import { deleteTodo, getTodo as getTodoService } from "../../services/todos.service";

export const NewTodo = (): React.ReactElement => {
  const { id, todoId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [todo, setTodo] = useState<Todo | null>(null);

  const { getAccessTokenSilently } = useAuth();

  const navigate = useNavigate();

  const handleDelete = async (): Promise<void> => {
    try {
      if (!todoId) {
        return;
      }

      const confirmed = window.confirm("Sei sicuro di voler eliminare questo Compito?");
      
      if (!confirmed) {
        return;
      }

      await deleteTodo({
        accessToken: await getAccessTokenSilently(),
        id: Number(todoId),
      });

      navigate(`/users/${user?.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch todo by ID
  const getTodo = useCallback(async () => {
    if (!todoId) return;

    try {
      const accessToken = await getAccessTokenSilently();
      const data = await getTodoService({ accessToken, id: parseInt(todoId) });

      setTodo({
        id: data.data.id,
        name: data.data.name,
        notes: data.data.notes,
        due_date: data.data.due_date,
        completed: data.data.completed,
        user_id: data.data.user_id, // Ensure this is included
      });
    } catch (err) {
      console.error("Error fetching todo:", err);
    }
  }, [todoId, getAccessTokenSilently]);

  // Fetch user by ID
  const getUser = useCallback(async () => {
    const userId = id ? parseInt(id) : todo?.user_id;
    if (!userId) return;

    try {
      const accessToken = await getAccessTokenSilently();
      const data = await getUserService({ accessToken, id: userId });

      setUser(data.data as User);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  }, [id, todo?.user_id, getAccessTokenSilently]);

  // Fetch todo when `todoId` changes
  useEffect(() => {
    void getTodo();
  }, [getTodo]);

  // Fetch user when `todo` or `id` changes
  useEffect(() => {
    if (todo || id) {
      void getUser();
    }
  }, [getUser]);

  if (!user) {
    return <></>;
  }

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "background.default",
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ mb: 4 }}>
          <Link to={`/users/${id || todo?.user_id}`}>
            <MUILink
              color="textPrimary"
              component="h2"
              sx={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="subtitle2">{ucfirst(user?.name)}</Typography>
            </MUILink>
          </Link>
        </Box>
        <Box mt={3}>
          <UserTodosEditForm user={user} todo={todo || undefined} handleDelete={handleDelete} />
        </Box>
      </Container>
    </Box>
  );
};
