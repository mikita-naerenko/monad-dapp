"use client";
import { GradientText } from "@/shared/ui/gradient-text";
import { Text, Flex } from "@mantine/core";
import { FC } from "react";
import { GradientBorderContainer } from "@/shared/ui";
import styles from "./styles.module.scss";

type Props = {
  contractBalance: string;
};

export const CurrentTreasury: FC<Props> = ({ contractBalance }) => {
  return (
    <GradientBorderContainer className={styles.wrapper}>
      <Flex
        align="center"
        justify="center"
        gap={4}
        p={24}
        style={{ position: "relative", zIndex: 2 }}
      >
        <GradientText content="Current Treasury:" />
        <Text fz={{ base: 14, sm: 16 }} fw={400} c="white">
          {contractBalance}
        </Text>
        <GradientText content="ETH" variant="secondary" />
      </Flex>
    </GradientBorderContainer>
  );
};
