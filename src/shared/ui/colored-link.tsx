"use client";

import { Text, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import Link from "next/link";
import { FC, ReactNode } from "react";

type ColoredLinkProps = {
  href: string;
  children: ReactNode;
  isActive?: boolean;
  fw?: number;
  fz?: number | string;
  size?: string;
  lh?: string | number;
  ta?: "left" | "center" | "right" | "justify";
  w?: string;
  m?: string;
  c?: string;
  rel?: string;
  target?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  style?: React.CSSProperties;
  className?: string;
};

export const ColoredLink: FC<ColoredLinkProps> = ({
  href,
  children,
  isActive,
  rel,
  target,
  onClick,
  style,
  w,
  m,
  className,
  c,
  ...textProps
}) => {
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();

  const linkStyle = {
    textDecoration: "none",
    width: w,
    margin: m,
    display: "inline-block",
    position: "relative" as const,
    ...style,
  };

  const baseColor = c ?? theme.other.textPrimary;
  const color = isActive || hovered ? theme.other.textAccent : baseColor;

  return (
    <Link
      ref={ref}
      href={href}
      rel={rel}
      target={target}
      onClick={onClick}
      className={className}
      style={linkStyle}
    >
      <Text
        {...textProps}
        component="span"
        c={color}
        styles={{
          root: {
            position: "relative",
            transition:
              "color 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: hovered ? "translateY(-1px)" : "translateY(0)",
            willChange: "transform, color",
          },
        }}
      >
        {children}
      </Text>
    </Link>
  );
};


