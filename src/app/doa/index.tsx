import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Stack } from 'expo-router';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useSettings } from '../../context/SettingsContext';
import { Typography } from '../../components/ui/Typography';
import { Ionicons } from '@expo/vector-icons';
import { Spacing } from '../../constants/theme';
import { Card } from '../../components/ui/Card';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

import doaData from '../../data/doa.json';

const DOA_LIST = doaData;

export default function DoaListScreen() {
  const { colors } = useAppTheme();
  const settings = useSettings();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const renderItem = ({ item }: { item: typeof DOA_LIST[0] }) => {
    const isExpanded = expandedId === item.id;
    
    return (
      <Card style={styles.card} padding="none">
        <TouchableOpacity 
          style={styles.cardHeader} 
          onPress={() => toggleExpand(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.titleRow}>
            <View style={[styles.iconBox, { backgroundColor: colors.primaryLight }]}>
              <Ionicons name="star" size={20} color={colors.primary} />
            </View>
            <Typography variant="body" weight="bold" style={{ flex: 1, marginLeft: Spacing.md }}>
              {item.title}
            </Typography>
            <Ionicons 
              name={isExpanded ? "chevron-up" : "chevron-down"} 
              size={24} 
              color={colors.textSecondary} 
            />
          </View>
        </TouchableOpacity>
        
        {isExpanded && (
          <View style={[styles.cardBody, { borderTopColor: colors.border }]}>
            <Typography 
              variant="h2" 
              align="right" 
              style={[styles.arabicText, { color: colors.text, fontSize: settings.getArabicFontSizeValue() - 16, lineHeight: settings.getArabicFontSizeValue() }]}
            >
              {item.arab}
            </Typography>
            <Typography variant="body" color="primary" style={styles.latinText}>
              {item.latin}
            </Typography>
            <Typography variant="body" color="secondary" style={styles.artiText}>
              "{item.arti}"
            </Typography>
          </View>
        )}
      </Card>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Doa Harian',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
        }} 
      />
      
      <FlatList
        data={DOA_LIST}
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
    overflow: 'hidden',
  },
  cardHeader: {
    padding: Spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    padding: Spacing.md,
    borderTopWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  arabicText: {
    fontFamily: 'sans-serif',
    lineHeight: 50,
    marginBottom: Spacing.md,
    writingDirection: 'rtl',
  },
  latinText: {
    fontStyle: 'italic',
    marginBottom: Spacing.sm,
  },
  artiText: {
    lineHeight: 22,
  }
});
