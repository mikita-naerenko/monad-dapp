import { darkTheme, Theme } from "@rainbow-me/rainbowkit";
import { colors } from "@/shared/config/colors";

export const rainbowKitTheme: Theme = darkTheme({
  accentColor: colors.gradient.start,
  accentColorForeground: colors.neutrals.white,
  borderRadius: "medium",
  fontStack: "system",
  overlayBlur: "small",
});

Object.assign(rainbowKitTheme.colors, {
  modalBackground: colors.background.darkHex,
  generalBorder: "rgba(255, 255, 255, 0.12)",
  modalBorder: "rgba(255, 255, 255, 0.16)",
  actionButtonBorder: "rgba(255, 255, 255, 0.16)",
  actionButtonBorderMobile: "rgba(255, 255, 255, 0.16)",
  closeButton: colors.text.secondary,
  closeButtonBackground: "transparent",
  connectButtonBackground: "rgba(255, 255, 255, 0.04)",
  connectButtonText: colors.neutrals.white,
  modalText: colors.neutrals.white,
  modalTextSecondary: colors.text.secondary,
  profileAction: colors.background.darkHex,
  profileActionHover: colors.grid.colorHex,
  profileForeground: colors.background.darkHex,
});

export const rainbowKitConfig = {
  theme: rainbowKitTheme,
  modalSize: "compact" as const,
  showRecentTransactions: false,
  appInfo: {
    appName: "Miner",
  },
};

