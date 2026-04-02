export interface User {
  id: string;
  phone: string;
  name: string;
  role: 'patient';
  avatar: string | null;
}
export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
