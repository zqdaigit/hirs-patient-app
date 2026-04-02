import { trainingService } from '../../src/services/training.service';

jest.mock('../../src/services/api', () => ({
  default: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

import api from '../../src/services/api';

describe('Training Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getActiveProgram', () => {
    it('should fetch active training program', async () => {
      const mockProgram = {
        id: 'prog-1',
        name: '基础训练方案',
        description: '每日训练',
        actions: [],
        schedule: { days: [1, 3, 5], reminderTime: '20:00' },
        startDate: '2026-04-01',
        status: 'active',
      };
      (api.get as jest.Mock).mockResolvedValue({ data: { data: mockProgram } });

      const result = await trainingService.getActiveProgram();

      expect(api.get).toHaveBeenCalledWith('/programs/active');
      expect(result.name).toBe('基础训练方案');
    });
  });

  describe('getActions', () => {
    it('should fetch actions with filters', async () => {
      const mockActions = {
        list: [{ id: '1', name: '猫式伸展' }],
        total: 1,
        page: 1,
      };
      (api.get as jest.Mock).mockResolvedValue({ data: { data: mockActions } });

      const result = await trainingService.getActions({
        category: 'mobilization',
        page: 1,
      });

      expect(api.get).toHaveBeenCalledWith('/actions', {
        params: { category: 'mobilization', page: 1 },
      });
      expect(result.list.length).toBe(1);
    });
  });

  describe('createRecord', () => {
    it('should create training record', async () => {
      const mockRecord = { id: 'rec-1', completed: true };
      (api.post as jest.Mock).mockResolvedValue({ data: { data: mockRecord } });

      const params = {
        programId: 'prog-1',
        startTime: '2026-04-02T10:00:00Z',
        endTime: '2026-04-02T10:30:00Z',
        completed: true,
        totalDuration: 1800,
        actions: [],
      };

      const result = await trainingService.createRecord(params);

      expect(api.post).toHaveBeenCalledWith('/records', params);
      expect(result.completed).toBe(true);
    });
  });

  describe('getRecords', () => {
    it('should fetch training records', async () => {
      const mockRecords = { list: [], total: 0 };
      (api.get as jest.Mock).mockResolvedValue({ data: { data: mockRecords } });

      await trainingService.getRecords({ page: 1, pageSize: 10 });

      expect(api.get).toHaveBeenCalledWith('/records', {
        params: { page: 1, pageSize: 10 },
      });
    });
  });
});
