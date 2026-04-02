import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  elevation?: number;
}

export const Card: React.FC<CardProps> = ({ children, style, onPress, elevation = 2 }) => {
  const cardStyle = [styles.card, { shadowOpacity: elevation * 0.1 }, style];
  if (onPress) {
    return <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.7}>{children}</TouchableOpacity>;
  }
  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 12, padding: 16, shadowColor: colors.black, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2 },
});
