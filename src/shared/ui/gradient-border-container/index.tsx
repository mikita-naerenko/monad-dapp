"use client";
import { CSSProperties, FC, ReactNode } from "react";
import styles from "./styles.module.scss";
import { cx } from "@/shared/lib/utils";

interface GradientBorderContainerProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "black";
  style?: CSSProperties;
}

export const GradientBorderContainer: FC<GradientBorderContainerProps> = ({
  children,
  className,
  variant = "primary",
  style,
}) => {
  const gradient =
    variant === "secondary"
      ? "linear-gradient(135deg, #6E54FF 0%, #FF8EE4 100%)"
      : "linear-gradient(135deg, #6E54FF 0%, #FF8EE4 100%)";

  const backgroundColor =
    variant === "secondary" ? "rgba(30, 9, 70, 0.9)" : "rgba(28, 11, 64, 0.9)";

  return (
    <div
      className={cx(styles.container, className)}
      style={
        {
          "--gradient": gradient,
          "--background": backgroundColor,
          ...style,
        } as React.CSSProperties
      }
      data-variant={variant}
    >
      {children}
    </div>
  );
};
