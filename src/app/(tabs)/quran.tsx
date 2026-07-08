import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Spacing } from '../../constants/theme';
import { Typography } from '../../components/ui/Typography';
import { Ionicons } from '@expo/vector-icons';

interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
}

export default function QuranListScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSurahs() {
      try {
        const response = await fetch('https://equran.id/api/v2/surat');
        const json = await response.json();
        if (json.code === 200) {
          setSurahs(json.data);
        }
      } catch (error) {
        console.error('Failed to fetch surahs:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSurahs();
  }, []);

  const renderItem = ({ item }: { item: Surah }) => (
    <TouchableOpacity 
      activeOpacity={0.7} 
      onPress={() => router.push(`/quran/${item.nomor}`)}
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
    >
      <View style={styles.leftContent}>
        <View style={[styles.numberBadge, { backgroundColor: colors.primaryLight }]}>
          <Typography variant="caption" weight="bold" color="primary">{item.nomor}</Typography>
        </View>
        <View>
          <Typography variant="body" weight="bold">{item.namaLatin}</Typography>
          <Typography variant="caption" color="secondary" style={{ marginTop: 2 }}>
            {item.arti} • {item.jumlahAyat} Ayat
          </Typography>
        </View>
      </View>
      <View style={styles.rightContent}>
        <Typography variant="h3" weight="bold" color="primary" style={styles.arabicName}>
          {item.nama}
        </Typography>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Al-Quran',
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
          data={surahs}
          keyExtractor={(item) => item.nomor.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
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
    padding: Spacing.lg,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  numberBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  arabicName: {
    fontFamily: 'sans-serif', // fallback for Arabic
  }
});
