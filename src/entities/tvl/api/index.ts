import { useDappApi } from "@/shared/api";

export const getChartData = (
  data?: Parameters<typeof useDappApi.api.getTvlChart>[0]
) => {
  return useDappApi.api.getTvlChart(data);
};
