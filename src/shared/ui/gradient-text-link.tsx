"use client";

import { Text, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import Link from "next/link";
import { FC, ReactNode } from "react";

type GradientTextLinkProps = {
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
  rel?: string;
  target?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  style?: React.CSSProperties;
  className?: string;
};

export const GradientTextLink: FC<GradientTextLinkProps> = ({
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
  ...textProps
}) => {
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();
  const showGradient = hovered || isActive;

  const linkStyle = {
    textDecoration: "none",
    width: w,
    margin: m,
    display: "inline-block",
    position: "relative" as const,
    ...style,
  };

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
        styles={{
          root: {
            position: "relative",
            transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: hovered ? "translateY(-1px)" : "translateY(0)",
            willChange: "transform",
          },
        }}
      >
        <span
          style={{
            color: theme.other.textPrimary,
            opacity: showGradient ? 0 : 1,
            transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {children}
        </span>
        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `linear-gradient(135deg, ${theme.other.gradientStart} 0%, ${theme.other.gradientEnd} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            opacity: showGradient ? 1 : 0,
            transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: "none",
          }}
        >
          {children}
        </span>
      </Text>
    </Link>
  );
};
