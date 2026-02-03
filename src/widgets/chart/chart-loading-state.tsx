"use client";

import { FC } from "react";
import { Flex, Loader } from "@mantine/core";
import { colors } from "@/shared/config/colors";

export const ChartLoadingState: FC = () => {
  return (
    <Flex justify="center" align="center" style={{ flex: 1 }}>
      <Loader color={colors.text.accent} />
    </Flex>
  );
};
