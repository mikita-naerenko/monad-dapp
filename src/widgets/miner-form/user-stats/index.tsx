import { colors } from "@/shared/config/colors";
import { GradientText } from "@/shared/ui/gradient-text";
import { Flex, Text } from "@mantine/core";

import { FC } from "react";

interface Props {
  balance: string;
  miners: string;
}

export const UserStats: FC<Props> = ({ balance, miners }) => {
  return (
    <Flex direction="column" gap={15} mt={30}>
      <Text c={colors.text.secondary} ta="start" h={20} fz={16} fw={600}>
        Your stats
      </Text>
      <Flex justify="space-between" h={20}>
        <Text fz={16} fw={500}>
          Wallet Balance:
        </Text>
        <Text fz={16}>
          {balance}{" "}
          <Text component="span" fz={16} fw={700} c={colors.text.accent}>
            MON
          </Text>
        </Text>
      </Flex>
      <Flex justify="space-between" h={20}>
        <Text fz={16} fw={500}>
          Your Miners:
        </Text>
        <Text fz={16}>
          {miners}{" "}
          <Text component="span" fz={16} fw={700} c={colors.text.accent2}>
            MNR
          </Text>
        </Text>
      </Flex>
    </Flex>
  );
};
