import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#1F2937', // Deep gray
    textSecondary: '#6B7280',
    background: '#FAFAFA', // Soft Cream/White
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E5E7EB',
    primary: '#10B981', // Forest/Mint Green accent
    primaryLight: '#D1FAE5',
    border: '#E5E7EB',
    card: '#FFFFFF',
  },
  dark: {
    text: '#F9FAFB', // Off white
    textSecondary: '#9CA3AF',
    background: '#111827', // Deep Gray / Black
    backgroundElement: '#1F2937',
    backgroundSelected: '#374151',
    primary: '#10B981', // Mint Green accent
    primaryLight: '#065F46',
    border: '#374151',
    card: '#1F2937',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semiBold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
