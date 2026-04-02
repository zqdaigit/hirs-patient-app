import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface LoadingProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({ size = 'large', color = colors.primary, text }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  text: { marginTop: 12, fontSize: 14, color: colors.textSecondary },
});
