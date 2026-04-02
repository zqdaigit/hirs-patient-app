import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const typography = StyleSheet.create({
  h1: { fontSize: 28, fontWeight: 'bold', color: colors.textPrimary },
  h2: { fontSize: 24, fontWeight: 'bold', color: colors.textPrimary },
  h3: { fontSize: 20, fontWeight: '600', color: colors.textPrimary },
  body: { fontSize: 16, color: colors.textPrimary },
  bodySmall: { fontSize: 14, color: colors.textSecondary },
  caption: { fontSize: 12, color: colors.textTertiary },
});
