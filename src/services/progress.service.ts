import api from './api';
import { StatsOverview, TrendData } from '../types';

export interface GetTrendParams {
  range: 'week' | 'month';
  startDate?: string;
  endDate?: string;
}

export const progressService = {
  async getStatsOverview(): Promise<StatsOverview> {
    const response = await api.get('/stats/overview');
    return response.data.data;
  },
  async getTrendData(params: GetTrendParams): Promise<TrendData> {
    const response = await api.get('/stats/trend', { params });
    return response.data.data;
  },
};
