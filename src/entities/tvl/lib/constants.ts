import type { DateFilter } from "../model/types";

export const DATE_FILTERS: { label: string; value: DateFilter }[] = [
  { label: "7D", value: "7d" },
  { label: "30D", value: "30d" },
  { label: "90D", value: "90d" },
  { label: "1Y", value: "1y" },
  { label: "All", value: "all" },
];

export const CHART_HEIGHT = 330;
export const CHART_PADDING = 18;
export const CHART_BUTTONS_AND_AXIS_SPACE = 76;
export const CHART_Y_AXIS_PADDING_PERCENT = 0.09;
