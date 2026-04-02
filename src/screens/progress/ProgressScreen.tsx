import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';
import { Card } from '../../components/common';

const ProgressScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}><Text style={styles.title}>我的进度</Text></View>
        <View style={styles.content}>
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}><Text style={styles.statValue}>128</Text><Text style={styles.statLabel}>总训练次数</Text></Card>
            <Card style={styles.statCard}><Text style={styles.statValue}>15</Text><Text style={styles.statLabel}>连续天数</Text></Card>
            <Card style={styles.statCard}><Text style={styles.statValue}>85%</Text><Text style={styles.statLabel}>本月完成率</Text></Card>
            <Card style={styles.statCard}><Text style={styles.statValue}>12h</Text><Text style={styles.statLabel}>本月训练时长</Text></Card>
          </View>
          <Text style={styles.sectionTitle}>训练趋势</Text>
          <Card style={styles.chartCard}><Text style={styles.chartPlaceholder}>📊 趋势图表区域</Text></Card>
          <Text style={styles.sectionTitle}>训练记录</Text>
          <Card style={styles.recordCard}><Text style={styles.recordDate}>2026-04-02</Text><Text style={styles.recordInfo}>25 分钟 · 5 个动作</Text><Text style={styles.recordStatus}>已完成</Text></Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: 16, backgroundColor: colors.primary },
  title: { fontSize: 20, fontWeight: 'bold', color: colors.white },
  content: { padding: 16 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  statCard: { width: '48%', alignItems: 'center', marginBottom: 12, paddingVertical: 20 },
  statValue: { fontSize: 28, fontWeight: 'bold', color: colors.primary },
  statLabel: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: colors.textPrimary, marginTop: 16, marginBottom: 12 },
  chartCard: { height: 200, justifyContent: 'center', alignItems: 'center' },
  chartPlaceholder: { color: colors.textTertiary },
  recordCard: { marginBottom: 12 },
  recordDate: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  recordInfo: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
  recordStatus: { fontSize: 12, color: colors.success, marginTop: 4 },
});

export default ProgressScreen;
