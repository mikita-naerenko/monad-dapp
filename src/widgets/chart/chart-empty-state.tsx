"use client";

import { FC } from "react";
import { Flex } from "@mantine/core";

export const ChartEmptyState: FC = () => {
  return (
    <Flex justify="center" align="center" style={{ flex: 1 }}>
      <div
        style={{
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: 14,
          textAlign: "center",
          padding: "20px",
        }}
      >
        No data available for this period
      </div>
    </Flex>
  );
};

