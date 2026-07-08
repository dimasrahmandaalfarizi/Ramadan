import { useColorScheme } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';
import { Colors } from '../constants/theme';

export function useAppTheme() {
  const systemColorScheme = useColorScheme();
  const themeMode = useThemeStore((state) => state.themeMode);

  const activeTheme =
    themeMode === 'system' ? (systemColorScheme ?? 'light') : themeMode;

  return {
    theme: activeTheme,
    colors: Colors[activeTheme],
    isDark: activeTheme === 'dark',
  };
}
