import type { TvlDataPointDto } from "@/shared/api/client";
import type { ChartDataPoint, DateFilter } from "../model/types";
import { CHART_Y_AXIS_PADDING_PERCENT } from "./constants";

export const getDateRange = (
  filter: DateFilter
): { from?: string; to?: string } => {
  const now = new Date();
  const to = now.toISOString();

  switch (filter) {
    case "7d": {
      const from = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return { from: from.toISOString(), to };
    }
    case "30d": {
      const from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return { from: from.toISOString(), to };
    }
    case "90d": {
      const from = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      return { from: from.toISOString(), to };
    }
    case "1y": {
      const from = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      return { from: from.toISOString(), to };
    }
    case "all":
    default:
      return { to };
  }
};

export const formatChartData = (data: TvlDataPointDto[]): ChartDataPoint[] => {
  // Sort by timestamp to ensure correct order
  const sortedData = [...data].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return sortedData.map((point) => ({
    date: new Date(point.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    timestamp: point.timestamp,
    tvl: parseFloat(point.tvl),
  }));
};

export const calculateYAxisDomain = (
  chartData: ChartDataPoint[]
): [number, number] | ["auto", "auto"] => {
  if (chartData.length === 0) return ["auto", "auto"];
  const tvlValues = chartData.map((d) => d.tvl);
  const min = Math.min(...tvlValues);
  const max = Math.max(...tvlValues);
  // Add padding to the range for better visualization
  const range = max - min;
  const base = range === 0 ? max || 1 : range;
  const padding = base * CHART_Y_AXIS_PADDING_PERCENT;

  // Give a bit more space below the minimum so the line does not sit on the X axis
  const bottomPadding = padding * 1.5;

  return [min - bottomPadding, max + padding];
};
