import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Spacing } from '../../constants/theme';

export interface CardProps extends ViewProps {
  padding?: keyof typeof Spacing;
  noShadow?: boolean;
}

export function Card({
  padding = 'md',
  noShadow = false,
  style,
  children,
  ...props
}: CardProps) {
  const { colors, isDark } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          padding: Spacing[padding],
        },
        !noShadow && !isDark ? styles.shadow : null,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
});
