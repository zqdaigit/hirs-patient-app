import api from './api';
import { Patient, Therapist } from '../types';

export interface UpdatePatientParams {
  name?: string;
  gender?: 'male' | 'female' | 'other';
  birthDate?: string;
  avatar?: string;
}

export const patientService = {
  async getMe(): Promise<Patient> {
    const response = await api.get('/patients/me');
    return response.data.data;
  },
  async updateMe(params: UpdatePatientParams): Promise<Patient> {
    const response = await api.put('/patients/me', params);
    return response.data.data;
  },
  async getMyTherapist(): Promise<Therapist> {
    const response = await api.get('/patients/me/therapist');
    return response.data.data;
  },
};
