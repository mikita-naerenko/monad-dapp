import { colors } from "@/shared/config/colors";
import { GradientText } from "@/shared/ui/gradient-text";
import { Flex, Text } from "@mantine/core";
import { FC } from "react";

interface Props {
  reward: string;
  reBuy: string;
}

export const GameStats: FC<Props> = ({ reward, reBuy }) => {
  return (
    <Flex direction="column" gap={10} mt={16}>
      <Text c={colors.text.secondary} ta="start" h={20} fz={16} fw={600}>
        Reward
      </Text>
      <Flex justify="space-between" h={20} mb={6}>
        <Text fw={500} fz={16}>
          Compound:
        </Text>
        <Text fw={400} fz={16}>
          {reBuy}{" "}
          <Text component="span" fz={16} fw="700" c={colors.text.accent2}>
            MNR
          </Text>
        </Text>
      </Flex>
      <Flex justify="space-between" h={20}>
        <Text fw={500} fz={16}>
          Claimable Reward:
        </Text>
        <Text fw={400} fz={16}>
          {reward}{" "}
          <Text component="span" fz={16} fw="700" c={colors.text.accent}>
            MON
          </Text>
        </Text>
      </Flex>
    </Flex>
  );
};
