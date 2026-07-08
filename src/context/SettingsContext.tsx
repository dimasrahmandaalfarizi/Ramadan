import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FontSize = 'small' | 'medium' | 'large';

interface SettingsData {
  userName: string;
  userEmail: string;
  notificationsEnabled: boolean;
  prayerLocation: string;
  prayerMethod: string;
  arabicFontSize: FontSize;
}

interface SettingsContextType extends SettingsData {
  updateSettings: (newSettings: Partial<SettingsData>) => Promise<void>;
  getArabicFontSizeValue: () => number;
}

const defaultSettings: SettingsData = {
  userName: 'Hamba Allah',
  userEmail: '',
  notificationsEnabled: true,
  prayerLocation: 'Jakarta',
  prayerMethod: 'Kemenag RI',
  arabicFontSize: 'medium',
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem('@qalbu_settings');
      if (stored) {
        setSettings({ ...defaultSettings, ...JSON.parse(stored) });
      }
    } catch (e) {
      console.error('Failed to load settings', e);
    } finally {
      setIsLoaded(true);
    }
  };

  const updateSettings = async (newSettings: Partial<SettingsData>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    try {
      await AsyncStorage.setItem('@qalbu_settings', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  };

  const getArabicFontSizeValue = () => {
    switch (settings.arabicFontSize) {
      case 'small': return 32;
      case 'large': return 64;
      case 'medium':
      default:
        return 48; // Default medium
    }
  };

  if (!isLoaded) return null; // or a loading spinner

  return (
    <SettingsContext.Provider value={{ ...settings, updateSettings, getArabicFontSizeValue }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
