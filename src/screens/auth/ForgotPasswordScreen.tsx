import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';

const ForgotPasswordScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView><View style={styles.content}><Text style={styles.title}>找回密码</Text></View></ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.textPrimary },
});

export default ForgotPasswordScreen;
