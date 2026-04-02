import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Input } from '../../components/common';
import { colors } from '../../theme/colors';

const LoginScreen: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = false;

  const handleLogin = async () => {
    if (!phone || !password) return;
    console.log('Login:', phone, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>HIRS</Text>
            <Text style={styles.subtitle}>脊柱侧弯康复专家</Text>
          </View>
          <View style={styles.form}>
            <Input label="手机号" value={phone} onChangeText={setPhone} placeholder="请输入手机号" keyboardType="phone-pad" maxLength={11} />
            <Input label="密码" value={password} onChangeText={setPassword} placeholder="请输入密码" secureTextEntry />
            <Button title="登录" onPress={handleLogin} loading={isLoading} style={styles.loginButton} />
            <View style={styles.linkContainer}>
              <TouchableOpacity><Text style={styles.link}>忘记密码？</Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.link}>注册账号</Text></TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  logoContainer: { alignItems: 'center', marginBottom: 48 },
  logo: { fontSize: 40, fontWeight: 'bold', color: colors.primary },
  subtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 8 },
  form: { width: '100%' },
  loginButton: { marginTop: 24 },
  linkContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 },
  link: { color: colors.primary, fontSize: 14 },
});

export default LoginScreen;
