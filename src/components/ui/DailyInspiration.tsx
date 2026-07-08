import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from './Card';
import { Typography } from './Typography';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Spacing } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export function DailyInspiration() {
  const { colors, isDark } = useAppTheme();

  return (
    <Card padding="lg" style={[styles.container, { backgroundColor: isDark ? colors.backgroundSelected : colors.primaryLight, borderColor: 'transparent' }]}>
      <View style={styles.quoteIcon}>
        <Ionicons name="chatbubble-ellipses-outline" size={24} color={colors.primary} />
      </View>
      <Typography variant="body" weight="medium" style={styles.quoteText} align="center">
        "Barangsiapa berpuasa Ramadhan atas dasar iman dan mengharap pahala dari Allah, maka dosanya yang telah lalu akan diampuni."
      </Typography>
      <Typography variant="caption" color="secondary" weight="bold" align="center" style={{ marginTop: Spacing.sm }}>
        (HR. Bukhari no. 38 dan Muslim no. 760)
      </Typography>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
    alignItems: 'center',
    position: 'relative',
    overflow: 'visible',
  },
  quoteIcon: {
    marginBottom: Spacing.sm,
    opacity: 0.8,
  },
  quoteText: {
    lineHeight: 22,
    fontStyle: 'italic',
  }
});
