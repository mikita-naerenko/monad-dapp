"use client";
import { FC, ReactNode, useMemo } from "react";
import { Text, useMantineTheme } from "@mantine/core";

type Props = {
  content: ReactNode;
  variant?: "primary" | "secondary";
  fz?: number;
};

export const GradientText: FC<Props> = ({
  content,
  fz = 16,
  variant = "primary",
}) => {
  const theme = useMantineTheme();

  const gradient = useMemo(
    () => ({
      primary: {
        from: theme.other.gradientStart,
        to: theme.other.gradientEnd,
        deg: 135,
      },
      secondary: {
        from: theme.other.gradientAccentStart,
        to: theme.other.gradienAccenttEnd,
        deg: 135,
      },
    }),
    [theme]
  );

  return (
    <Text
      fw={700}
      fz={fz}
      lh="18px"
      variant="gradient"
      gradient={gradient[variant]}
      span
    >
      {content}
    </Text>
  );
};
