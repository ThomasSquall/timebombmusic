import type { ChangeEvent, FC, MouseEvent } from "react";
import React, { useState, useEffect } from "react";
import { User } from "types/User";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "components/core/Scrollbar";
import { getInitials } from "utils/get-initials";
import { Link } from "react-router-dom";
import { PencilAlt as PencilAltIcon } from "icons/pencil-alt";

interface UserListTableProps {
  users: User[];
  usersCount: number;
  onPageChange: (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page: number;
  rowsPerPage: number;
}

export const UsersListTable: FC<UserListTableProps> = (props) => {
  const {
    users,
    usersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;

  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  useEffect(
    () => {
      if (selectedUsers.length) {
        setSelectedUsers([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [users]
  );

  const handleSelectAllUsers = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedUsers(event.target.checked ? users.map((user) => user.id) : []);
  };

  const handleSelectOneUser = (
    event: ChangeEvent<HTMLInputElement>,
    userId: number
  ): void => {
    if (!selectedUsers.includes(userId)) {
      setSelectedUsers((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((id) => id !== userId)
      );
    }
  };

  const enableBulkActions = selectedUsers.length > 0;
  const selectedSomeUsers =
    selectedUsers.length > 0 && selectedUsers.length < users.length;
  const selectedAllUsers = selectedUsers.length === users.length;

  return (
    <div {...other}>
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "neutral.800" : "neutral.100",
          display: enableBulkActions ? "block" : "none",
          px: 2,
          py: 0.5,
        }}
      >
        <Checkbox
          checked={selectedAllUsers}
          indeterminate={selectedSomeUsers}
          onChange={handleSelectAllUsers}
        />
        <Button size="small" sx={{ ml: 2 }}>
          Modifica
        </Button>
      </Box>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead
            sx={{ visibility: enableBulkActions ? "collapse" : "visible" }}
          >
            <TableRow>
              {/* <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAllUsers}
                  indeterminate={selectedSomeUsers}
                  onChange={handleSelectAllUsers}
                />
              </TableCell> */}
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Azioni</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              const isUserSelected = selectedUsers.includes(user.id);

              return (
                <TableRow hover key={user.id} selected={isUserSelected}>
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={isUserSelected}
                      onChange={(event) => handleSelectOneUser(event, user.id)}
                      value={isUserSelected}
                    />
                  </TableCell> */}
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar
                        src={
                          process.env.REACT_APP_ASSETS_SERVER_URL + user.avatar
                        }
                        sx={{
                          height: 42,
                          width: 42,
                        }}
                      >
                        {getInitials(user.name == "" ? user.email : user.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <Link to={"/users/" + user.id}>{user.name}</Link>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ ml: 1 }}>
                      <Typography color="textSecondary" variant="body2">
                        {user.email}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Link to={"/users/" + user.id + "/edit"}>
                      <IconButton component="h2">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={usersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};
