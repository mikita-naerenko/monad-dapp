"use client";
import { GradientText } from "@/shared/ui/gradient-text";
import { Flex } from "@mantine/core";
import { FC } from "react";
import { GradientBorderContainer } from "@/shared/ui";
import styles from "./styles.module.scss";

export const Benefits: FC = () => {
  return (
    <Flex gap={16}>
      <GradientBorderContainer className={styles.wrapper} variant="secondary">
        <Flex
          align="center"
          justify="center"
          h={"100%"}
          gap={4}
          px={18}
          style={{ position: "relative", zIndex: 2 }}
        >
          <GradientText content="Earn Up To 8% Daily" variant="secondary" />
        </Flex>
      </GradientBorderContainer>
      <GradientBorderContainer className={styles.wrapper}>
        <Flex
          align="center"
          justify="center"
          h={"100%"}
          gap={4}
          px={18}
          style={{ position: "relative", zIndex: 2 }}
        >
          <GradientText content="13% Referral Program" />
        </Flex>
      </GradientBorderContainer>
    </Flex>
  );
};
