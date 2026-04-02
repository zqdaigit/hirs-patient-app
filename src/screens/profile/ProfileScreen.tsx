import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { Card } from '../../components/common';

const menuItems = [
  { icon: '👤', title: '个人资料' },
  { icon: '📋', title: '诊断信息' },
  { icon: '👨‍⚕️', title: '我的康复师' },
  { icon: '📅', title: '复诊信息' },
  { icon: '🔔', title: '通知设置' },
  { icon: '❓', title: '帮助中心' },
  { icon: 'ℹ️', title: '关于我们' },
];

const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.avatar}><Text style={styles.avatarText}>张</Text></View>
          <Text style={styles.userName}>张小明</Text>
          <Text style={styles.userId}>患者ID: XXXXX</Text>
        </View>
        <View style={styles.content}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.logoutButton}><Text style={styles.logoutText}>退出登录</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: 24, backgroundColor: colors.primary, alignItems: 'center' },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 32, color: colors.primary, fontWeight: 'bold' },
  userName: { fontSize: 20, fontWeight: 'bold', color: colors.white, marginTop: 12 },
  userId: { fontSize: 12, color: colors.white, opacity: 0.8, marginTop: 4 },
  content: { padding: 16 },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, padding: 16, borderRadius: 12, marginBottom: 8 },
  menuIcon: { fontSize: 20, marginRight: 12 },
  menuTitle: { flex: 1, fontSize: 16, color: colors.textPrimary },
  menuArrow: { fontSize: 20, color: colors.textTertiary },
  logoutButton: { backgroundColor: colors.surface, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  logoutText: { fontSize: 16, color: colors.error },
});

export default ProfileScreen;
