import { useTheme } from "@mui/material/styles";
import { ApexOptions } from "apexcharts";
import { useAnalytics } from "../../../hooks/dashboard/useAnalytics";

export type UseChartType = {
  chartOptions: ApexOptions;
  chartSeries: number[];
  color1: string;
  color2: string;
  color3: string;
};

export const useChart = (): UseChartType => {
  const theme = useTheme();
  const color1 = theme.palette.primary.main;
  const color2 = theme.palette.warning.main;
  const color3 = theme.palette.error.main;

  const { hundred, aboveFifty, belowFifty } = useAnalytics();

  const chartOptions: ApexOptions = {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: [color1, color2, color3],
    fill: {
      opacity: 1,
    },
    labels: [],
    plotOptions: {
      radialBar: {
        dataLabels: {
          show: false,
        },
        hollow: {
          size: "40%",
        },
        track: {
          background: theme.palette.neutral?.[200],
        },
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
  };

  const total = hundred + aboveFifty + belowFifty;

  const chartSeries = [
    (hundred / total) * 100 ?? 0,
    (aboveFifty / total) * 100 ?? 0,
    (belowFifty / total) * 100 ?? 0,
  ];

  return {
    chartOptions,
    chartSeries,
    color1,
    color2,
    color3,
  };
};

export default useChart;
