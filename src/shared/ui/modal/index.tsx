"use client";

import { FC, ReactNode } from "react";
import { Modal, Drawer, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { colors } from "@/shared/config/colors";

export interface ResponsiveModalProps {
  opened: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  size?: string | number;
  fullScreen?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  centered?: boolean;
  padding?: string | number;
}

/**
 * ResponsiveModal - базовый компонент модального окна
 * На десктопе использует Modal, на мобильных - Drawer
 */
export const ResponsiveModal: FC<ResponsiveModalProps> = ({
  opened,
  onClose,
  title,
  children,
  size = "md",
  fullScreen = false,
  closeOnClickOutside = true,
  closeOnEscape = true,
  centered = true,
  padding,
}) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const commonProps = {
    opened,
    onClose,
    title,
    closeOnClickOutside,
    closeOnEscape,
  };

  if (isMobile) {
    return (
      <Drawer
        {...commonProps}
        position="bottom"
        size={fullScreen ? "100%" : "auto"}
        padding={padding ?? "md"}
        closeButtonProps={{
          style: {
            position: "absolute",
            right: 0,
            top: 0,
            margin: 0,
            width: 40,
            height: 40,
            backgroundColor: "transparent",
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = colors.text.accent;
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = colors.text.secondary;
          },
        }}
        styles={{
          content: {
            backgroundColor: colors.background.white,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
          header: {
            backgroundColor: colors.background.white,
            borderBottom: `1px solid ${colors.border.main}`,
            padding: "16px 20px",
            position: "relative",
          },
          title: {
            color: colors.text.primary,
            fontWeight: 600,
            fontSize: 18,
          },
          body: {
            padding: "0 24px 16px 24px",
          },
        }}
      >
        {children}
      </Drawer>
    );
  }

  return (
    <Modal
      {...commonProps}
      size={size}
      centered={centered}
      fullScreen={fullScreen}
      padding={padding}
      closeButtonProps={{
        style: {
          position: "absolute",
          right: 8,
          top: 8,
          margin: 0,
          width: 32,
          height: 32,
          backgroundColor: "transparent",
          color: colors.text.secondary,
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = colors.text.accent;
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = colors.text.secondary;
        },
      }}
      styles={{
        content: {
          backgroundColor: colors.background.white,
          borderRadius: 6,
        },
        header: {
          backgroundColor: colors.background.white,
          padding: "16px 24px",
          position: "relative",
        },
        title: {
          color: colors.text.primary,
          fontWeight: 400,
          fontSize: 16,
          width: "100%",
          textAlign: "center",
        },
        body: {
          padding: "0 24px 16px 24px",
          height: 375,
        },
      }}
    >
      {children}
    </Modal>
  );
};
