import React from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { useAppTheme } from '../hooks/useAppTheme';
import { Typography } from '../components/ui/Typography';
import { Spacing } from '../constants/theme';
import { Card } from '../components/ui/Card';

const HADITS_LIST = [
  {
    id: '1',
    title: 'Niat dan Ikhlas',
    arab: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
    arti: 'Sesungguhnya amal itu tergantung pada niatnya, dan sesungguhnya setiap orang akan mendapatkan apa yang ia niatkan.',
    perawi: 'HR. Bukhari & Muslim'
  },
  {
    id: '2',
    title: 'Meninggalkan yang Tidak Bermanfaat',
    arab: 'مِنْ حُسْنِ إِسْلَامِ الْمَرْءِ تَرْكُهُ مَا لَا يَعْنِيهِ',
    arti: 'Di antara kebaikan Islam seseorang adalah meninggalkan hal yang tidak bermanfaat baginya.',
    perawi: 'HR. Tirmidzi'
  },
  {
    id: '3',
    title: 'Menahan Amarah',
    arab: 'لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ',
    arti: 'Orang yang kuat bukanlah yang pandai bergulat, namun orang yang kuat adalah yang mampu menahan dirinya ketika marah.',
    perawi: 'HR. Bukhari & Muslim'
  },
  {
    id: '4',
    title: 'Berkata Baik atau Diam',
    arab: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
    arti: 'Barangsiapa beriman kepada Allah dan hari akhir, maka berkatalah yang baik atau diam.',
    perawi: 'HR. Bukhari & Muslim'
  },
  {
    id: '5',
    title: 'Senyum Adalah Sedekah',
    arab: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ',
    arti: 'Senyummu di hadapan saudaramu adalah sedekah bagimu.',
    perawi: 'HR. Tirmidzi'
  }
];

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
