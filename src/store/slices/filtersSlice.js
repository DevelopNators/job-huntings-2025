import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  location: '',
  jobType: '',
  salaryRange: '',
  categories: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setJobType: (state, action) => {
      state.jobType = action.payload;
    },
    setSalaryRange: (state, action) => {
      state.salaryRange = action.payload;
    },
    toggleCategory: (state, action) => {
      const category = action.payload;
      const index = state.categories.indexOf(category);
      if (index === -1) {
        state.categories.push(category);
      } else {
        state.categories.splice(index, 1);
      }
    },
    resetFilters: (state) => {
      return initialState;
    },
  },
});

export const {
  setSearchTerm,
  setLocation,
  setJobType,
  setSalaryRange,
  toggleCategory,
  resetFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;