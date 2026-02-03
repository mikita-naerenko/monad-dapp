"use client";

import { FC, useMemo, useState, useEffect } from "react";
import { Text } from "@mantine/core";
import { useTvlChart } from "@/entities/tvl/api/use-tvl-chart";
import {
  getDateRange,
  formatChartData,
  calculateYAxisDomain,
} from "@/entities/tvl/lib";
import type { DateFilter } from "@/entities/tvl/model";
import { DateFilterButtons } from "./date-filter-buttons";
import { ChartContainer } from "./chart-container";
import { ChartLoadingState } from "./chart-loading-state";
import { ChartErrorState } from "./chart-error-state";
import { ChartEmptyState } from "./chart-empty-state";
import { ChartContent } from "./chart-content";

export const Chart: FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<DateFilter>("90d");
  const [mounted, setMounted] = useState(false);
  const dateRange = useMemo(
    () => getDateRange(selectedFilter),
    [selectedFilter]
  );

  const { data, isLoading, isError, isFetching } = useTvlChart(dateRange);

  // Standard pattern for hydration mismatch prevention
  // This is intentional - we need to set mounted state after component mounts
  // to prevent hydration mismatches between server and client
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const chartData = useMemo(() => {
    if (!data) return [];
    return formatChartData(data);
  }, [data]);

  const yAxisDomain = useMemo(() => {
    return calculateYAxisDomain(chartData);
  }, [chartData]);

  const chartHeight = 291.3;

  return (
    <ChartContainer>
      <Text w={"100%"} fw={600} fz={20} ta="center">
        TREASURY CHART
      </Text>
      <DateFilterButtons
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      {!mounted || isLoading ? (
        <ChartLoadingState />
      ) : isError ? (
        <ChartErrorState />
      ) : chartData.length === 0 ? (
        <ChartEmptyState />
      ) : (
        <ChartContent
          data={chartData}
          height={chartHeight}
          yAxisDomain={yAxisDomain}
          isFetching={isFetching}
        />
      )}
    </ChartContainer>
  );
};
