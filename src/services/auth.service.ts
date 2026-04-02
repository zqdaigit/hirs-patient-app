import api from './api';

export interface LoginParams { phone: string; password: string; }
export interface RegisterParams { inviteCode: string; phone: string; password: string; verifyCode: string; name?: string; }
export interface SendSmsParams { phone: string; type: 'login' | 'register' | 'resetPassword'; }
export interface ForgotPasswordParams { phone: string; verifyCode: string; newPassword: string; }

export const authService = {
  async login(params: LoginParams) {
    const response = await api.post('/auth/login', params);
    return response.data;
  },
  async register(params: RegisterParams) {
    const response = await api.post('/auth/register', params);
    return response.data;
  },
  async sendSms(params: SendSmsParams) {
    const response = await api.post('/auth/sms/send', params);
    return response.data;
  },
  async forgotPassword(params: ForgotPasswordParams) {
    const response = await api.post('/auth/forgot-password', params);
    return response.data;
  },
  async refreshToken(refreshToken: string) {
    const response = await api.post('/auth/refresh', { refreshToken });
    return response.data;
  },
};
