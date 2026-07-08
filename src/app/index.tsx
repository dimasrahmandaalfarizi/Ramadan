import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';
import { Spacing, Colors } from '../constants/theme';
import { Typography } from '../components/ui/Typography';
import { Card } from '../components/ui/Card';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { DailyInspiration } from '../components/ui/DailyInspiration';
import { RamadanProgress } from '../components/ui/RamadanProgress';
import { HorizontalBanner } from '../components/ui/HorizontalBanner';
import { getSchedule } from '../services/schedule';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

const { width } = Dimensions.get('window');
const isWeb = width > 800;

export default function DashboardScreen() {
  const { colors, isDark } = useAppTheme();
  const [schedule, setSchedule] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [nextPrayer, setNextPrayer] = useState<{name: string, time: string} | null>(null);

  useEffect(() => {
    async function loadSchedule() {
      try {
        const data = await getSchedule('Surabaya');
        const todayIso = dayjs().format('YYYY-MM-DD');
        let todayData = data.schedule.find(
          (item: any) => dayjs(item.isoDate).format('YYYY-MM-DD') === todayIso
        );

        if (!todayData && data.schedule.length > 0) {
           todayData = data.schedule[0]; 
        }

        setSchedule(todayData);
        calculateNextPrayer(todayData?.timings);
      } catch (err) {
        setError('Gagal memuat jadwal.');
      } finally {
        setLoading(false);
      }
    }
    loadSchedule();
  }, []);

  const calculateNextPrayer = (timings: any) => {
    if (!timings) return;
    const now = dayjs();
    const prayerOrder = ['Imsak', 'Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'];
    
    for (const prayer of prayerOrder) {
      const timeString = timings[prayer];
      if (timeString) {
        const prayerTime = dayjs(timeString, 'HH:mm');
        // We set the date to today to properly compare times
        const prayerDate = now.hour(prayerTime.hour()).minute(prayerTime.minute()).second(0);
        if (now.isBefore(prayerDate)) {
          setNextPrayer({ name: prayer, time: timeString });
          return;
        }
      }
    }
    // If all passed, next is Imsak tomorrow (for visual sake just show Imsak)
    setNextPrayer({ name: 'Imsak (Besok)', time: timings['Imsak'] });
  };

  const getPrayerIcon = (name: string): keyof typeof Ionicons.glyphMap => {
    switch (name) {
      case 'Imsak': return 'moon-outline';
      case 'Subuh': return 'partly-sunny-outline';
      case 'Dzuhur': return 'sunny-outline';
      case 'Ashar': return 'cloudy-outline';
      case 'Maghrib': return 'sunset-outline';
      case 'Isya': return 'moon';
      default: return 'time-outline';
    }
  };

  const QuickAction = ({ icon, title, color }: { icon: any, title: string, color: string }) => (
    <TouchableOpacity activeOpacity={0.7} style={styles.actionItem}>
      <View style={[styles.actionIconArea, { backgroundColor: color }]}>
        <Ionicons name={icon} size={28} color="#FFF" />
      </View>
      <Typography variant="caption" weight="medium" align="center" style={{ marginTop: 8 }}>
        {title}
      </Typography>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={[styles.container, isWeb && styles.containerWeb]}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Typography variant="h2" weight="bold">Assalamu'alaikum,</Typography>
            <Typography variant="body" color="secondary" style={{ marginTop: Spacing.xs }}>
              Surabaya, Indonesia
            </Typography>
          </View>
          <ThemeToggle />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
        ) : error ? (
          <Typography color="secondary" align="center">{error}</Typography>
        ) : schedule ? (
          <>
            <RamadanProgress />

            {/* Hero Section */}
            <Card style={styles.heroCard} padding="lg">
              <View style={styles.heroTop}>
                <View style={[styles.badge, { backgroundColor: colors.primaryLight }]}>
                  <Typography variant="caption" color="primary" weight="bold">
                    {schedule.hijri}
                  </Typography>
                </View>
                <Typography variant="body" color="secondary" weight="medium">
                  {schedule.date}
                </Typography>
              </View>
              
              <View style={styles.heroMain}>
                <Typography variant="body" weight="medium" style={{ opacity: 0.8 }}>
                  Menuju waktu berikutnya
                </Typography>
                <View style={styles.nextPrayerRow}>
                  <Typography variant="h1" weight="bold" color="primary">
                    {nextPrayer?.name || '...'}
                  </Typography>
                  <Typography variant="h2" weight="semiBold" style={{ marginLeft: Spacing.md }}>
                    {nextPrayer?.time || '--:--'}
                  </Typography>
                </View>
              </View>
            </Card>

            {/* Quick Actions */}
            <View style={styles.quickActionsContainer}>
              <QuickAction icon="book" title="Al-Quran" color="#10B981" />
              <QuickAction icon="star" title="Doa Harian" color="#F59E0B" />
              <QuickAction icon="compass" title="Arah Kiblat" color="#3B82F6" />
              <QuickAction icon="library" title="Hadits" color="#8B5CF6" />
            </View>

            <DailyInspiration />

            {/* Prayer Times Grid */}
            <Typography variant="h3" weight="semiBold" style={styles.sectionTitle}>
              Jadwal Sholat
            </Typography>
            
            <View style={styles.timingsGrid}>
              {['Imsak', 'Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'].map((name) => {
                const time = schedule.timings[name];
                const isNext = nextPrayer?.name?.includes(name);
                
                return (
                  <View 
                    key={name} 
                    style={[
                      styles.timingCard, 
                      { backgroundColor: isNext ? colors.primaryLight : colors.card, borderColor: colors.border }
                    ]}
                  >
                    <Ionicons 
                      name={getPrayerIcon(name)} 
                      size={24} 
                      color={isNext ? colors.primary : colors.textSecondary} 
                      style={{ marginBottom: Spacing.sm }}
                    />
                    <Typography variant="caption" color={isNext ? "primary" : "secondary"}>
                      {name}
                    </Typography>
                    <Typography variant="h3" weight="bold" color={isNext ? "primary" : "default"} style={{ marginTop: 4 }}>
                      {time}
                    </Typography>
                  </View>
                );
              })}
            </View>

            <HorizontalBanner />
          </>
        ) : (
          <Typography color="secondary" align="center">Tidak ada jadwal</Typography>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  containerWeb: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    marginTop: Spacing.md,
  },
  loader: {
    padding: Spacing.xxl,
  },
  heroCard: {
    marginBottom: Spacing.xl,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  heroMain: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  nextPrayerRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: Spacing.sm,
  },
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 20,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xxl,
    paddingHorizontal: Spacing.xs,
  },
  actionItem: {
    alignItems: 'center',
    width: '22%',
  },
  actionIconArea: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  timingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timingCard: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
});
