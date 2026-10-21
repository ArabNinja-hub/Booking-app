import { useColorScheme } from 'react-native';

/**
 * Central design tokens for the app.
 *
 * Screens and components should never hard-code colours, spacing or radii —
 * they read them from here so the look stays consistent and light/dark mode
 * keeps working everywhere.
 */

/** Raw brand colours. Prefer `theme.colors` inside components. */
export const palette = {
  blue50: '#EAF4FF',
  blue100: '#D6E9FF',
  blue500: '#208AEF', // matches the splash screen colour in app.json
  blue600: '#1370CC',
  blue400: '#5AAAF7',
  ink900: '#0B1526',
  ink500: '#5B6B82',
  cloud50: '#F5F8FD',
  white: '#FFFFFF',
  night900: '#070D18',
  night800: '#0F1A2B',
  nightBorder: '#22314A',
  nightText: '#F2F6FD',
  nightMuted: '#9FB0C7',
} as const;

/** 4pt spacing scale — keeps margins and padding predictable. */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radii = {
  sm: 10,
  md: 16,
  lg: 22,
  pill: 999,
} as const;

export type Theme = {
  scheme: 'light' | 'dark';
  colors: {
    background: string;
    /** Soft decorative tint used for the background glow shapes. */
    backgroundAccent: string;
    surface: string;
    border: string;
    textPrimary: string;
    textSecondary: string;
    primary: string;
    primaryPressed: string;
    onPrimary: string;
    /** Shadow colour for elevated brand surfaces. */
    shadow: string;
  };
};

const lightTheme: Theme = {
  scheme: 'light',
  colors: {
    background: palette.cloud50,
    backgroundAccent: palette.blue100,
    surface: palette.white,
    border: '#E3EAF3',
    textPrimary: palette.ink900,
    textSecondary: palette.ink500,
    primary: palette.blue500,
    primaryPressed: palette.blue600,
    onPrimary: palette.white,
    shadow: 'rgba(15, 72, 130, 0.28)',
  },
};

const darkTheme: Theme = {
  scheme: 'dark',
  colors: {
    background: palette.night900,
    backgroundAccent: palette.night800,
    surface: palette.night800,
    border: palette.nightBorder,
    textPrimary: palette.nightText,
    textSecondary: palette.nightMuted,
    primary: palette.blue400,
    primaryPressed: palette.blue500,
    onPrimary: palette.white,
    shadow: 'rgba(0, 0, 0, 0.55)',
  },
};

/**
 * Returns the active theme for the current system appearance.
 * Usage: `const theme = useAppTheme();`
 */
export function useAppTheme(): Theme {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
}
