import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Spacing } from '../../constants/theme';
import { Typography } from '../../components/ui/Typography';
import { ThemeToggle } from '../../components/ui/ThemeToggle';
import { Card } from '../../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { colors, isDark } = useAppTheme();

  const handlePress = (item: string) => {
    Alert.alert('Fitur Segera Hadir', `Pengaturan "${item}" akan tersedia pada pembaruan berikutnya.`);
  };

  const SettingRow = ({ 
    icon, 
    title, 
    subtitle, 
    rightElement, 
    onPress, 
    isLast = false,
    iconColor = colors.primary 
  }: any) => (
    <TouchableOpacity 
      activeOpacity={onPress ? 0.7 : 1} 
      onPress={onPress}
      style={[styles.settingRowContainer, !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border }]}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.iconBox, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
          <Ionicons name={icon} size={22} color={iconColor} />
        </View>
        <View style={{ marginLeft: Spacing.md }}>
          <Typography variant="body" weight="semiBold">{title}</Typography>
          {subtitle && (
            <Typography variant="caption" color="secondary" style={{ marginTop: 2 }}>{subtitle}</Typography>
          )}
        </View>
      </View>
      <View>
        {rightElement ? rightElement : (
          onPress && <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Typography variant="h2" weight="bold">Pengaturan</Typography>
      </View>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Akun Section */}
        <Typography variant="h3" weight="semiBold" style={styles.sectionTitle}>Akun Saya</Typography>
        <Card padding="none" style={styles.settingGroup}>
          <SettingRow 
            icon="person" 
            title="Profil Pengguna" 
            subtitle="Atur nama, email, dan foto profil" 
            onPress={() => handlePress('Profil')}
          />
          <SettingRow 
            icon="notifications" 
            title="Notifikasi" 
            subtitle="Atur pengingat sholat & puasa" 
            onPress={() => handlePress('Notifikasi')} 
            isLast 
          />
        </Card>

        {/* Preferensi Ibadah */}
        <Typography variant="h3" weight="semiBold" style={styles.sectionTitle}>Preferensi Ibadah</Typography>
        <Card padding="none" style={styles.settingGroup}>
          <SettingRow 
            icon="location" 
            title="Lokasi Waktu Sholat" 
            subtitle="Deteksi otomatis (Jakarta)" 
            onPress={() => handlePress('Lokasi')}
          />
          <SettingRow 
            icon="calculator" 
            title="Metode Perhitungan" 
            subtitle="Kemenag RI" 
            onPress={() => handlePress('Kalkulasi')}
          />
          <SettingRow 
            icon="text" 
            title="Ukuran Huruf Arab" 
            subtitle="Sedang" 
            onPress={() => handlePress('Ukuran Huruf')}
            isLast
          />
        </Card>

        {/* Tampilan Section */}
        <Typography variant="h3" weight="semiBold" style={styles.sectionTitle}>Tampilan</Typography>
        <Card padding="none" style={styles.settingGroup}>
          <SettingRow 
            icon="moon" 
            title="Mode Gelap" 
            subtitle="Ubah tema aplikasi" 
            rightElement={<ThemeToggle />} 
            isLast
          />
        </Card>

        {/* Bantuan & Info */}
        <Typography variant="h3" weight="semiBold" style={styles.sectionTitle}>Tentang</Typography>
        <Card padding="none" style={styles.settingGroup}>
          <SettingRow 
            icon="help-circle" 
            title="Pusat Bantuan" 
            onPress={() => handlePress('Bantuan')}
          />
          <SettingRow 
            icon="star" 
            title="Beri Rating Aplikasi" 
            iconColor="#F59E0B"
            onPress={() => handlePress('Rating')}
          />
          <SettingRow 
            icon="information-circle" 
            title="Versi Aplikasi" 
            subtitle="Qalbu v1.0.0" 
            isLast 
          />
        </Card>

        <View style={styles.footerInfo}>
          <Typography variant="caption" color="secondary" align="center">
            Dibuat dengan ❤️ untuk ibadah yang lebih baik.
          </Typography>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  container: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  sectionTitle: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.xs,
  },
  settingGroup: {
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  settingRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerInfo: {
    marginTop: Spacing.xxl,
    marginBottom: Spacing.xl,
    alignItems: 'center',
    opacity: 0.7,
  }
});
