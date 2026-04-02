import { User, AuthState } from '../../src/types/user';
import { Patient, Therapist, Diagnosis } from '../../src/types/patient';
import { TrainingProgram, Action, TrainingRecord } from '../../src/types/training';
import { StatsOverview, TrendData } from '../../src/types/progress';
import { Article } from '../../src/types/article';

describe('Type Definitions', () => {
  describe('User types', () => {
    it('should validate User interface', () => {
      const user: User = {
        id: '1',
        phone: '13800138000',
        name: '张三',
        role: 'patient',
        avatar: null,
      };
      expect(user.role).toBe('patient');
    });

    it('should validate AuthState interface', () => {
      const authState: AuthState = {
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
      expect(authState.isAuthenticated).toBe(false);
    });
  });

  describe('Patient types', () => {
    it('should validate Patient interface', () => {
      const patient: Patient = {
        id: 'p1',
        userId: 'u1',
        name: '张三',
        phone: '13800138000',
        gender: 'male',
        birthDate: '2010-01-01',
        avatar: null,
        diagnosis: {
          cobbAngle: { thoracic: 25, lumbar: 18 },
          risserSign: 2,
          lenkeType: '3',
          apexVertebra: 'T8',
          notes: '',
        },
        therapistId: 't1',
        invitedCode: 'ABC123',
        createdAt: '2026-04-01',
      };
      expect(patient.diagnosis.cobbAngle?.thoracic).toBe(25);
    });

    it('should validate Therapist interface', () => {
      const therapist: Therapist = {
        id: 't1',
        name: '李医生',
        hospital: '某医院',
        department: '康复科',
        avatar: null,
        phone: '13900139000',
        email: 'doctor@example.com',
      };
      expect(therapist.department).toBe('康复科');
    });
  });

  describe('Training types', () => {
    it('should validate TrainingProgram interface', () => {
      const program: TrainingProgram = {
        id: 'prog-1',
        name: '基础训练',
        description: '每日训练',
        actions: [],
        schedule: { days: [1, 3, 5], reminderTime: '20:00' },
        startDate: '2026-04-01',
        status: 'active',
      };
      expect(program.status).toBe('active');
    });

    it('should validate Action interface', () => {
      const action: Action = {
        id: 'a1',
        name: '猫式伸展',
        description: '脊柱活动度训练',
        category: 'mobilization',
        difficulty: 'easy',
        duration: 30,
        defaultSets: 3,
        defaultRest: 15,
        targetMuscles: ['脊柱'],
        tips: ['保持呼吸'],
        videoUrl: null,
        imageUrl: null,
      };
      expect(action.category).toBe('mobilization');
    });
  });

  describe('Progress types', () => {
    it('should validate StatsOverview interface', () => {
      const stats: StatsOverview = {
        totalTrainingCount: 128,
        consecutiveDays: 15,
        monthCompletionRate: 85,
        monthTrainingDuration: 750,
        weekTrainingCount: 3,
        weekCompletionRate: 75,
      };
      expect(stats.monthCompletionRate).toBe(85);
    });

    it('should validate TrendData interface', () => {
      const trend: TrendData = {
        labels: ['周一', '周二', '周三'],
        trainingCounts: [1, 1, 1],
        completionRates: [100, 100, 100],
      };
      expect(trend.labels.length).toBe(3);
    });
  });
});
