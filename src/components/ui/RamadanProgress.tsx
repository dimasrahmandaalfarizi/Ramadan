import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from './Card';
import { Typography } from './Typography';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Spacing } from '../../constants/theme';
import dayjs from 'dayjs';

export function RamadanProgress() {
  const { colors } = useAppTheme();
  
  // Hardcoded for demo/simplicity, you can make this dynamic using dayjs and Aladhan hijri date
  const ramadanStartDate = dayjs('2026-02-19'); 
  const today = dayjs();
  
  let currentDay = today.diff(ramadanStartDate, 'day') + 1;
  if (currentDay < 1) currentDay = 1; // if before ramadan, show day 1
  if (currentDay > 30) currentDay = 30; // max 30 days
  
  const progressPercent = (currentDay / 30) * 100;
  
  let phase = "Rahmat";
  if (currentDay > 10 && currentDay <= 20) phase = "Maghfirah";
  if (currentDay > 20) phase = "Pembebasan Api Neraka";

  return (
    <Card padding="lg" style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h3" weight="bold">Progres Ramadan</Typography>
        <View style={[styles.badge, { backgroundColor: colors.primaryLight }]}>
          <Typography variant="caption" color="primary" weight="bold">
            Fase {phase}
          </Typography>
        </View>
      </View>
      
      <View style={styles.progressTextRow}>
        <Typography variant="body" weight="medium">Hari ke-{currentDay}</Typography>
        <Typography variant="body" color="secondary">30 Hari</Typography>
      </View>
      
      <View style={[styles.progressBarBg, { backgroundColor: colors.backgroundSelected }]}>
        <View style={[styles.progressBarFill, { width: `${progressPercent}%`, backgroundColor: colors.primary }]} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 8,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  progressBarBg: {
    height: 10,
    borderRadius: 5,
    width: '100%',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  }
});
