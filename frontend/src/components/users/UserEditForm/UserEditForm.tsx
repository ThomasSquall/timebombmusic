import React, { FC } from "react";
import { User } from "../../../types/User";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { updateUser } from "services/user.service";
import { useAuth } from "contexts/jwt-provider";
import { useNavigate } from "react-router-dom";

interface UserEditFormProps {
  user: User;
}

export const UserEditForm: FC<UserEditFormProps> = (props) => {
  const { user, ...other } = props;
  const { getAccessTokenSilently } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: user.email || "",
      name: user.name || "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Deve essere un'email valida")
        .max(255)
        .required("Email è obbligatoria"),
      name: Yup.string().max(255).required("Name is required"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const accessToken = await getAccessTokenSilently();
        await updateUser({ accessToken, id: user.id, name: values.name });
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("Utente aggiornato!");
        void navigate("/users/" + user.id);
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
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card sx={{ backgroundColor: "white" }}>
        <CardHeader title="Modifica utente" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Nome completo"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.name}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Indirizzo email"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                contentEditable={false}
                value={formik.values.email}
                inputProps={{ disabled: true }}
              />
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
            Aggiorna
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
        </CardActions>
      </Card>
    </form>
  );
};
