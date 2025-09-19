import React, { FC } from "react";
import { useMemo } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { addMinutes } from "date-fns";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Divider,
  FormHelperText,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Trash as TrashIcon } from "icons/trash";
import type { CalendarEvent } from "types/Calendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useAuth } from "contexts/jwt-provider";
import { deleteTodo, updateTodo } from "services/todos.service";

interface CalendarEventFormProps {
  event?: CalendarEvent;
  onAddComplete?: (event: {
    title: string;
    description: string;
    start: number;
    user_id: number;
  }) => void;
  onClose?: () => void;
  onDeleteComplete?: () => void;
  onEditComplete?: () => void;
  open?: boolean;
  range?: { start: number; end: number };
  refetchTodos: () => void;
}

interface FormValues {
  allDay: boolean;
  color: string;
  description: string;
  end: Date;
  start: Date;
  title: string;
  submit: string | null;
  completed: boolean;
}

export const CalendarEventDialog: FC<CalendarEventFormProps> = (props) => {
  const {
    event,
    onAddComplete,
    onClose,
    onDeleteComplete,
    onEditComplete,
    open,
    range,
    refetchTodos,
  } = props;

  const { user: authUser } = useAuth();

  const isLoggedUserAdmin = authUser?.is_admin;

  const initialValues = useMemo((): FormValues => {
    if (event) {
      return {
        allDay: event.allDay || false,
        color: event.color || "",
        description: event.description || "",
        end: event.end ? new Date(event.end) : addMinutes(new Date(), 30),
        start: event.start ? new Date(event.start) : new Date(),
        title: event.title || "",
        submit: null,
        completed: Boolean(event.completed),
      };
    }

    if (range) {
      return {
        allDay: false,
        color: "",
        description: "",
        end: new Date(range.end),
        start: new Date(range.start),
        title: "",
        submit: null,
        completed: false,
      };
    }

    return {
      allDay: false,
      color: "",
      description: "",
      end: addMinutes(new Date(), 30),
      start: new Date(),
      title: "",
      submit: null,
      completed: false,
    };
  }, [event, range]);

  const { getAccessTokenSilently } = useAuth();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      allDay: Yup.bool(),
      description: Yup.string().max(5000),
      end: Yup.date(),
      start: Yup.date(),
      title: Yup.string().max(255).required("Title is required"),
      completed: Yup.boolean(),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const data = {
          allDay: values.allDay,
          description: values.description,
          end: values.end.getTime(),
          start: values.start.getTime(),
          title: values.title,
          completed: values.completed,
        };

        if (event && event.id) {
          await updateTodo({
            accessToken: await getAccessTokenSilently(),
            id: Number(event.id),
            name: values.title,
            notes: values.description,
            due_date: new Date(values.start).toISOString(),
            completed: values.completed,
          });
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          toast.success("Compito aggiornato correttamente!");
          onClose?.();
          refetchTodos();
          window.location.reload();
        }

        if (!event && onAddComplete) {
          onAddComplete({
            description: values.description,
            start: values.start.getTime(),
            title: values.title,
            user_id: 1, // TODO: Replace with actual user id
          });
        }

        if (event && onEditComplete) {
          onEditComplete();
        }
      } catch (err: any) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleStartDateChange = (date: string | number | null): void => {
    formik.setFieldValue("start", date as string);

    /*
    // Prevent end date to be before start date
    if (formik.values.end && date && date > formik.values.end) {
      formik.setFieldValue("end", date);
    }
     */
  };

  const handleEndDateChange = (date: Date | null): void => {
    formik.setFieldValue("end", date);

    // Prevent start date to be after end date
    if (formik.values.start && date && date < formik.values.start) {
      formik.setFieldValue("start", date);
    }
  };

  const handleDelete = async (): Promise<void> => {
    try {
      if (!event) {
        return;
      }

      const confirmed = window.confirm("Sei sicuro di voler eliminare questo Compito?");
      
      if (!confirmed) {
        return;
      }

      await deleteTodo({
        accessToken: await getAccessTokenSilently(),
        id: Number(event.id),
      });

      onDeleteComplete?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={!!open}>
      <form onSubmit={formik.handleSubmit} style={{ backgroundColor: "white" }}>
        <Box sx={{ p: 3 }}>
          <Typography align="center" gutterBottom variant="h5">
            {event
              ? isLoggedUserAdmin
                ? "Modifica Compito"
                : "Visualizza Compito"
              : "Aggiungi Compito"}
          </Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <TextField
            error={Boolean(formik.touched.title && formik.errors.title)}
            fullWidth
            helperText={formik.touched.title && formik.errors.title}
            label="Titolo"
            name="title"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.title}
            InputProps={{
              readOnly: !isLoggedUserAdmin,
            }}
          />
          <Box sx={{ mt: 2 }}>
            <TextField
              error={Boolean(
                formik.touched.description && formik.errors.description
              )}
              fullWidth
              helperText={
                formik.touched.description && formik.errors.description
              }
              label="Descrizione"
              name="description"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.description}
              multiline={true}
              minRows={4}
              InputProps={{
                readOnly: !isLoggedUserAdmin,
              }}
            />
          </Box>
          <Box
            sx={{
              mt: 2,
              pointerEvents: isLoggedUserAdmin ? "auto" : "none",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Data"
                onChange={handleStartDateChange}
                inputFormat="MM/DD/YYYY"
                renderInput={(inputProps) => (
                  <TextField
                    error={Boolean(formik.touched.start && formik.errors.start)}
                    fullWidth
                    helperText={
                      formik.touched.start && (formik.errors.start as string)
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    {...inputProps}
                    InputProps={{
                      readOnly: !isLoggedUserAdmin,
                    }}
                  />
                )}
                value={formik.values.start}
              />
            </LocalizationProvider>
          </Box>
          {/*<Box sx={{ mt: 2 }}>
            <DatePicker
              label="End date"
              onChange={handleEndDateChange}
              renderInput={(inputProps) => (
                <TextField fullWidth {...inputProps} />
              )}
              value={formik.values.end}
            />
          </Box> */}
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={formik.values.completed}
              onChange={(event) =>
                formik.setFieldValue("completed", event.target.checked)
              }
              name="completed"
            />
            <Typography variant="body1">
              {formik.values.completed ? "Completato" : "Incompleto"}
            </Typography>
          </Box>
          {Boolean(formik.touched.end && formik.errors.end) && (
            <Box sx={{ mt: 2 }}>
              <FormHelperText error>
                {formik.errors.end as string}
              </FormHelperText>
            </Box>
          )}
        </Box>
        <Divider />
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            p: 2,
          }}
        >
          {event && isLoggedUserAdmin ? (
            <IconButton onClick={(): Promise<void> => handleDelete()}>
              <TrashIcon fontSize="small" />
            </IconButton>
          ) : null}
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={onClose}>Chiudi</Button>
          <Button
            disabled={formik.isSubmitting}
            sx={{ ml: 1 }}
            type="submit"
            variant="contained"
            style={{ color: "#ffffff" }}
          >
            Salva
          </Button>
        </Box>
      </form>
    </Dialog>
  );
};

CalendarEventDialog.propTypes = {
  // @ts-ignore
  event: PropTypes.object,
  onAddComplete: PropTypes.func,
  onClose: PropTypes.func,
  onDeleteComplete: PropTypes.func,
  onEditComplete: PropTypes.func,
  open: PropTypes.bool,
  // @ts-ignore
  range: PropTypes.object,
};
