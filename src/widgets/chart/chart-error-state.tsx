"use client";

import { FC } from "react";
import { Flex } from "@mantine/core";

export const ChartErrorState: FC = () => {
  return (
    <Flex justify="center" align="center" style={{ flex: 1 }}>
      <div style={{ color: "red", fontSize: 14 }}>
        Failed to load chart data
      </div>
    </Flex>
  );
};

