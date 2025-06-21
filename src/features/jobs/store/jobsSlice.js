import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jobService } from '../../../core/services/JobService.js';
import { mockJobs } from '../../../data/mockJobs.js';

// Async thunks
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async ({ filters = {}, pagination = {} }, { rejectWithValue }) => {
    try {
      // For demo purposes, use mock data
      // In production, this would call jobService.getJobs(filters, pagination)
      return {
        data: mockJobs,
        pagination: {
          page: pagination.page || 1,
          limit: pagination.limit || 12,
          total: mockJobs.length,
          totalPages: Math.ceil(mockJobs.length / (pagination.limit || 12)),
        },
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchJobById = createAsyncThunk(
  'jobs/fetchJobById',
  async (jobId, { rejectWithValue }) => {
    try {
      // For demo purposes, use mock data
      const job = mockJobs.find(job => job.id === jobId);
      if (!job) {
        throw new Error('Job not found');
      }
      return job;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFeaturedJobs = createAsyncThunk(
  'jobs/fetchFeaturedJobs',
  async (limit = 6, { rejectWithValue }) => {
    try {
      // For demo purposes, use mock data
      return mockJobs.filter(job => job.featured).slice(0, limit);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  jobs: [],
  featuredJobs: [],
  currentJob: null,
  savedJobs: JSON.parse(localStorage.getItem('savedJobs') || '[]'),
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  },
  filters: {
    search: '',
    location: '',
    jobType: '',
    salaryRange: null,
    categories: [],
  },
  loading: {
    jobs: false,
    featuredJobs: false,
    currentJob: false,
  },
  error: null,
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    
    toggleSaveJob: (state, action) => {
      const jobId = action.payload;
      const index = state.savedJobs.indexOf(jobId);
      
      if (index === -1) {
        state.savedJobs.push(jobId);
      } else {
        state.savedJobs.splice(index, 1);
      }
      
      // Persist to localStorage
      localStorage.setItem('savedJobs', JSON.stringify(state.savedJobs));
    },
    
    clearSavedJobs: (state) => {
      state.savedJobs = [];
      localStorage.removeItem('savedJobs');
    },
    
    setCurrentJob: (state, action) => {
      state.currentJob = action.payload;
    },
    
    clearCurrentJob: (state) => {
      state.currentJob = null;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    clearError: (state) => {
      state.error = null;
    },
  },
  
  extraReducers: (builder) => {
    builder
      // Fetch jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading.jobs = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading.jobs = false;
        state.jobs = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading.jobs = false;
        state.error = action.payload;
      })
      
      // Fetch job by ID
      .addCase(fetchJobById.pending, (state) => {
        state.loading.currentJob = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading.currentJob = false;
        state.currentJob = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading.currentJob = false;
        state.error = action.payload;
      })
      
      // Fetch featured jobs
      .addCase(fetchFeaturedJobs.pending, (state) => {
        state.loading.featuredJobs = true;
        state.error = null;
      })
      .addCase(fetchFeaturedJobs.fulfilled, (state, action) => {
        state.loading.featuredJobs = false;
        state.featuredJobs = action.payload;
      })
      .addCase(fetchFeaturedJobs.rejected, (state, action) => {
        state.loading.featuredJobs = false;
        state.error = action.payload;
      });
  },
});

export const {
  setJobs,
  setFilters,
  resetFilters,
  toggleSaveJob,
  clearSavedJobs,
  setCurrentJob,
  clearCurrentJob,
  setError,
  clearError,
} = jobsSlice.actions;

export default jobsSlice.reducer;