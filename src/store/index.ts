import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import trainingReducer from './slices/trainingSlice';

export const store = configureStore({
  reducer: { auth: authReducer, training: trainingReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
