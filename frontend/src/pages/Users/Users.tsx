import React, {
  MouseEvent,
  FormEvent,
  useRef,
  useState,
  useCallback,
  ChangeEvent,
  useEffect,
} from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { Search as SearchIcon } from "icons/search";
import { UsersListTable } from "components/users";
import { User } from "types/User";
import { createUser, getAllUsers } from "services/user.service";
import { useAuth } from "contexts/jwt-provider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Filters {
  query?: string;
}

const applyFilters = (users: User[], filters: Filters): User[] => {
  return users.filter((user) => {
    if (filters.query) {
      let queryMatched = false;
      const properties: ("email" | "name")[] = ["email", "name"];

      properties.forEach((property) => {
        if (
          user[property].toLowerCase().includes(filters.query!.toLowerCase())
        ) {
          queryMatched = true;
        }
      });

      if (!queryMatched) {
        return false;
      }
    }

    return true;
  });
};

const applyPagination = (
  users: User[],
  page: number,
  rowsPerPage: number
): User[] => {
  return users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
};

export const Users = (): React.ReactElement => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    query: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    fullName: "",
    password: "",
  });

  const { getAccessTokenSilently, impersonate, user: authUser } = useAuth();
  const navigate = useNavigate();

  const queryRef = useRef<HTMLInputElement | null>(null);
  const filteredUsers = applyFilters(users, filters);
  const paginatedUsers = applyPagination(filteredUsers, page, rowsPerPage);

  const getUsers = useCallback(async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const data = await getAllUsers({ accessToken });

      setUsers(data.data as User[]);
    } catch (err) {
      console.error(err);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    void getUsers();
  }, [getUsers]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setNewUser({
      email: "",
      fullName: "",
      password: "",
    });
  };

  const handleNewUserChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleCreateNewUser = async (event: FormEvent) => {
    event.preventDefault();

    try {
      // Retrieve the access token using the getAccessTokenSilently function from the useAuth hook
      const accessToken = await getAccessTokenSilently();

      // Call the createUser function and pass in the required data
      const response = await createUser({
        accessToken,
        email: newUser.email,
        fullName: newUser.fullName,
        password: newUser.password,
      });

      if (response.error) {
        console.error("Error creating user:", response.error);
        toast.error("Qualcosa è andato storto! Mail già utilizzata o password troppo corta.");
        // Handle error (e.g., show a message to the user)
      } else {

        toast.success("Utente creato con successo!");

        // Handle success (e.g., update the UI, navigate to another page)
        void getUsers(); // Refresh the users list
        handleCloseModal(); // Close the modal
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      // Handle unexpected errors
    }
  };

  let typingTimeout: NodeJS.Timeout;

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const queryValue = event.target.value;

    // Cancella il timeout precedente
    clearTimeout(typingTimeout);

    // Imposta un nuovo timeout per aggiornare i filtri dopo un secondo
    typingTimeout = setTimeout(() => {
      setFilters((prevState) => ({
        ...prevState,
        query: queryValue,
      }));
    }, 1000);
  };

  const handleRowsPerPageChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleImpersonateUser = async (userId: number) => {
    if (authUser?.id === userId) {
      toast.error("Sei già autenticato come questo utente.");
      return;
    }

    const { success, error } = await impersonate(userId);

    if (!success) {
      toast.error(error ?? "Impossibile impersonare l'utente selezionato.");
      return;
    }

    toast.success("Stai impersonando l'utente selezionato.");
    navigate("/");
  };

  const handlePageChange = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    setPage(newPage);
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item>
              <Typography variant="h4">Utenti</Typography>
            </Grid>
            <Grid item>
              <Button
                style={{ color: "white" }}
                variant="contained"
                onClick={handleOpenModal}
              >
                Nuovo utente
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Card sx={{ backgroundColor: "white" }}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexWrap: "wrap",
              m: -1.5,
              p: 3,
            }}
          >
            <Box
              component="form"
              sx={{
                flexGrow: 1,
                m: 1.5,
              }}
            >
              <TextField
                defaultValue=""
                fullWidth
                inputProps={{ ref: queryRef }}
                onChange={handleQueryChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                placeholder="Cerca tra gli utenti"
              />
            </Box>
          </Box>
          <UsersListTable
            users={paginatedUsers}
            usersCount={filteredUsers.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPage={rowsPerPage}
            page={page}
            onImpersonate={handleImpersonateUser}
          />
        </Card>
      </Container>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 24,
            borderRadius: "15px",
            p: 4,
          }}
        >
          <Typography variant="h5" sx={{ mb: 5 }}>Crea un nuovo utente</Typography>
          <form onSubmit={handleCreateNewUser}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              onChange={handleNewUserChange}
              required
              type="email"
              value={newUser.email}
              sx={{ marginBottom: 2 }} // Add vertical space
            />
            <TextField
              fullWidth
              label="Nome completo"
              name="fullName"
              onChange={handleNewUserChange}
              required
              type="text"
              value={newUser.fullName}
              sx={{ marginBottom: 2 }} // Add vertical space
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              onChange={handleNewUserChange}
              required
              type="password"
              value={newUser.password}
              sx={{ marginBottom: 2 }} // Add vertical space
            />
            <p style={{ fontSize: "14px", color: "#000000", marginTop: "-5px", marginBottom: "20px" }}>Minimo 8 caratteri</p>
            <Button type="submit" variant="contained" color="primary">
              Crea
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default Users;
