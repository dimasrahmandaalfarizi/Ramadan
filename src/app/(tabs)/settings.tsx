import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Spacing } from '../../constants/theme';
import { Typography } from '../../components/ui/Typography';
import { ThemeToggle } from '../../components/ui/ThemeToggle';
import { Card } from '../../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { colors, isDark } = useAppTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Typography variant="h2" weight="bold">Lainnya</Typography>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        
        <Typography variant="h3" weight="semiBold" style={styles.sectionTitle}>Tampilan</Typography>
        <Card padding="md" style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconBox, { backgroundColor: colors.primaryLight }]}>
                <Ionicons name="moon" size={24} color={colors.primary} />
              </View>
              <View style={{ marginLeft: Spacing.md }}>
                <Typography variant="body" weight="bold">Mode Gelap</Typography>
                <Typography variant="caption" color="secondary">Ubah tema aplikasi</Typography>
              </View>
            </View>
            <ThemeToggle />
          </View>
        </Card>

        <Typography variant="h3" weight="semiBold" style={styles.sectionTitle}>Tentang</Typography>
        <Card padding="md" style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconBox, { backgroundColor: colors.primaryLight }]}>
                <Ionicons name="information-circle" size={24} color={colors.primary} />
              </View>
              <View style={{ marginLeft: Spacing.md }}>
                <Typography variant="body" weight="bold">Versi Aplikasi</Typography>
                <Typography variant="caption" color="secondary">1.0.0</Typography>
              </View>
            </View>
          </View>
        </Card>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  container: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  sectionTitle: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.xs,
  },
  settingCard: {
    marginBottom: Spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
