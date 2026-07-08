import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, Modal, TextInput, Switch } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Spacing } from '../../constants/theme';
import { Typography } from '../../components/ui/Typography';
import { ThemeToggle } from '../../components/ui/ThemeToggle';
import { Card } from '../../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';
import { useSettings } from '../../context/SettingsContext';

export default function SettingsScreen() {
  const { colors, isDark } = useAppTheme();
  const settings = useSettings();
  
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [fontModalVisible, setFontModalVisible] = useState(false);

  const [tempName, setTempName] = useState(settings.userName);
  const [tempEmail, setTempEmail] = useState(settings.userEmail);

  const CITIES = ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Makassar', 'Semarang', 'Palembang', 'Yogyakarta'];
  const FONTS = [
    { label: 'Kecil', value: 'small' },
    { label: 'Sedang', value: 'medium' },
    { label: 'Besar', value: 'large' }
  ];

  const handleSaveProfile = () => {
    settings.updateSettings({ userName: tempName, userEmail: tempEmail });
    setProfileModalVisible(false);
  };

  const handleToggleNotification = () => {
    settings.updateSettings({ notificationsEnabled: !settings.notificationsEnabled });
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
            subtitle={settings.userName || "Atur nama dan email"} 
            onPress={() => {
              setTempName(settings.userName);
              setTempEmail(settings.userEmail);
              setProfileModalVisible(true);
            }}
          />
          <SettingRow 
            icon="notifications" 
            title="Notifikasi" 
            subtitle={settings.notificationsEnabled ? "Aktif" : "Mati"} 
            rightElement={
              <Switch 
                value={settings.notificationsEnabled} 
                onValueChange={handleToggleNotification} 
                trackColor={{ true: colors.primary, false: colors.border }}
              />
            }
            isLast 
          />
        </Card>

        {/* Preferensi Ibadah */}
        <Typography variant="h3" weight="semiBold" style={styles.sectionTitle}>Preferensi Ibadah</Typography>
        <Card padding="none" style={styles.settingGroup}>
          <SettingRow 
            icon="location" 
            title="Lokasi Waktu Sholat" 
            subtitle={settings.prayerLocation} 
            onPress={() => setLocationModalVisible(true)}
          />
          <SettingRow 
            icon="text" 
            title="Ukuran Huruf Arab" 
            subtitle={FONTS.find(f => f.value === settings.arabicFontSize)?.label || 'Sedang'} 
            onPress={() => setFontModalVisible(true)}
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

        <View style={styles.footerInfo}>
          <Typography variant="caption" color="secondary" align="center">
            Dibuat dengan ❤️ untuk ibadah yang lebih baik.
          </Typography>
        </View>
      </ScrollView>

      {/* Profile Modal */}
      <Modal visible={profileModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Typography variant="h2" weight="bold" style={{ marginBottom: Spacing.lg }}>Edit Profil</Typography>
            
            <Typography variant="caption" color="secondary">Nama</Typography>
            <TextInput 
              style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
              value={tempName}
              onChangeText={setTempName}
              placeholder="Masukkan nama"
              placeholderTextColor={colors.textSecondary}
            />
            
            <Typography variant="caption" color="secondary" style={{ marginTop: Spacing.md }}>Email</Typography>
            <TextInput 
              style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
              value={tempEmail}
              onChangeText={setTempEmail}
              placeholder="Masukkan email"
              keyboardType="email-address"
              placeholderTextColor={colors.textSecondary}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setProfileModalVisible(false)} style={styles.btnCancel}>
                <Typography variant="body" color="secondary">Batal</Typography>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveProfile} style={[styles.btnSave, { backgroundColor: colors.primary }]}>
                <Typography variant="body" color="surface" weight="bold">Simpan</Typography>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Location Modal */}
      <Modal visible={locationModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Typography variant="h2" weight="bold" style={{ marginBottom: Spacing.lg }}>Pilih Kota</Typography>
            <ScrollView style={{ maxHeight: 300 }}>
              {CITIES.map(city => (
                <TouchableOpacity 
                  key={city}
                  style={[styles.optionRow, { borderBottomColor: colors.border }]}
                  onPress={() => {
                    settings.updateSettings({ prayerLocation: city });
                    setLocationModalVisible(false);
                  }}
                >
                  <Typography variant="body" weight={settings.prayerLocation === city ? 'bold' : 'regular'} color={settings.prayerLocation === city ? 'primary' : 'default'}>
                    {city}
                  </Typography>
                  {settings.prayerLocation === city && <Ionicons name="checkmark" size={20} color={colors.primary} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setLocationModalVisible(false)} style={[styles.btnCancel, { marginTop: Spacing.md, alignSelf: 'center' }]}>
              <Typography variant="body" color="secondary">Tutup</Typography>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Font Size Modal */}
      <Modal visible={fontModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Typography variant="h2" weight="bold" style={{ marginBottom: Spacing.lg }}>Ukuran Huruf Arab</Typography>
            {FONTS.map(font => (
              <TouchableOpacity 
                key={font.value}
                style={[styles.optionRow, { borderBottomColor: colors.border }]}
                onPress={() => {
                  settings.updateSettings({ arabicFontSize: font.value as any });
                  setFontModalVisible(false);
                }}
              >
                <Typography variant="body" weight={settings.arabicFontSize === font.value ? 'bold' : 'regular'} color={settings.arabicFontSize === font.value ? 'primary' : 'default'}>
                  {font.label}
                </Typography>
                {settings.arabicFontSize === font.value && <Ionicons name="checkmark" size={20} color={colors.primary} />}
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setFontModalVisible(false)} style={[styles.btnCancel, { marginTop: Spacing.md, alignSelf: 'center' }]}>
              <Typography variant="body" color="secondary">Tutup</Typography>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    padding: Spacing.xl,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: Spacing.md,
    marginTop: 4,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  btnCancel: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  btnSave: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: 10,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});
