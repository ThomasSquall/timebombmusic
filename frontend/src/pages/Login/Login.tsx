import React from "react";
import {
  Box,
  Button,
  Card,
  Container,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/jwt-provider";
import { useMounted } from "../../hooks/utils";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Login = (): React.ReactElement => {
  const isMounted = useMounted();
  const navigate = useNavigate();
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Deve essere un'email valida")
        .max(255)
        .required("L'email è obbligatoria"),
      password: Yup.string().max(255).required("Password è obbligatoria"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const { success, error } = await login(values.email, values.password);

        if (isMounted() && success) {
          navigate("/");
        } else {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: error as any });
          helpers.setSubmitting(false);
        }
      } catch (err: any) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: "60px",
              md: "120px",
            },
          }}
        >
          <Card elevation={16} sx={{ p: 4 }}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <img style={{ width: '200px', marginBottom: '20px' }} src="/logo_tbm_azzurro.png" alt="Logo" />
              <Typography variant="h4">Log in</Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <form noValidate onSubmit={formik.handleSubmit}>
                <TextField
                  autoFocus
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Indirizzo email"
                  margin="normal"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={Boolean(
                    formik.touched.password && formik.errors.password
                  )}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
                {formik.errors.submit && (
                  <Box sx={{ mt: 3 }}>
                    <FormHelperText error>
                      {formik.errors.submit as string}
                    </FormHelperText>
                  </Box>
                )}
                <Box sx={{ mt: 2 }}>
                  <Button
                    disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Log In
                  </Button>
                </Box>
              </form>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;
