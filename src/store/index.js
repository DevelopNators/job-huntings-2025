import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './slices/jobsSlice';
import userReducer from './slices/userSlice';
import filtersReducer from './slices/filtersSlice';

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    user: userReducer,
    filters: filtersReducer,
  },
});