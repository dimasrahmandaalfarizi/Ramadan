import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Typography } from './Typography';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Spacing } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
// Card width fills the container but container has a maxWidth.
const CONTAINER_MAX_WIDTH = 500;
const actualContainerWidth = Math.min(width, CONTAINER_MAX_WIDTH);
// actual container width - 48 (padding) - 16 (margin right)
const CARD_WIDTH = actualContainerWidth - 64;

export function HorizontalBanner() {
  const { colors } = useAppTheme();

  const banners = [
    {
      id: 1,
      title: 'Keutamaan Sholat Tarawih',
      subtitle: 'Pahala ibadah di malam Ramadan',
      icon: 'moon',
      color: '#8B5CF6',
      bg: '#EDE9FE',
    },
    {
      id: 2,
      title: 'Adab Berbuka Puasa',
      subtitle: 'Sunnah-sunnah saat berbuka',
      icon: 'water',
      color: '#F59E0B',
      bg: '#FEF3C7',
    },
    {
      id: 3,
      title: 'Zakat Fitrah',
      subtitle: 'Panduan dan perhitungan zakat',
      icon: 'wallet',
      color: '#10B981',
      bg: '#D1FAE5',
    }
  ];

  return (
    <View style={styles.container}>
      <Typography variant="h3" weight="semiBold" style={styles.sectionTitle}>
        Artikel & Panduan
      </Typography>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={CARD_WIDTH + Spacing.md}
        snapToAlignment="start"
        decelerationRate="fast"
      >
        {banners.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            activeOpacity={0.8}
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={[styles.iconArea, { backgroundColor: item.bg }]}>
              <Ionicons name={item.icon as any} size={28} color={item.color} />
            </View>
            <View style={styles.textArea}>
              <Typography variant="body" weight="bold" numberOfLines={1}>{item.title}</Typography>
              <Typography variant="caption" color="secondary" numberOfLines={2} style={{ marginTop: 4 }}>
                {item.subtitle}
              </Typography>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
    maxWidth: CONTAINER_MAX_WIDTH,
    alignSelf: 'center',
    width: '100%',
  },
  sectionTitle: {
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
  scrollContent: {
    paddingRight: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  card: {
    width: CARD_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: Spacing.md,
  },
  iconArea: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  textArea: {
    flex: 1,
  }
});
