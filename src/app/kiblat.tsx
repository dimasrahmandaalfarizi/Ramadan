import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Platform, Dimensions, Animated, Easing, ActivityIndicator, useWindowDimensions } from 'react-native';
import { Stack } from 'expo-router';
import { useAppTheme } from '../hooks/useAppTheme';
import { Typography } from '../components/ui/Typography';
import { Ionicons } from '@expo/vector-icons';
import { Spacing } from '../constants/theme';
import { Card } from '../components/ui/Card';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';

// Koordinat Ka'bah, Mekkah
const MECCA_LAT = 21.422487;
const MECCA_LNG = 39.826206;

function calculateQibla(latitude: number, longitude: number): number {
  const latK = (MECCA_LAT * Math.PI) / 180.0;
  const lngK = (MECCA_LNG * Math.PI) / 180.0;
  const lat = (latitude * Math.PI) / 180.0;
  const lng = (longitude * Math.PI) / 180.0;
  
  const dLng = lngK - lng;
  const y = Math.sin(dLng);
  const x = Math.cos(lat) * Math.tan(latK) - Math.sin(lat) * Math.cos(dLng);
  
  let qibla = Math.atan2(y, x);
  qibla = (qibla * 180.0) / Math.PI;
  return (qibla + 360.0) % 360.0;
}

export default function KiblatScreen() {
  const { colors, isDark } = useAppTheme();
  const { width } = useWindowDimensions();
  const COMPASS_SIZE = width * 0.7 > 300 ? 300 : width * 0.7;
  
  const [qiblaBearing, setQiblaBearing] = useState<number | null>(null);
  const [heading, setHeading] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Animation value for smooth rotation
  const [spinAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    (async () => {
      // 1. Get Location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Izin lokasi ditolak. Tidak bisa menghitung arah Kiblat.');
        setLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        const bearing = calculateQibla(location.coords.latitude, location.coords.longitude);
        setQiblaBearing(bearing);
      } catch (err) {
        setErrorMsg('Gagal mendapatkan lokasi GPS.');
      }
      
      setLoading(false);

      // 2. Setup Magnetometer
      if (Platform.OS !== 'web') {
        Magnetometer.setUpdateInterval(100);
        Magnetometer.addListener((result) => {
          let h = Math.atan2(result.y, result.x) * (180 / Math.PI);
          h = h >= 0 ? h : h + 360;
          setHeading(h);
        });
      }
    })();

    return () => {
      if (Platform.OS !== 'web') {
        Magnetometer.removeAllListeners();
      }
    };
  }, []);

  // Smooth rotation effect
  useEffect(() => {
    // Determine target rotation. 
    // The compass points North. We rotate it to -heading. 
    // Then we add qiblaBearing to point a specific needle to Mecca.
    // However, it's easier to just rotate the compass card by -heading, 
    // and draw a fixed pointer at the Qibla bearing on the card itself.
    // Here we'll rotate the entire compass base.
    
    Animated.timing(spinAnim, {
      toValue: heading,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [heading]);

  const compassRotation = spinAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '-360deg'],
  });

  // Calculate where the Qibla needle should point relative to North
  const qiblaPointerRotation = qiblaBearing ? `${qiblaBearing}deg` : '0deg';

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
      
      {Platform.OS === 'web' ? (
        <View style={styles.center}>
          <Ionicons name="compass" size={64} color={colors.primary} style={{ marginBottom: Spacing.lg }} />
          <Typography variant="h2" weight="bold" align="center">Tidak Didukung di Web</Typography>
          <Typography variant="body" color="secondary" align="center" style={{ marginTop: Spacing.sm, paddingHorizontal: Spacing.xl }}>
            Sensor kompas memerlukan perangkat mobile asli (Android/iOS). Silakan jalankan aplikasi ini di HP untuk menggunakan fitur Arah Kiblat.
          </Typography>
        </View>
      ) : loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Typography variant="body" style={{ marginTop: Spacing.md }}>Mencari lokasi...</Typography>
        </View>
      ) : errorMsg ? (
        <View style={styles.center}>
          <Ionicons name="warning" size={48} color={colors.notification} style={{ marginBottom: Spacing.md }} />
          <Typography variant="body" align="center" style={{ paddingHorizontal: Spacing.xl }}>{errorMsg}</Typography>
        </View>
      ) : (
        <View style={styles.compassContainer}>
          <Typography variant="h3" weight="bold" align="center" style={{ marginBottom: Spacing.xxl }}>
            Arah Kiblat
          </Typography>
          
          <View style={[styles.compassWrapper, { width: COMPASS_SIZE, height: COMPASS_SIZE }]}>
            {/* The outer rotating compass base (North, East, South, West) */}
            <Animated.View style={[styles.compassBase, { borderColor: colors.primaryLight, borderRadius: COMPASS_SIZE / 2, transform: [{ rotate: compassRotation }] }]}>
              <Typography variant="h3" weight="bold" style={[styles.directionLabel, styles.north]}>U</Typography>
              <Typography variant="h3" weight="bold" style={[styles.directionLabel, styles.east]}>T</Typography>
              <Typography variant="h3" weight="bold" style={[styles.directionLabel, styles.south]}>S</Typography>
              <Typography variant="h3" weight="bold" style={[styles.directionLabel, styles.west]}>B</Typography>

              {/* The Qibla Pointer attached to the rotating base */}
              <View style={[styles.qiblaPointerContainer, { transform: [{ rotate: qiblaPointerRotation }] }]}>
                <Ionicons name="navigate" size={32} color={colors.primary} style={styles.qiblaIcon} />
              </View>
            </Animated.View>
            
            {/* Center dot */}
            <View style={[styles.centerDot, { backgroundColor: colors.primary }]} />
          </View>
          
          <Card style={styles.infoCard} padding="md">
            <Typography variant="body" align="center" color="secondary">
              Sudut Kiblat dari lokasimu:
            </Typography>
            <Typography variant="h2" weight="bold" align="center" color="primary">
              {qiblaBearing ? Math.round(qiblaBearing) : '--'}°
            </Typography>
          </Card>
        </View>
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
  compassContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  compassWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: Spacing.xxl,
  },
  compassBase: {
    width: '100%',
    height: '100%',
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  directionLabel: {
    position: 'absolute',
  },
  north: { top: 10 },
  south: { bottom: 10 },
  east: { right: 15 },
  west: { left: 15 },
  qiblaPointerContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  qiblaIcon: {
    marginTop: -16, // pull it out slightly
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  centerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
  },
  infoCard: {
    width: '100%',
    maxWidth: 300,
    marginTop: Spacing.xl,
  }
});
