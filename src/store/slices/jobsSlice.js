import { createSlice } from '@reduxjs/toolkit';
import { mockJobs } from '../../data/mockJobs';

const initialState = {
  jobs: mockJobs,
  featuredJobs: mockJobs.filter(job => job.featured),
  loading: false,
  error: null,
  savedJobs: [],
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    toggleSaveJob: (state, action) => {
      const jobId = action.payload;
      const index = state.savedJobs.indexOf(jobId);
      if (index === -1) {
        state.savedJobs.push(jobId);
      } else {
        state.savedJobs.splice(index, 1);
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setJobs, toggleSaveJob, setLoading, setError } = jobsSlice.actions;
export default jobsSlice.reducer;