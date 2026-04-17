export const colors = {
  background: '#0D0B10',
  surface: '#18141E',
  surfaceElevated: '#231C2E',
  accent: '#A83B59',
  accentSoft: '#C86F88',
  text: '#F5F2F8',
  textMuted: '#A89CB5',
  border: '#332C40',
  success: '#7FC8A9',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 10,
  md: 14,
  lg: 20,
} as const;

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 26,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;
