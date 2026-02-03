import { FC, ReactNode } from "react";
import { useMantineTheme } from "@mantine/core";

interface GradientBorderProps {
  children: ReactNode;
  borderRadius?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Компонент-обертка для создания градиентного бордера
 * Использует псевдоэлемент для поддержки border-radius
 */
export const GradientBorder: FC<GradientBorderProps> = ({
  children,
  borderRadius = 7,
  className,
  style,
}) => {
  const theme = useMantineTheme();

  return (
    <div
      className={className}
      style={{
        position: "relative",
        borderRadius,
        padding: "1px",
        background: theme.other.gradient,
        ...style,
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: typeof borderRadius === "number" ? borderRadius - 1 : borderRadius,
          background: theme.other.headerBlack || "transparent",
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

