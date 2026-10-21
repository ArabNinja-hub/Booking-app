import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAppTheme } from '@/theme';

/**
 * Root layout for Expo Router.
 *
 * Every route in `src/app` is rendered inside this Stack. The navigation
 * header is hidden here because screens draw their own headers, and the
 * stack background is themed so there is no white flash in dark mode.
 */
export default function RootLayout() {
  const theme = useAppTheme();

  return (
    <SafeAreaProvider>
      <StatusBar style={theme.scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
    </SafeAreaProvider>
  );
}
