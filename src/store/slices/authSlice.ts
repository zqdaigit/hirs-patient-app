import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string; refreshToken: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => { state.user = action.payload; },
    setLoading: (state, action: PayloadAction<boolean>) => { state.isLoading = action.payload; },
    setError: (state, action: PayloadAction<string | null>) => { state.error = action.payload; },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { setCredentials, setUser, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;
