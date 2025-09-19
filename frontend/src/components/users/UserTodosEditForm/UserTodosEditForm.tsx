import React, { FC } from "react";
import { Todo } from "types/Todo";
import { User } from "types/User";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "contexts/jwt-provider";
import { createTodo, updateTodo } from "services/todos.service";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { getInitials } from "utils/get-initials";
import { useNavigate } from "react-router-dom";
import { Trash as TrashIcon } from "icons/trash";

interface UserTodosEditFormProps {
  todo?: Todo;
  user: User;
  handleDelete: () => void;
}

export const UserTodosEditForm: FC<UserTodosEditFormProps> = (props) => {
  const { todo, user, handleDelete, ...other } = props;
  const { getAccessTokenSilently } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: todo?.name || "",
      notes: todo?.notes || "",
      due_date: todo?.due_date || null,
      completed: todo?.completed || false,
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Il nome è obbligatorio"),
      notes: Yup.string().max(255),
      due_date: todo
        ? Yup.date()
        : Yup.date().min(new Date(), "La data deve essere futura"),
      completed: Yup.boolean(),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const accessToken = await getAccessTokenSilently();

        if (todo) {
          await updateTodo({
            accessToken,
            id: todo.id,
            name: values.name,
            notes: values.notes,
            due_date: (values.due_date as string) ?? null,
            completed: values.completed,
          });
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          toast.success("Compito aggiornato correttamente!");
          navigate("/users/" + user.id);
        } else {
          await createTodo({
            accessToken,
            name: values.name,
            notes: values.notes,
            due_date: (values.due_date as string) ?? null,
            user_id: user.id,
          });
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          toast.success("Compito creato correttamente!");
          navigate("/users/" + user.id);
        }
      } catch (err: any) {
        console.error(err);
        toast.error("Qualcosa è andato storto!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Grid
        item
        sx={{
          alignItems: "center",
          display: "flex",
          overflow: "hidden",
          marginBottom: 4,
        }}
      >
        <Avatar
          src={process.env.REACT_APP_ASSETS_SERVER_URL + user.avatar}
          sx={{
            height: 64,
            mr: 2,
            width: 64,
          }}
        >
          {getInitials(user.name == "" ? user.email : user.name)}
        </Avatar>
        <Typography variant="h4">
          {user.name == "" ? user.email : user.name}
        </Typography>
      </Grid>

      <form onSubmit={formik.handleSubmit} {...other}>
        <Card sx={{ backgroundColor: "white" }}>
          <CardHeader title={"Crea un nuovo compito"} />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Nome del Compito"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.name}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Data di consegna"
                    onChange={(value) => {
                      formik.setFieldValue("due_date", value as string);
                    }}
                    inputFormat="MM/DD/YYYY"
                    renderInput={(inputProps) => (
                      <TextField
                        error={Boolean(
                          formik.touched.due_date && formik.errors.due_date
                        )}
                        fullWidth
                        helperText={
                          formik.touched.due_date && formik.errors.due_date
                        }
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        {...inputProps}
                      />
                    )}
                    value={formik.values.due_date}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={Boolean(formik.touched.notes && formik.errors.notes)}
                  fullWidth
                  helperText={formik.touched.notes && formik.errors.notes}
                  label="Note"
                  name="notes"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.notes}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Checkbox
                  checked={formik.values.completed}
                  onChange={(event) => {
                    formik.setFieldValue("completed", event.target.checked);
                  }}
                  name="completed"
                />
                <Typography variant="body1">
                  {formik.values.completed ? "Completato" : "Incompleto"}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions
            sx={{
              flexWrap: "wrap",
              m: -1,
            }}
          >
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              sx={{ m: 1 }}
              variant="contained"
            >
              {todo ? "Aggiorna" : "Crea"}
            </Button>
            <Link to={"/users/" + user.id}>
              <Button
                component="h2"
                disabled={formik.isSubmitting}
                sx={{
                  m: 1,
                  mr: "auto",
                }}
                variant="outlined"
              >
                Annulla
              </Button>
            </Link>
            {todo ? (
              <IconButton onClick={(): void => handleDelete()}>
                <TrashIcon fontSize="small" />
              </IconButton>
            ) : null}
          </CardActions>
        </Card>
      </form>
    </>
  );
};
