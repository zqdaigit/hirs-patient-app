export interface TrainingProgram {
  id: string;
  name: string;
  description: string;
  actions: ProgramAction[];
  schedule: { days: number[]; reminderTime: string };
  startDate: string;
  status: 'active' | 'paused' | 'completed';
}
export interface ProgramAction {
  id: string;
  actionId: string;
  name: string;
  category: string;
  duration: number;
  sets: number;
  restBetweenSets: number;
  order: number;
  videoUrl: string | null;
  tips: string[];
}
export interface Action {
  id: string;
  name: string;
  description: string;
  category: 'mobilization' | 'strengthening' | 'stretching' | 'balance' | '呼吸';
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number;
  defaultSets: number;
  defaultRest: number;
  targetMuscles: string[];
  tips: string[];
  videoUrl: string | null;
  imageUrl: string | null;
}
export interface TrainingRecord {
  id: string;
  patientId: string;
  programId: string;
  startTime: string;
  endTime: string;
  completed: boolean;
  totalDuration: number;
  painLevel: number | null;
  photos: string[];
  notes: string | null;
  actions: RecordAction[];
}
export interface RecordAction {
  actionId: string;
  order: number;
  actualDuration: number;
  feedback: ('completed' | 'attention' | 'adjusted' | 'pain')[];
  notes: string | null;
}
