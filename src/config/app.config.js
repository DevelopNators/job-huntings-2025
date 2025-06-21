// Application configuration with environment-based settings
export const APP_CONFIG = {
  // Application metadata
  app: {
    name: process.env.VITE_APP_NAME || 'JobHuntings',
    description: process.env.VITE_APP_DESCRIPTION || 'Find Your Dream Job Today',
    version: process.env.VITE_APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  },

  // API configuration
  api: {
    baseUrl: process.env.VITE_API_BASE_URL || 'https://api.jobhuntings.com',
    timeout: parseInt(process.env.VITE_API_TIMEOUT) || 10000,
    retryAttempts: parseInt(process.env.VITE_API_RETRY_ATTEMPTS) || 3,
    endpoints: {
      jobs: '/jobs',
      companies: '/companies',
      users: '/users',
      auth: '/auth',
      notifications: '/notifications',
    },
  },

  // UI configuration
  ui: {
    theme: {
      primary: process.env.VITE_THEME_PRIMARY || 'teal',
      secondary: process.env.VITE_THEME_SECONDARY || 'gray',
    },
    pagination: {
      defaultPageSize: parseInt(process.env.VITE_DEFAULT_PAGE_SIZE) || 12,
      pageSizeOptions: [6, 12, 24, 48],
    },
    animations: {
      enabled: process.env.VITE_ANIMATIONS_ENABLED !== 'false',
      duration: parseInt(process.env.VITE_ANIMATION_DURATION) || 300,
    },
  },

  // Feature flags
  features: {
    authentication: process.env.VITE_FEATURE_AUTH !== 'false',
    notifications: process.env.VITE_FEATURE_NOTIFICATIONS !== 'false',
    socialLogin: process.env.VITE_FEATURE_SOCIAL_LOGIN === 'true',
    darkMode: process.env.VITE_FEATURE_DARK_MODE === 'true',
    analytics: process.env.VITE_FEATURE_ANALYTICS === 'true',
    pwa: process.env.VITE_FEATURE_PWA !== 'false',
  },

  // External services
  services: {
    firebase: {
      enabled: process.env.VITE_FIREBASE_ENABLED === 'true',
      config: {
        apiKey: process.env.VITE_FIREBASE_API_KEY,
        authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.VITE_FIREBASE_APP_ID,
      },
    },
    analytics: {
      enabled: process.env.VITE_ANALYTICS_ENABLED === 'true',
      trackingId: process.env.VITE_ANALYTICS_TRACKING_ID,
    },
  },

  // Business logic configuration
  business: {
    jobCategories: [
      { id: 'tech', name: 'Technology', icon: 'Code' },
      { id: 'business', name: 'Business', icon: 'Briefcase' },
      { id: 'data', name: 'Data Science', icon: 'ChartBar' },
      { id: 'design', name: 'Design', icon: 'Palette' },
      { id: 'hr', name: 'Human Resources', icon: 'Users' },
      { id: 'remote', name: 'Remote Jobs', icon: 'Globe' },
      { id: 'marketing', name: 'Marketing', icon: 'ShoppingBag' },
      { id: 'education', name: 'Education', icon: 'Book' },
    ],
    jobTypes: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'],
    salaryRanges: [
      { id: 'under-50k', label: 'Under $50k', min: 0, max: 50000 },
      { id: '50k-70k', label: '$50k - $70k', min: 50000, max: 70000 },
      { id: '70k-100k', label: '$70k - $100k', min: 70000, max: 100000 },
      { id: '100k-130k', label: '$100k - $130k', min: 100000, max: 130000 },
      { id: '130k-plus', label: '$130k+', min: 130000, max: Infinity },
    ],
  },
};

export default APP_CONFIG;