import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useAppTheme } from '../hooks/useAppTheme';
import { Typography } from '../components/ui/Typography';
import { Ionicons } from '@expo/vector-icons';
import { Spacing } from '../constants/theme';
import { Card } from '../components/ui/Card';

export default function KiblatPlaceholderScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Arah Kiblat',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
        }} 
      />
      
      <View style={styles.center}>
        <Ionicons name="compass-outline" size={64} color={colors.primary} style={{ marginBottom: Spacing.lg }} />
        <Typography variant="h2" weight="bold" align="center">Segera Hadir</Typography>
        <Typography variant="body" color="secondary" align="center" style={{ marginTop: Spacing.sm, paddingHorizontal: Spacing.xl }}>
          Fitur kompas Arah Kiblat masih dalam tahap penyempurnaan akurasi.
        </Typography>
      </View>
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
});
