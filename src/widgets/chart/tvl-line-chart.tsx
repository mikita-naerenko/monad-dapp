"use client";

import { FC } from "react";
import { AreaChart } from "@mantine/charts";
import { colors } from "@/shared/config/colors";
import { formattedAmount } from "@/shared/lib/utils";
import type { ChartDataPoint } from "@/entities/tvl/model";

interface TvlLineChartProps {
  data: ChartDataPoint[];
  height: number;
  yAxisDomain: [number, number] | ["auto", "auto"];
}

export const TvlLineChart: FC<TvlLineChartProps> = ({
  data,
  height,
  yAxisDomain,
}) => {
  return (
    <AreaChart
      h={height}
      data={data}
      dataKey="date"
      tooltipAnimationDuration={200}
      series={[
        {
          name: "tvl",
          label: "TVL (ETH)",
          color: colors.text.accent,
        },
      ]}
      curveType="natural"
      withDots
      withLegend={false}
      withTooltip
      withXAxis
      withYAxis={false}
      gridAxis="none"
      activeDotProps={{
        r: 6,
        fill: colors.text.accent,
        strokeWidth: 2,
      }}
      dotProps={{ r: 0 }}
      xAxisProps={{
        tick: { fill: colors.text.secondary, fontSize: 14 },
        stroke: "none",
        tickCount: 4,
        interval: "preserveStartEnd",
      }}
      yAxisProps={{
        domain: yAxisDomain,
      }}
      areaProps={{
        fill: `url(#tvl-gradient)`,
        stroke: colors.text.accent,
        strokeWidth: 2,
      }}
      tooltipProps={{
        cursor: false,
        content: ({ label, payload }) => {
          if (!payload || payload.length === 0) return null;
          const tvlValue = payload[0].value as number;
          const formattedTvl = formattedAmount(tvlValue, 6, {
            precision: 6,
          });
          // Find the full date with year from chartData
          const dataPoint = data.find((d) => d.date === label);
          const fullDate = dataPoint
            ? new Date(dataPoint.timestamp).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : label;
          return (
            <div
              style={{
                backgroundColor: colors.background.gray,
                border: `1px solid ${colors.text.accent}`,
                borderRadius: 8,
                padding: "8px 12px",
                color: colors.text.primary,
                fontSize: 12,
              }}
            >
              <div style={{ marginBottom: 4 }}>
                <strong>{fullDate}</strong>
              </div>
              <div>TVL: {formattedTvl} ETH</div>
            </div>
          );
        },
      }}
    >
      <defs>
        <linearGradient id="tvl-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colors.text.accent} stopOpacity={1} />
          <stop offset="100%" stopColor={colors.text.accent} stopOpacity={0} />
        </linearGradient>
      </defs>
    </AreaChart>
  );
};
