import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrainingProgram, TrainingRecord, Action } from '../../types';

interface TrainingState {
  currentProgram: TrainingProgram | null;
  actionLibrary: Action[];
  records: TrainingRecord[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TrainingState = {
  currentProgram: null,
  actionLibrary: [],
  records: [],
  isLoading: false,
  error: null,
};

const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers: {
    setCurrentProgram: (state, action: PayloadAction<TrainingProgram | null>) => { state.currentProgram = action.payload; },
    setActionLibrary: (state, action: PayloadAction<Action[]>) => { state.actionLibrary = action.payload; },
    setRecords: (state, action: PayloadAction<TrainingRecord[]>) => { state.records = action.payload; },
    addRecord: (state, action: PayloadAction<TrainingRecord>) => { state.records.unshift(action.payload); },
    setTrainingLoading: (state, action: PayloadAction<boolean>) => { state.isLoading = action.payload; },
    setTrainingError: (state, action: PayloadAction<string | null>) => { state.error = action.payload; },
  },
});

export const { setCurrentProgram, setActionLibrary, setRecords, addRecord, setTrainingLoading, setTrainingError } = trainingSlice.actions;
export default trainingSlice.reducer;
