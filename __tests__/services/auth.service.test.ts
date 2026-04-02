import { authService } from '../../src/services/auth.service';

// Mock axios
jest.mock('../../src/services/api', () => ({
  default: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

import api from '../../src/services/api';

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should call login API with correct params', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            token: 'mock-token',
            refreshToken: 'mock-refresh-token',
            user: { id: '1', phone: '13800138000', name: 'Test', role: 'patient' },
          },
        },
      };
      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authService.login({
        phone: '13800138000',
        password: 'password123',
      });

      expect(api.post).toHaveBeenCalledWith('/auth/login', {
        phone: '13800138000',
        password: 'password123',
      });
      expect(result.data.success).toBe(true);
    });

    it('should handle login error', async () => {
      (api.post as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));

      await expect(
        authService.login({ phone: '13800138000', password: 'wrong' })
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('register', () => {
    it('should call register API with correct params', async () => {
      const mockResponse = { data: { success: true } };
      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      await authService.register({
        inviteCode: 'ABC123',
        phone: '13800138000',
        password: 'password123',
        verifyCode: '123456',
        name: 'Test User',
      });

      expect(api.post).toHaveBeenCalledWith('/auth/register', expect.objectContaining({
        inviteCode: 'ABC123',
        phone: '13800138000',
      }));
    });
  });

  describe('sendSms', () => {
    it('should call SMS API', async () => {
      const mockResponse = { data: { success: true, data: { expireIn: 60 } } };
      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authService.sendSms({
        phone: '13800138000',
        type: 'register',
      });

      expect(api.post).toHaveBeenCalledWith('/auth/sms/send', {
        phone: '13800138000',
        type: 'register',
      });
      expect(result.data.data.expireIn).toBe(60);
    });
  });

  describe('forgotPassword', () => {
    it('should call forgot password API', async () => {
      const mockResponse = { data: { success: true } };
      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      await authService.forgotPassword({
        phone: '13800138000',
        verifyCode: '123456',
        newPassword: 'newpass123',
      });

      expect(api.post).toHaveBeenCalledWith('/auth/forgot-password', {
        phone: '13800138000',
        verifyCode: '123456',
        newPassword: 'newpass123',
      });
    });
  });
});
