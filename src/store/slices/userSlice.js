import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  profile: {
    id: null,
    name: null,
    email: null,
    avatar: null,
    phone: null,
    location: null,
    title: null,
    bio: null,
    website: null,
    linkedin: null,
    github: null,
    skills: [],
    experience: "mid",
    resume: null,
    portfolio: [],
  },
  preferences: {
    emailNotifications: true,
    pushNotifications: true,
    jobAlerts: true,
    companyUpdates: true,
    newsletter: true,
    profileVisibility: "public",
    jobTypes: ["Full-time"],
    salaryRange: { min: 50000, max: 150000 },
    remoteWork: false,
    preferredLocations: [],
    categories: [],
  },
  socialConnections: {
    whatsapp: false,
    telegram: false,
    instagram: false,
    linkedin: null,
    github: null,
    twitter: null,
  },
  applications: [],
  savedJobs: [],
  jobAlerts: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
      state.isAuthenticated = true;
    },

    updateUserProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },

    updateUserPreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },

    toggleSocialConnection: (state, action) => {
      const platform = action.payload;
      state.socialConnections[platform] = !state.socialConnections[platform];
    },

    updateSocialConnection: (state, action) => {
      const { platform, value } = action.payload;
      state.socialConnections[platform] = value;
    },

    addApplication: (state, action) => {
      state.applications.push(action.payload);
    },

    updateApplication: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.applications.findIndex((app) => app.id === id);
      if (index !== -1) {
        state.applications[index] = {
          ...state.applications[index],
          ...updates,
        };
      }
    },

    addJobAlert: (state, action) => {
      state.jobAlerts.push(action.payload);
    },

    updateJobAlert: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.jobAlerts.findIndex((alert) => alert.id === id);
      if (index !== -1) {
        state.jobAlerts[index] = { ...state.jobAlerts[index], ...updates };
      }
    },

    removeJobAlert: (state, action) => {
      state.jobAlerts = state.jobAlerts.filter(
        (alert) => alert.id !== action.payload
      );
    },

    uploadDocument: (state, action) => {
      const { type, document } = action.payload;
      if (type === "resume") {
        state.profile.resume = document;
      } else if (type === "portfolio") {
        state.profile.portfolio.push(document);
      }
    },

    removeDocument: (state, action) => {
      const { type, documentId } = action.payload;
      if (type === "resume") {
        state.profile.resume = null;
      } else if (type === "portfolio") {
        state.profile.portfolio = state.profile.portfolio.filter(
          (doc) => doc.id !== documentId
        );
      }
    },

    logout: (state) => {
      return initialState;
    },
  },
});

export const {
  setUser,
  updateUserProfile,
  updateUserPreferences,
  toggleSocialConnection,
  updateSocialConnection,
  addApplication,
  updateApplication,
  addJobAlert,
  updateJobAlert,
  removeJobAlert,
  uploadDocument,
  removeDocument,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
