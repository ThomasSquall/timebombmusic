import React, { FC, useState } from "react";
import { Todo } from "types/Todo";
import { User } from "types/User";
import {
  Box,
  Card,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Scrollbar, SeverityPill } from "components/core";
import { Plus as PlusIcon } from "icons/plus";
import { Pencil } from "../../../icons/pencil";

interface UserTodosProps {
  todos: Todo[];
  user: User;
}

export const UserTodos: FC<UserTodosProps> = (props) => {
  const { todos, user } = props;
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const paginatedTodos = todos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Card {...props} sx={{ backgroundColor: "white" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 4,
        }}
      >
        <span
          className="MuiTypography-root MuiTypography-h6 MuiCardHeader-title"
          style={{ fontWeight: 600 }}
        >
          Lista compiti
        </span>

        <IconButton
          onClick={() => {
            void navigate("/users/" + user.id + "/todos/new");
          }}
          sx={{
            backgroundColor: "#3cbdc9",
            color: "white",
            "&:hover": {
              backgroundColor: "#35a9b3",
            },
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
        >
          <PlusIcon fontSize={"small"} sx={{ color: "white", mr: 1 }} />
          Aggiungi nuovo
        </IconButton>
      </Box>

      <Divider />
      <Scrollbar>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Stato</TableCell>
              <TableCell align="right">Azioni</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTodos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>#{todo.id}</TableCell>
                <TableCell>{todo.due_date}</TableCell>
                <TableCell>{todo.name}</TableCell>
                <TableCell>{todo.notes}</TableCell>
                <TableCell>
                  <SeverityPill color={todo.completed ? "success" : "error"}>
                    {todo.completed ? "Completato" : "Non completato"}
                  </SeverityPill>
                </TableCell>
                <TableCell align="right">
                  <Link to={"/todos/" + todo.id + "/edit"}>
                    <IconButton component="h2">
                      <Pencil fontSize="small" />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={todos.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
