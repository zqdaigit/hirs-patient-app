export interface Patient {
  id: string;
  userId: string;
  name: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  birthDate: string | null;
  avatar: string | null;
  diagnosis: Diagnosis;
  therapistId: string;
  invitedCode: string;
  createdAt: string;
}
export interface Diagnosis {
  cobbAngle: { thoracic: number; lumbar: number } | null;
  risserSign: number | null;
  lenkeType: string | null;
  apexVertebra: string | null;
  notes: string;
}
export interface Therapist {
  id: string;
  name: string;
  hospital: string;
  department: string;
  avatar: string | null;
  phone: string;
  email: string | null;
}
