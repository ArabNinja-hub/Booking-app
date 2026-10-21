import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/primary-button';
import { radii, spacing, useAppTheme } from '@/theme';

const FEATURES = [
  'Book appointments in seconds',
  'Keep your schedule in one view',
  'Stay on top of every client',
] as const;

/**
 * Welcome screen — the app's first route (`/`).
 *
 * Layout: a brand tile pinned to the top, a centred headline block that
 * absorbs the leftover height, a feature card, and the primary call to action
 * at the bottom. A ScrollView wrapper means short/landscape screens scroll
 * instead of clipping, and the column is capped at 520pt on tablets.
 */
export default function WelcomeScreen() {
  const theme = useAppTheme();
  const { width, height } = useWindowDimensions();
  const [showComingSoon, setShowComingSoon] = useState(false);

  // Responsive tuning: small phones get tighter gutters and smaller type,
  // wide screens get a larger headline.
  const isCompactWidth = width < 360;
  const isWide = width >= 700;
  const isShort = height < 700;

  const gutter = isCompactWidth ? spacing.lg : spacing.xl;
  const headingSize = isWide ? 46 : isCompactWidth ? 30 : 36;
  const headingLineHeight = Math.round(headingSize * 1.16);
  const sectionGap = isShort ? spacing.xl : spacing.xxl;

  return (
    <SafeAreaView
      edges={['top', 'bottom', 'left', 'right']}
      style={[styles.screen, { backgroundColor: theme.colors.background }]}
    >
      {/* Decorative background glow — purely visual, never interactive. */}
      <View
        pointerEvents="none"
        style={[
          styles.glow,
          styles.glowTop,
          { backgroundColor: theme.colors.backgroundAccent, opacity: theme.scheme === 'dark' ? 0.35 : 0.65 },
        ]}
      />
      <View
        pointerEvents="none"
        style={[
          styles.glow,
          styles.glowBottom,
          { backgroundColor: theme.colors.backgroundAccent, opacity: theme.scheme === 'dark' ? 0.22 : 0.45 },
        ]}
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: gutter, paddingBottom: spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.column}>
          {/* Brand mark */}
          <View
            style={[
              styles.brandTile,
              {
                backgroundColor: theme.colors.primary,
                shadowColor: theme.colors.shadow,
              },
            ]}
          >
            <Text style={styles.brandInitials} allowFontScaling={false}>
              BB
            </Text>
          </View>

          {/* Headline block — grows to absorb spare vertical space */}
          <View style={[styles.hero, { paddingVertical: sectionGap }]}>
            <Text
              accessibilityRole="header"
              style={[
                styles.heading,
                {
                  color: theme.colors.textPrimary,
                  fontSize: headingSize,
                  lineHeight: headingLineHeight,
                },
              ]}
            >
              Welcome to Business Booking
            </Text>
            <Text
              style={[
                styles.subtitle,
                {
                  color: theme.colors.textSecondary,
                  fontSize: isCompactWidth ? 16 : 18,
                },
              ]}
            >
              Your next app starts here.
            </Text>
          </View>

          {/* What the app is for */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                shadowColor: theme.colors.shadow,
              },
            ]}
          >
            {FEATURES.map((feature) => (
              <View key={feature} style={styles.featureRow}>
                <View style={[styles.featureDot, { backgroundColor: theme.colors.primary }]} />
                <Text style={[styles.featureText, { color: theme.colors.textPrimary }]}>
                  {feature}
                </Text>
              </View>
            ))}
          </View>

          {/* Call to action */}
          <View style={[styles.footer, { paddingTop: sectionGap }]}>
            <PrimaryButton
              label="Get Started"
              accessibilityHint="Starts the booking flow"
              onPress={() => setShowComingSoon(true)}
            />
            <Text
              accessibilityLiveRegion="polite"
              style={[styles.helper, { color: theme.colors.textSecondary }]}
            >
              {showComingSoon
                ? 'Booking flow coming soon — this button is ready to wire up.'
                : 'Bookings, schedules and clients, all in one app.'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    borderRadius: radii.pill,
  },
  glowTop: {
    width: 340,
    height: 340,
    top: -140,
    right: -110,
  },
  glowBottom: {
    width: 260,
    height: 260,
    bottom: -120,
    left: -100,
  },
  scrollContent: {
    flexGrow: 1,
  },
  column: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
  },
  brandTile: {
    width: 56,
    height: 56,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 5,
  },
  brandInitials: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  hero: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  heading: {
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  subtitle: {
    marginTop: spacing.md,
    lineHeight: 26,
    fontWeight: '500',
  },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: radii.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 3,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: radii.pill,
    marginRight: spacing.md,
  },
  featureText: {
    flexShrink: 1,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '500',
  },
  footer: {
    gap: spacing.md,
  },
  helper: {
    minHeight: 20,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
  },
});
