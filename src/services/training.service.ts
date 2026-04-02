import api from './api';
import { TrainingProgram, Action, TrainingRecord } from '../types';

export interface GetActionsParams {
  category?: string;
  difficulty?: string;
  page?: number;
  pageSize?: number;
}

export interface CreateRecordParams {
  programId: string;
  startTime: string;
  endTime: string;
  completed: boolean;
  totalDuration: number;
  painLevel?: number;
  photos?: string[];
  notes?: string;
  actions: { actionId: string; order: number; actualDuration: number; feedback: string[]; notes?: string; }[];
}

export const trainingService = {
  async getActiveProgram(): Promise<TrainingProgram> {
    const response = await api.get('/programs/active');
    return response.data.data;
  },
  async getActions(params?: GetActionsParams) {
    const response = await api.get('/actions', { params });
    return response.data.data;
  },
  async getActionDetail(actionId: string): Promise<Action> {
    const response = await api.get(`/actions/${actionId}`);
    return response.data.data;
  },
  async createRecord(params: CreateRecordParams): Promise<TrainingRecord> {
    const response = await api.post('/records', params);
    return response.data.data;
  },
  async getRecords(params?: { page?: number; pageSize?: number }) {
    const response = await api.get('/records', { params });
    return response.data.data;
  },
};
