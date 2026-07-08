import React from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { useAppTheme } from '../hooks/useAppTheme';
import { Typography } from '../components/ui/Typography';
import { Spacing } from '../constants/theme';
import { Card } from '../components/ui/Card';

import haditsData from '../data/hadits.json';

const HADITS_LIST = haditsData;

export default function HaditsScreen() {
  const { colors } = useAppTheme();

  const renderItem = ({ item }: { item: typeof HADITS_LIST[0] }) => (
    <Card style={styles.card} padding="lg">
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: colors.primaryLight }]}>
          <Typography variant="caption" weight="bold" color="primary">
            {item.perawi}
          </Typography>
        </View>
        <Typography variant="h3" weight="bold" style={{ marginTop: Spacing.sm }}>
          {item.title}
        </Typography>
      </View>
      
      <Typography 
        variant="h2" 
        align="right" 
        style={[styles.arabicText, { color: colors.text }]}
      >
        {item.arab}
      </Typography>
      
      <Typography variant="body" color="secondary" style={styles.artiText}>
        "{item.arti}"
      </Typography>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Hadits Pilihan',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
        }} 
      />
      
      <FlatList
        data={HADITS_LIST}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: Spacing.lg,
  },
  card: {
    marginBottom: Spacing.md,
  },
  header: {
    marginBottom: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  arabicText: {
    fontFamily: 'sans-serif',
    lineHeight: 50,
    marginBottom: Spacing.md,
    writingDirection: 'rtl',
  },
  artiText: {
    lineHeight: 22,
    fontStyle: 'italic',
  }
});
