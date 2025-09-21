import type { FC } from "react";
import React from "react";
import {
  Card,
  Divider,
  Grid,
  Typography,
  CardContent,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Chart from "react-apexcharts";
import useChart, { UseChartType } from "./useChart";
import { useAnalytics } from "hooks/dashboard/useAnalytics";

const LegendRow = ({ legend, color }: { legend: string; color: string }) => {
  return (
    <Box>
      <span
        style={{
          border: "2px solid " + color,
          borderRadius: 50,
          width: "10px",
          height: "10px",
          display: "inline-block",
        }}
      />{" "}
      <Typography color="textSecondary" variant="overline">
        {legend}
      </Typography>
    </Box>
  );
};

export const OverallResults: FC = (props) => {
  const chart: UseChartType = useChart();
  const result = useAnalytics();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card {...props} sx={{ backgroundColor: "white" }}>
      <CardContent>
        <Typography color="textSecondary" variant="overline">
          {"Risultati"}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={3} alignItems={"center"}>
          <Grid item xs={12} sm={5} md={4}>
            <Box sx={{ mx: "auto", width: "100%", maxWidth: 280 }}>
              <Chart
                height={isSmallScreen ? 220 : 200}
                width="100%"
                options={chart.chartOptions}
                series={chart.chartSeries}
                type={"radialBar"}
              />
            </Box>
          </Grid>

          {/* {!result && (
            <Grid item xs={8}>
              <CircularProgress color="success" />
            </Grid>
          )} */}

          {Object.keys(result).length && (
            <Grid
              item
              xs={12}
              sm={7}
              md={8}
              sx={{ textAlign: { xs: "center", sm: "left" } }}
            >
              <Typography color="textSecondary" variant="overline">
                {"Giorni totali"}
              </Typography>
              <Typography color="textPrimary" variant="body1">
                {result?.total} / {result?.days}
              </Typography>
              {/* <Divider sx={{ my: 1 }} /> */}
              <LegendRow legend={"100%"} color={chart.color1} />
              <Divider sx={{ my: 1 }} />
              <LegendRow legend={"Sopra il 50%"} color={chart.color2} />
              <Divider sx={{ my: 1 }} />
              <LegendRow legend={"Sotto il 50%"} color={chart.color3} />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OverallResults;
