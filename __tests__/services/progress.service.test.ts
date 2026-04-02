import { progressService } from '../../src/services/progress.service';

jest.mock('../../src/services/api', () => ({
  default: {
    get: jest.fn(),
  },
}));

import api from '../../src/services/api';

describe('Progress Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getStatsOverview', () => {
    it('should fetch stats overview', async () => {
      const mockStats = {
        totalTrainingCount: 128,
        consecutiveDays: 15,
        monthCompletionRate: 85,
      };
      (api.get as jest.Mock).mockResolvedValue({ data: { data: mockStats } });

      const result = await progressService.getStatsOverview();

      expect(api.get).toHaveBeenCalledWith('/stats/overview');
      expect(result.totalTrainingCount).toBe(128);
    });
  });

  describe('getTrendData', () => {
    it('should fetch weekly trend data', async () => {
      const mockTrend = {
        labels: ['周一', '周二', '周三'],
        trainingCounts: [1, 1, 1],
        completionRates: [100, 100, 100],
      };
      (api.get as jest.Mock).mockResolvedValue({ data: { data: mockTrend } });

      const result = await progressService.getTrendData({ range: 'week' });

      expect(api.get).toHaveBeenCalledWith('/stats/trend', {
        params: { range: 'week' },
      });
      expect(result.labels.length).toBe(3);
    });

    it('should fetch monthly trend data', async () => {
      const mockTrend = { labels: [], trainingCounts: [], completionRates: [] };
      (api.get as jest.Mock).mockResolvedValue({ data: { data: mockTrend } });

      await progressService.getTrendData({ range: 'month' });

      expect(api.get).toHaveBeenCalledWith('/stats/trend', {
        params: { range: 'month' },
      });
    });
  });
});
