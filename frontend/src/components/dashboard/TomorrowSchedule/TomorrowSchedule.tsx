import {
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Todo } from "types/Todo";
import useTodos from "./useTodos";
import React, { FC } from "react";

const TomorrowSchedule: FC = (props) => {
  const todos = useTodos();

  return (
    <Card {...props} sx={{ backgroundColor: 'white' }}>
      <CardContent>
        <Typography color="textSecondary" variant="overline">
          {"Programma di domani"}
        </Typography>

        <Divider sx={{ my: 2 }} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{"Compito"}</TableCell>
              <TableCell>{"Note"}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos?.length !== 0 &&
              todos?.map((todo: Todo) => (
                <TableRow
                  key={todo.name}
                  sx={{
                    "&:last-child td": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell>
                    <Typography variant="body2">{todo.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{todo.notes}</Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TomorrowSchedule;
