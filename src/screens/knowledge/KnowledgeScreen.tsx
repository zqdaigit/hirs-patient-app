import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';
import { Card } from '../../components/common';

const categories = [
  { name: '基础知识', count: 12 },
  { name: '训练注意事项', count: 8 },
  { name: '日常姿势', count: 10 },
  { name: '营养指导', count: 6 },
];

const KnowledgeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}><Text style={styles.title}>知识库</Text></View>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>分类浏览</Text>
          <View style={styles.categories}>
            {categories.map((cat, index) => (
              <Card key={index} style={styles.categoryCard}>
                <Text style={styles.categoryName}>{cat.name}</Text>
                <Text style={styles.categoryCount}>{cat.count} 篇</Text>
              </Card>
            ))}
          </View>
          <Text style={styles.sectionTitle}>推荐文章</Text>
          <Card style={styles.articleCard}><Text style={styles.articleTitle}>什么是脊柱侧弯</Text><Text style={styles.articleMeta}>基础知识 · 1234 阅读</Text></Card>
          <Card style={styles.articleCard}><Text style={styles.articleTitle}>Cobb角是什么</Text><Text style={styles.articleMeta}>基础知识 · 856 阅读</Text></Card>
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
  sectionTitle: { fontSize: 18, fontWeight: '600', color: colors.textPrimary, marginBottom: 12 },
  categories: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 24 },
  categoryCard: { width: '48%', alignItems: 'center', marginBottom: 12, paddingVertical: 20 },
  categoryName: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  categoryCount: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
  articleCard: { marginBottom: 12 },
  articleTitle: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  articleMeta: { fontSize: 12, color: colors.textTertiary, marginTop: 8 },
});

export default KnowledgeScreen;
