import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../src/store/slices/authSlice';
import trainingReducer from '../../src/store/slices/trainingSlice';

describe('Redux Store', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        training: trainingReducer,
      },
    });
  });

  it('should have initial auth state', () => {
    const state = store.getState();
    expect(state.auth.isAuthenticated).toBe(false);
    expect(state.auth.user).toBeNull();
    expect(state.auth.token).toBeNull();
  });

  it('should have initial training state', () => {
    const state = store.getState();
    expect(state.training.currentProgram).toBeNull();
    expect(state.training.actionLibrary).toEqual([]);
    expect(state.training.records).toEqual([]);
  });

  it('should update auth state on login', () => {
    store.dispatch({
      type: 'auth/setCredentials',
      payload: {
        user: { id: '1', phone: '13800138000', name: 'Test', role: 'patient', avatar: null },
        token: 'mock-token',
        refreshToken: 'mock-refresh',
      },
    });

    const state = store.getState();
    expect(state.auth.isAuthenticated).toBe(true);
    expect(state.auth.user?.name).toBe('Test');
  });

  it('should clear auth state on logout', () => {
    // First login
    store.dispatch({
      type: 'auth/setCredentials',
      payload: {
        user: { id: '1', phone: '13800138000', name: 'Test', role: 'patient', avatar: null },
        token: 'mock-token',
        refreshToken: 'mock-refresh',
      },
    });

    // Then logout
    store.dispatch({ type: 'auth/logout' });

    const state = store.getState();
    expect(state.auth.isAuthenticated).toBe(false);
    expect(state.auth.token).toBeNull();
  });

  it('should update training state', () => {
    const mockProgram = {
      id: 'prog-1',
      name: '测试计划',
      description: '',
      actions: [],
      schedule: { days: [1], reminderTime: '10:00' },
      startDate: '2026-04-02',
      status: 'active' as const,
    };

    store.dispatch({
      type: 'training/setCurrentProgram',
      payload: mockProgram,
    });

    const state = store.getState();
    expect(state.training.currentProgram?.name).toBe('测试计划');
  });
});
