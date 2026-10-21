import { useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { radii, spacing, useAppTheme } from '@/theme';

type PrimaryButtonProps = {
  /** Text shown inside the button. */
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  /** Optional hint for screen readers. */
  accessibilityHint?: string;
  /** Extra styles (e.g. margins) applied around the button. */
  style?: StyleProp<ViewStyle>;
};

/**
 * The app's main call-to-action button.
 *
 * Two layers on purpose:
 *  - the outer `View` owns the shadow and the rounded shape, so the shadow is
 *    not clipped by the inner layer;
 *  - the inner `Pressable` owns the touch feedback: a native Android ripple
 *    (clipped to the pill shape with `overflow: 'hidden'`) plus a colour/scale
 *    change on every platform.
 */
export function PrimaryButton({
  label,
  onPress,
  disabled = false,
  accessibilityHint,
  style,
}: PrimaryButtonProps) {
  const theme = useAppTheme();
  const [pressed, setPressed] = useState(false);

  return (
    <View
      style={[
        styles.shadowLayer,
        {
          backgroundColor: theme.colors.primary,
          shadowColor: theme.colors.shadow,
          opacity: disabled ? 0.55 : 1,
          transform: [{ scale: pressed && !disabled ? 0.985 : 1 }],
        },
        style,
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        android_ripple={{ color: 'rgba(255, 255, 255, 0.24)' }}
        style={[
          styles.pressable,
          {
            backgroundColor:
              pressed && !disabled ? theme.colors.primaryPressed : theme.colors.primary,
          },
        ]}
      >
        <Text style={styles.label} numberOfLines={1} maxFontSizeMultiplier={1.4}>
          {label}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowLayer: {
    borderRadius: radii.pill,
    // iOS / web shadow; Android uses `elevation` below.
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 6,
  },
  pressable: {
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: radii.pill,
    // Keeps the Android ripple inside the rounded corners.
    overflow: 'hidden',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
