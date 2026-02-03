export const colors = {
  background: {
    dark: [0.05, 0.06, 0.12] as [number, number, number],
    darkHex: "#0D0F1F",
    white: "#ffffff",
    gray: "#F8F7F6",
  },

  grid: {
    color: [0.2, 0.45, 0.55] as [number, number, number],
    colorHex: "#4A7A8C",
  },

  fallingPoint: {
    color: [0.0, 0.9, 1.0] as [number, number, number],
    colorHex: "#00E6FF",
  },

  primary: {
    0: "#f2f6ff",
    1: "#e1e6ff",
    2: "#bfc5ff",
    3: "#9aa2ff",
    4: "#7b85ff",
    5: "#626eff",
    6: "#4f5fff",
    7: "#4353f0",
    8: "#3a47d6",
    9: "#2a36a8",
  },

  gradient: {
    start: "#fa72daff",
    end: "#FF8EE4",
  },

  text: {
    primary: "#0E091C",
    secondary: "#A1A1A1",
    accent: "#6E54FF",
    accent2: "#FF8EE4",
    white: "#ffffff",
  },

  border: {
    main: "#00000033",
  },

  brand: "#6E54FF",
  accent: "#FF8EE4",
  neutrals: {
    offWhite: "#FBFAF9",
    white: "#FFFFFF",
  },
  error: {
    default: "#FF5B45",
  },
} as const;

export function rgbToHex(rgb: [number, number, number]): string {
  const [r, g, b] = rgb.map((v) => Math.round(v * 255));
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}

export function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
}

export function getGradient(angle: number = 135): string {
  return `linear-gradient(${angle}deg, ${colors.gradient.start} 0%, ${colors.gradient.end} 100%)`;
}
