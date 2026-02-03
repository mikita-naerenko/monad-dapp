"use client";

import {
  Button as MantineButton,
  ButtonProps as MantineButtonProps,
  useMantineTheme,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { colors } from "@/shared/config/colors";

type ButtonVariant = "primary" | "secondary" | "default" | "outline";

type NativeButtonProps = ComponentPropsWithoutRef<"button">;

export interface ButtonProps
  extends Omit<MantineButtonProps, "variant" | "children">,
    Pick<
      NativeButtonProps,
      | "onClick"
      | "onMouseEnter"
      | "onMouseLeave"
      | "disabled"
      | "type"
      | "form"
      | "formAction"
      | "formEncType"
      | "formMethod"
      | "formNoValidate"
      | "formTarget"
      | "name"
      | "value"
    > {
  variant?: ButtonVariant;
  children: ReactNode;
  disableAnimation?: boolean;
}

export const Button = ({
  variant = "default",
  children,
  style,
  disableAnimation = false,
  ...props
}: ButtonProps) => {
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();

  const baseStyle: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    ...(!disableAnimation && {
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    }),
    ...(style as React.CSSProperties),
  };

  if (variant === "primary") {
    return (
      <MantineButton
        ref={ref}
        variant="filled"
        style={{
          ...baseStyle,
          background:
            "radial-gradient(50% 50% at 50% 50%, #6e54ff00 0, #ffffff1f 100%), #6E54FF",
          border: "none",
          color: theme.other.textWhite,
          boxShadow:
            "0 1px 2px #0003, inset 0 1px .5px #ffffff40, inset 0 -1px .5px #ffffff40, 0 0 0 1px #4f47ebe6",

          transform:
            !disableAnimation && hovered ? "translateY(-1px)" : "translateY(0)",
        }}
        loaderProps={{ type: "dots", size: "md" }}
        {...props}
      >
        <span
          aria-hidden="true"
          style={{
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            background: "radial-gradient(50% 50%, #6e54ffa8 0, #ffffff80 100%)",
            boxShadow:
              "0 1px 2px #0003, inset 0 .75px .66px #fffc, inset 0 -.75px .66px #fffc, 0 0 0 1px #4f47eb80",
            opacity: !disableAnimation && hovered ? 1 : 0,
            transition: "opacity .35s ease-out",
            zIndex: 1,
          }}
        />
        <span style={{ position: "relative", zIndex: 2 }}>{children}</span>
      </MantineButton>
    );
  }

  if (variant === "secondary") {
    return (
      <MantineButton
        ref={ref}
        variant="filled"
        style={{
          ...baseStyle,
          background: `radial-gradient(50% 50% at 50% 50%, #6e54ff00 0, #ffffff1f 100%), #E25EC2`,
          border: "none",
          color: theme.other.textWhite,
          boxShadow:
            "0 1px 2px #0003, inset 0 1px .5px #ffffff40, inset 0 -1px .5px #ffffff40, 0 0 0 1px #E25EC2e6",

          transform:
            !disableAnimation && hovered ? "translateY(-1px)" : "translateY(0)",
        }}
        loaderProps={{ type: "dots", size: "md" }}
        {...props}
      >
        <span
          aria-hidden="true"
          style={{
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            background: "radial-gradient(50% 50%, #E25EC2a8 0, #ffffff80 100%)",
            boxShadow:
              "0 1px 2px #0003, inset 0 .75px .66px #fffc, inset 0 -.75px .66px #fffc, 0 0 0 1px #E25EC280",
            opacity: !disableAnimation && hovered ? 1 : 0,
            transition: "opacity .35s ease-out",
            zIndex: 1,
          }}
        />
        <span style={{ position: "relative", zIndex: 2 }}>{children}</span>
      </MantineButton>
    );
  }

  if (variant === "outline") {
    return (
      <MantineButton
        ref={ref}
        variant="default"
        style={{
          ...baseStyle,
          background: hovered ? "#F8F7F6" : "#F8F7F6",
          borderWidth: hovered ? "0" : "0.5px 0.5px 0.55px 0.5px",
          borderStyle: "solid",
          borderColor: hovered ? "transparent" : "rgba(0, 0, 0, 0.2)",
          color: theme.other.textPrimary,
          boxShadow: hovered
            ? "0 0 5.3px 3px #E5E0E0 inset, 0 4px 4px 0 #00000040"
            : "none",
        }}
        loaderProps={{ type: "dots", size: "md" }}
        {...props}
      >
        <span style={{ position: "relative", zIndex: 2 }}>{children}</span>
      </MantineButton>
    );
  }

  return (
    <MantineButton ref={ref} variant={"default"} style={baseStyle} {...props}>
      {children}
    </MantineButton>
  );
};
