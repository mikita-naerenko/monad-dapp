"use client";

import { FC } from "react";
import { Loader } from "@mantine/core";
import { colors } from "@/shared/config/colors";
import { TvlLineChart } from "./tvl-line-chart";
import type { ChartDataPoint } from "@/entities/tvl/model";

interface ChartContentProps {
  data: ChartDataPoint[];
  height: number;
  yAxisDomain: [number, number] | ["auto", "auto"];
  isFetching?: boolean;
}

export const ChartContent: FC<ChartContentProps> = ({
  data,
  height,
  yAxisDomain,
  isFetching = false,
}) => {
  return (
    <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
      {isFetching && (
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 10,
          }}
        >
          <Loader size="sm" color={colors.gradient.start} />
        </div>
      )}
      <TvlLineChart
        data={data}
        height={height}
        yAxisDomain={yAxisDomain}
      />
    </div>
  );
};

