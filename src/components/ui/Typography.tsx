import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Fonts } from '../../constants/theme';

export interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  color?: 'default' | 'secondary' | 'primary';
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export function Typography({
  variant = 'body',
  color = 'default',
  weight = 'regular',
  align = 'auto',
  style,
  children,
  ...props
}: TypographyProps) {
  const { colors } = useAppTheme();

  const getTextColor = () => {
    switch (color) {
      case 'secondary':
        return colors.textSecondary;
      case 'primary':
        return colors.primary;
      default:
        return colors.text;
    }
  };

  const getFontSize = () => {
    switch (variant) {
      case 'h1':
        return 32;
      case 'h2':
        return 24;
      case 'h3':
        return 18;
      case 'caption':
        return 12;
      case 'body':
      default:
        return 14;
    }
  };

  const getFontFamily = () => {
    switch (weight) {
      case 'medium':
        return Fonts.medium;
      case 'semiBold':
        return Fonts.semiBold;
      case 'bold':
        return Fonts.bold;
      case 'regular':
      default:
        return Fonts.regular;
    }
  };

  return (
    <Text
      style={[
        {
          color: getTextColor(),
          fontSize: getFontSize(),
          fontFamily: getFontFamily(),
          textAlign: align,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}
