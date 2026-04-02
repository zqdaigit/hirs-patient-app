import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({ label, error, containerStyle, style, ...props }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor={colors.textTertiary}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 14, color: colors.textSecondary, marginBottom: 8 },
  input: { height: 48, borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 16, fontSize: 16, color: colors.textPrimary, backgroundColor: colors.surface },
  inputError: { borderColor: colors.error },
  error: { fontSize: 12, color: colors.error, marginTop: 4 },
});
