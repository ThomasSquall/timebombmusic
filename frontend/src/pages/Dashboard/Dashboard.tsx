import { Box, Card, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { OverallResults } from "components/dashboard/OverallResults";
import TomorrowSchedule from "../../components/dashboard/TomorrowSchedule/TomorrowSchedule";
import TodaySchedule from "../../components/dashboard/TodaySchedule/TodaySchedule";
import { useUser } from "hooks/user";
import { Link } from "react-router-dom";
import { Users as UsersIcon } from "icons/users";
import { CalendarMonth } from "@mui/icons-material";

const DashboardCard = ({
  to,
  icon: Icon,
  title,
}: {
  to: string;
  icon: React.ElementType;
  title: string;
}) => (
  <Card
    component={Link}
    to={to}
    sx={{
      p: 3,
      height: "100%",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      textDecoration: "none",
      backgroundColor: "white",
      transition: "transform 0.2s",
      "&:hover": {
        backgroundColor: "primary.main",
        "& *": {
          color: "white",
        },
      },
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Icon fontSize="medium" color="primary" />
      <Typography variant="h5" color="textPrimary">
        {title}
      </Typography>
    </Box>
  </Card>
);

export const Dashboard = (): React.ReactElement => {
  const user = useUser();

  console.log(user);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        {!user?.is_admin ? (
          <>
            <Box sx={{ mb: 4 }}>
              <Grid container justifyContent="space-between" spacing={3}>
                <Grid item>
                  <Typography variant="h4">Progressi</Typography>
                </Grid>
              </Grid>
            </Box>
            <Grid container spacing={4}>
              <Grid item md={6} xs={12}>
                <OverallResults />
              </Grid>
              <Grid item md={6} xs={12}>
                <TomorrowSchedule />
              </Grid>
              <Grid item md={12}>
                <TodaySchedule />
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
              sx={{ mb: 4 }}
            >
              <Grid item>
                <Typography variant="h4">Dashboard</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <DashboardCard to="/users" icon={UsersIcon} title="Utenti" />
              </Grid>

              <Grid item xs={12} md={6}>
                <DashboardCard
                  to="/calendar"
                  icon={CalendarMonth}
                  title="Calendario"
                />
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
};
