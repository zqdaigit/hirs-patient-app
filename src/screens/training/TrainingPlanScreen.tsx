import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';
import { Card } from '../../components/common';

const TrainingPlanScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}><Text style={styles.title}>训练计划</Text></View>
        <View style={styles.content}>
          <Card style={styles.planCard}>
            <Text style={styles.planTitle}>基础训练方案</Text>
            <Text style={styles.planInfo}>训练日：周一、三、五</Text>
            <Text style={styles.planInfo}>提醒时间：20:00</Text>
            <Text style={styles.sectionTitle}>动作列表</Text>
            <View style={styles.actionList}>
              <Text style={styles.actionItem}>1. 猫式伸展 - 3组 x 30秒</Text>
              <Text style={styles.actionItem}>2. 死虫式 - 3组 x 45秒</Text>
              <Text style={styles.actionItem}>3. 鸟狗式 - 3组 x 30秒</Text>
            </View>
            <View style={styles.buttonRow}>
              <View style={styles.actionButton}><Text style={styles.actionButtonText}>查看详情</Text></View>
              <View style={[styles.actionButton, styles.primaryButton]}><Text style={[styles.actionButtonText, styles.primaryText]}>开始训练</Text></View>
            </View>
          </Card>
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
  planCard: { marginBottom: 16 },
  planTitle: { fontSize: 18, fontWeight: '600', color: colors.textPrimary },
  planInfo: { fontSize: 14, color: colors.textSecondary, marginTop: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.textPrimary, marginTop: 16, marginBottom: 12 },
  actionList: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 12 },
  actionItem: { fontSize: 14, color: colors.textPrimary, paddingVertical: 8 },
  buttonRow: { flexDirection: 'row', marginTop: 16 },
  actionButton: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: colors.primary, marginHorizontal: 4 },
  primaryButton: { backgroundColor: colors.primary },
  actionButtonText: { color: colors.primary, fontSize: 14, fontWeight: '600' },
  primaryText: { color: colors.white },
});

export default TrainingPlanScreen;
