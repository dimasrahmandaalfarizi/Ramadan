import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { useAppTheme } from '../hooks/useAppTheme';
import { Typography } from '../components/ui/Typography';
import { Card } from '../components/ui/Card';
import { Spacing } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@qadha_count';

const AMALAN_LIST = [
  {
    id: '1',
    title: 'Berdzikir dan Berdoa',
    desc: 'Memperbanyak bacaan tasbih, tahmid, tahlil, dan takbir, serta berdoa memohon ampunan.',
    icon: 'heart-half'
  },
  {
    id: '2',
    title: 'Mendengarkan Al-Quran',
    desc: 'Walau tidak boleh menyentuh mushaf, mendengarkan lantunan ayat suci tetap mendatangkan pahala.',
    icon: 'headset'
  },
  {
    id: '3',
    title: 'Bersedekah',
    desc: 'Memberi makan orang berbuka puasa pahalanya sama seperti orang yang berpuasa.',
    icon: 'wallet'
  },
  {
    id: '4',
    title: 'Mencari Ilmu Agama',
    desc: 'Membaca buku-buku islami, mendengarkan ceramah, atau menghadiri majelis ilmu.',
    icon: 'library'
  }
];

export default function HaidScreen() {
  const { colors } = useAppTheme();
  const [qadhaCount, setQadhaCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        setQadhaCount(parseInt(stored, 10));
      }
    } catch (e) {
      console.error('Failed to load qadha data');
    } finally {
      setIsLoaded(true);
    }
  };

  const updateCount = async (newCount: number) => {
    if (newCount < 0) return;
    setQadhaCount(newCount);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, newCount.toString());
    } catch (e) {
      console.error('Failed to save qadha data');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Jurnal Haid',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
        }} 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Qadha Tracker */}
        <Typography variant="h3" weight="semiBold" style={styles.sectionTitle}>
          Kalkulator Qadha Puasa
        </Typography>
        <Typography variant="body" color="secondary" style={styles.sectionSubtitle}>
          Catat hari puasamu yang terlewat agar tidak lupa untuk menggantinya setelah Ramadan.
        </Typography>

        <Card style={styles.trackerCard} padding="lg">
          <Typography variant="body" align="center" color="secondary" style={{ marginBottom: Spacing.sm }}>
            Total Hutang Puasa
          </Typography>
          
          <View style={styles.counterRow}>
            <TouchableOpacity 
              onPress={() => updateCount(qadhaCount - 1)}
              style={[styles.circleBtn, { backgroundColor: colors.primaryLight }]}
              disabled={qadhaCount <= 0}
            >
              <Ionicons name="remove" size={24} color={qadhaCount <= 0 ? colors.textSecondary : colors.primary} />
            </TouchableOpacity>

            <View style={styles.numberContainer}>
              <Typography variant="h1" weight="bold" color="primary" style={{ fontSize: 48 }}>
                {isLoaded ? qadhaCount : '-'}
              </Typography>
              <Typography variant="caption" weight="semiBold" color="primary">
                HARI
              </Typography>
            </View>

            <TouchableOpacity 
              onPress={() => updateCount(qadhaCount + 1)}
              style={[styles.circleBtn, { backgroundColor: colors.primary }]}
            >
              <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Guide Section */}
        <Typography variant="h3" weight="semiBold" style={[styles.sectionTitle, { marginTop: Spacing.xl }]}>
          Amalan Saat Haid
        </Typography>
        <Typography variant="body" color="secondary" style={styles.sectionSubtitle}>
          Ibadah tidak berhenti karena siklus. Berikut amalan utama bagi wanita haid di bulan Ramadan.
        </Typography>

        {AMALAN_LIST.map((amalan, index) => (
          <Card key={amalan.id} style={styles.amalanCard} padding="md">
            <View style={[styles.iconBox, { backgroundColor: colors.primaryLight }]}>
              <Ionicons name={amalan.icon as any} size={24} color={colors.primary} />
            </View>
            <View style={styles.amalanText}>
              <Typography variant="body" weight="bold">
                {amalan.title}
              </Typography>
              <Typography variant="caption" color="secondary" style={{ marginTop: 4 }}>
                {amalan.desc}
              </Typography>
            </View>
          </Card>
        ))}

        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    marginBottom: Spacing.xs,
  },
  sectionSubtitle: {
    marginBottom: Spacing.lg,
    lineHeight: 20,
  },
  trackerCard: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.sm,
  },
  numberContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amalanCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  amalanText: {
    flex: 1,
  }
});
