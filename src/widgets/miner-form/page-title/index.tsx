"use client";
import { colors } from "@/shared/config/colors";
import { Flex, Text, Title } from "@mantine/core";
import { FC } from "react";

export const PageTitle: FC = () => {
  return (
    <Flex w="100%" align="center" justify="center">
      <Title order={2} m="auto">
        <Text component="span" fz="xl" fw="600" c={colors.text.accent}>
          MON
        </Text>
        <Text component="span" fz="xl" fw="600" c={colors.text.primary}>
          MINER
        </Text>
      </Title>
    </Flex>
  );
};
