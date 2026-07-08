import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, SafeAreaView, Dimensions } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Spacing } from '../../constants/theme';
import { Typography } from '../../components/ui/Typography';

const { width } = Dimensions.get('window');
const isWeb = width > 800;

interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
}

interface SurahDetail {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  ayat: Ayat[];
}

export default function SurahDetailScreen() {
  const { id } = useLocalSearchParams();
  const { colors, isDark } = useAppTheme();
  const [surah, setSurah] = useState<SurahDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSurahDetail() {
      try {
        const response = await fetch(`https://equran.id/api/v2/surat/${id}`);
        const json = await response.json();
        if (json.code === 200) {
          setSurah(json.data);
        }
      } catch (error) {
        console.error('Failed to fetch surah detail:', error);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchSurahDetail();
    }
  }, [id]);

  const renderHeader = () => (
    <View style={[styles.headerCard, { backgroundColor: colors.primary }]}>
      <Typography variant="h2" weight="bold" color="default" style={{ color: '#FFF' }}>
        {surah?.namaLatin}
      </Typography>
      <Typography variant="body" color="default" style={{ color: '#FFF', opacity: 0.9, marginTop: 4 }}>
        {surah?.arti} • {surah?.jumlahAyat} Ayat
      </Typography>
      
      {/* Basmalah except for Surah At-Tawbah (9) */}
      {surah?.nomor !== 9 && surah?.nomor !== 1 && (
        <Typography variant="h2" style={[styles.basmalah, { color: '#FFF' }]}>
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </Typography>
      )}
    </View>
  );

  const renderAyat = ({ item }: { item: Ayat }) => (
    <View style={[styles.ayatContainer, { borderBottomColor: colors.border }]}>
      <View style={styles.ayatTopRow}>
        <View style={[styles.ayatNumberBadge, { backgroundColor: colors.backgroundSelected }]}>
          <Typography variant="caption" weight="bold">{item.nomorAyat}</Typography>
        </View>
      </View>
      
      <Typography 
        variant="h2" 
        align="right" 
        style={[styles.arabicText, { color: colors.text }]}
      >
        {item.teksArab}
      </Typography>
      
      <Typography variant="body" color="primary" style={styles.latinText}>
        {item.teksLatin}
      </Typography>
      
      <Typography variant="body" color="secondary" style={styles.translationText}>
        {item.teksIndonesia}
      </Typography>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: surah ? surah.namaLatin : 'Memuat...',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
        }} 
      />
      
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={surah?.ayat || []}
          keyExtractor={(item) => item.nomorAyat.toString()}
          renderItem={renderAyat}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={[styles.listContent, isWeb && styles.listContentWeb]}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: Spacing.md,
  },
  listContentWeb: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  headerCard: {
    padding: Spacing.xl,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  basmalah: {
    marginTop: Spacing.xl,
    fontFamily: 'sans-serif',
    lineHeight: 40,
  },
  ayatContainer: {
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
  },
  ayatTopRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: Spacing.sm,
  },
  ayatNumberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arabicText: {
    fontFamily: 'sans-serif',
    lineHeight: 50,
    marginBottom: Spacing.md,
    writingDirection: 'rtl',
  },
  latinText: {
    marginBottom: Spacing.sm,
    fontStyle: 'italic',
  },
  translationText: {
    lineHeight: 22,
  },
});
