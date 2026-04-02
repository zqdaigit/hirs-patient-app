import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';
import { Card } from '../../components/common';

const HomeScreen: React.FC = () => {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '早上好';
    if (hour < 18) return '下午好';
    return '晚上好';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.date}>2026年4月2日 星期三</Text>
          <Text style={styles.greeting}>{greeting()}，张小明</Text>
        </View>
        <View style={styles.content}>
          <Card style={styles.trainingCard}>
            <Text style={styles.cardTitle}>🎯 今日训练</Text>
            <Text style={styles.cardSubtitle}>3 个动作 · 约 25 分钟</Text>
            <Text style={styles.cardStatus}>未开始</Text>
            <View style={styles.startButton}><Text style={styles.startButtonText}>开始训练</Text></View>
          </Card>
          <Text style={styles.sectionTitle}>本周统计</Text>
          <View style={styles.statsRow}>
            <Card style={styles.statCard}><Text style={styles.statValue}>3</Text><Text style={styles.statLabel}>训练</Text></Card>
            <Card style={styles.statCard}><Text style={styles.statValue}>75%</Text><Text style={styles.statLabel}>完成率</Text></Card>
            <Card style={styles.statCard}><Text style={styles.statValue}>5</Text><Text style={styles.statLabel}>连续</Text></Card>
          </View>
          <Text style={styles.sectionTitle}>快捷入口</Text>
          <View style={styles.quickLinks}>
            <Card style={styles.quickLink}><Text style={styles.quickLinkIcon}>📚</Text><Text style={styles.quickLinkText}>知识库</Text></Card>
            <Card style={styles.quickLink}><Text style={styles.quickLinkIcon}>📅</Text><Text style={styles.quickLinkText}>复诊</Text></Card>
            <Card style={styles.quickLink}><Text style={styles.quickLinkIcon}>❓</Text><Text style={styles.quickLinkText}>帮助</Text></Card>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: 16, backgroundColor: colors.primary },
  date: { fontSize: 14, color: colors.white, opacity: 0.8 },
  greeting: { fontSize: 24, fontWeight: 'bold', color: colors.white, marginTop: 4 },
  content: { padding: 16 },
  trainingCard: { marginBottom: 24 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: colors.textPrimary },
  cardSubtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 8 },
  cardStatus: { fontSize: 14, color: colors.textTertiary, marginTop: 8 },
  startButton: { backgroundColor: colors.primary, padding: 12, borderRadius: 24, alignItems: 'center', marginTop: 16 },
  startButtonText: { color: colors.white, fontSize: 16, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: colors.textPrimary, marginBottom: 12 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  statCard: { flex: 1, alignItems: 'center', marginHorizontal: 4, paddingVertical: 16 },
  statValue: { fontSize: 24, fontWeight: 'bold', color: colors.primary },
  statLabel: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
  quickLinks: { flexDirection: 'row', justifyContent: 'space-between' },
  quickLink: { flex: 1, alignItems: 'center', marginHorizontal: 4, paddingVertical: 16 },
  quickLinkIcon: { fontSize: 24 },
  quickLinkText: { fontSize: 12, color: colors.textSecondary, marginTop: 8 },
});

export default HomeScreen;
