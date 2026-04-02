import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../theme/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title, onPress, variant = 'primary', disabled = false, loading = false, style, textStyle
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary': return styles.secondary;
      case 'outline': return styles.outline;
      case 'text': return styles.text;
      default: return styles.primary;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline': return styles.outlineText;
      case 'text': return styles.textButtonText;
      default: return styles.buttonText;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.white} />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  outline: { backgroundColor: colors.transparent, borderWidth: 1, borderColor: colors.primary },
  text: { backgroundColor: colors.transparent },
  disabled: { opacity: 0.5 },
  buttonText: { color: colors.white, fontSize: 16, fontWeight: '600' },
  outlineText: { color: colors.primary, fontSize: 16, fontWeight: '600' },
  textButtonText: { color: colors.primary, fontSize: 16, fontWeight: '600' },
});
