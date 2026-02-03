import { FC } from "react";
import { Text } from "@mantine/core";
import { colors } from "@/shared/config/colors";

type Props = {
  value: string;
};

export const EstimatedDailyReward: FC<Props> = ({ value }) => {
  return (
    <div className="w-full flex justify-between mt-[28px] px-2">
      <Text fz={16} fw="500" c={colors.text.secondary}>
        Estimated daily reward:
      </Text>
      <div className="flex gap-1">
        <Text fz={16}>{value}</Text>
        <Text component="span" fz={16} fw="700" c={colors.text.accent}>
          MON
        </Text>
      </div>
    </div>
  );
};
