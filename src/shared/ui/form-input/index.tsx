"use client";
import { Divider, Flex, NumberInput, Text } from "@mantine/core";
import { FC } from "react";
import { colors } from "@/shared/config/colors";

type Props = {
  value: string | number;
  max: number;
  min?: number;
  decimalScale?: number;
  setValue: (value: number | string) => void;
};

export const FormInput: FC<Props> = ({
  value,
  max,
  min,
  decimalScale = 5,
  setValue,
}) => {
  return (
    <NumberInput
      value={value}
      onChange={setValue}
      decimalScale={decimalScale}
      allowNegative={false}
      clampBehavior="strict"
      max={max}
      min={min}
      rightSection={
        <Flex gap={9} align="center">
          <Divider orientation="vertical" color={colors.border.main} h={50} />
          <Text component="span" fz={16} fw="700" c={colors.text.accent}>
            MON
          </Text>
        </Flex>
      }
      placeholder="0.00"
      mt={20}
      c="textWhite"
      styles={{
        input: {
          backgroundColor: colors.background.gray,
          borderColor: colors.border.main,
          borderRadius: "16px",
          height: "50px",
          paddingRight: "80px",
          color: colors.text.primary,
          fontSize: "16px",
          fontWeight: 500,
          textAlign: "right",
        },
        section: {
          right: "24px",
        },
      }}
    />
  );
};
