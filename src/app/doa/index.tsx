import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Stack } from 'expo-router';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from '../../components/ui/Typography';
import { Ionicons } from '@expo/vector-icons';
import { Spacing } from '../../constants/theme';
import { Card } from '../../components/ui/Card';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DOA_LIST = [
  {
    id: '1',
    title: 'Doa Sebelum Tidur',
    arab: 'بِسْمِكَ اللّٰهُمَّ اَحْيَا وَاَمُوْتُ',
    latin: 'Bismikallôhumma ahyâ wa amûtu.',
    arti: 'Dengan nama-Mu, ya Allah, aku hidup dan aku mati.'
  },
  {
    id: '2',
    title: 'Doa Bangun Tidur',
    arab: 'اَلْحَمْدُ لِلّٰهِ الَّذِيْ اَحْيَانَا بَعْدَ مَا اَمَاتَنَا وَاِلَيْهِ النُّشُوْرُ',
    latin: 'Alhamdu lillâhilladzî ahyânâ ba‘da mâ amâtanâ wa ilaihin nusyûr.',
    arti: 'Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami, dan kepada-Nya lah kebangkitan.'
  },
  {
    id: '3',
    title: 'Doa Sebelum Makan',
    arab: 'اَللّٰهُمَّ بَارِكْ لَنَا فِيْمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ',
    latin: 'Allâhumma bârik lanâ fîmâ razaqtanâ wa qinâ ‘adzâban nâr.',
    arti: 'Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka.'
  },
  {
    id: '4',
    title: 'Doa Sesudah Makan',
    arab: 'اَلْحَمْدُ لِلّٰهِ الَّذِيْ اَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِيْنَ',
    latin: 'Alhamdu lillâhilladzî ath‘amanâ wa saqônâ wa ja‘alanâ muslimîn.',
    arti: 'Segala puji bagi Allah yang telah memberi kami makan dan minum, serta menjadikan kami orang-orang muslim.'
  },
  {
    id: '5',
    title: 'Doa Masuk Kamar Mandi',
    arab: 'اَللّٰهُمَّ اِنِّيْ اَعُوْذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
    latin: 'Allâhumma innî a‘ûdzu bika minal khubutsi wal khabâ’its.',
    arti: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari godaan setan laki-laki dan setan perempuan.'
  }
];

export default function DoaListScreen() {
  const { colors } = useAppTheme();
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
              style={[styles.arabicText, { color: colors.text }]}
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
