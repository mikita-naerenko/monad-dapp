import {
  MantineColorsTuple,
  MantineThemeOverride,
  createTheme,
} from "@mantine/core";
import { colors, getGradient } from "./colors";

const primary: MantineColorsTuple = [
  colors.primary[0],
  colors.primary[1],
  colors.primary[2],
  colors.primary[3],
  colors.primary[4],
  colors.primary[5],
  colors.primary[6],
  colors.primary[7],
  colors.primary[8],
  colors.primary[9],
];

export const appTheme: MantineThemeOverride = createTheme({
  colors: {
    primary,
  },
  primaryColor: "primary",
  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
  fontSizes: {
    xs: "12px",
    sm: "16px",
    md: "20px",
    lg: "32px",
    xl: "32px",
  },
  headings: {
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    sizes: {
      h1: { fontSize: "32px" },
      h2: { fontSize: "20px" },
      h3: { fontSize: "16px" },
      h4: { fontSize: "16px" },
      h5: { fontSize: "12px" },
      h6: { fontSize: "12px" },
    },
  },
  defaultRadius: "md",
  other: {
    headerBlack: colors.background.darkHex,
    borderMain: colors.border.main,
    textPrimary: colors.text.primary,
    textAccent: colors.text.accent,
    textSecondary: colors.text.secondary,
    textWhite: colors.text.white,
    gradientStart: colors.gradient.start,
    gradientEnd: colors.gradient.end,
    gradient: getGradient(135),
  },
});
