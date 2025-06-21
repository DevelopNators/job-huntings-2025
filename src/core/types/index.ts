// Core type definitions for the application
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Job extends BaseEntity {
  title: string;
  company: string;
  location: string;
  type: JobType;
  salary: SalaryRange;
  description: string;
  requirements: string[];
  benefits: string[];
  tags: string[];
  categoryId: string;
  featured: boolean;
  status: JobStatus;
  postedDate: Date;
  expiryDate?: Date;
  companyId: string;
  applicationCount: number;
  viewCount: number;
}

export interface Company extends BaseEntity {
  name: string;
  description: string;
  location: string;
  industry: string;
  size: CompanySize;
  logo?: string;
  coverImage?: string;
  website?: string;
  jobCount: number;
  rating?: number;
  benefits: string[];
}

export interface User extends BaseEntity {
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  profile: UserProfile;
  preferences: UserPreferences;
  socialConnections: SocialConnections;
}

export interface UserProfile {
  title?: string;
  bio?: string;
  skills: string[];
  experience: ExperienceLevel;
  education: Education[];
  resume?: string;
  portfolio?: string;
}

export interface UserPreferences {
  jobTypes: JobType[];
  locations: string[];
  salaryRange: SalaryRange;
  categories: string[];
  remoteWork: boolean;
  notifications: NotificationPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  jobAlerts: boolean;
  applicationUpdates: boolean;
  companyNews: boolean;
}

export interface SocialConnections {
  whatsapp: boolean;
  telegram: boolean;
  instagram: boolean;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

export interface JobAlert extends BaseEntity {
  userId: string;
  title: string;
  keywords: string[];
  location?: string;
  jobType?: JobType;
  salaryRange?: SalaryRange;
  frequency: AlertFrequency;
  active: boolean;
  lastSent?: Date;
}

export interface Application extends BaseEntity {
  jobId: string;
  userId: string;
  status: ApplicationStatus;
  coverLetter?: string;
  resume?: string;
  appliedDate: Date;
  notes?: string;
}

// Enums and Union Types
export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance';
export type JobStatus = 'active' | 'closed' | 'draft' | 'expired';
export type CompanySize = '1-10' | '11-50' | '51-200' | '201-1000' | '1000+';
export type UserRole = 'job_seeker' | 'employer' | 'admin';
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'executive';
export type AlertFrequency = 'daily' | 'weekly' | 'monthly';
export type ApplicationStatus = 'pending' | 'reviewed' | 'interview' | 'rejected' | 'accepted';

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: Date;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Filter and Search Types
export interface JobFilters {
  search?: string;
  location?: string;
  jobType?: JobType;
  salaryRange?: SalaryRange;
  categories?: string[];
  companyId?: string;
  featured?: boolean;
  remote?: boolean;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

// Event Types
export interface AppEvent {
  type: string;
  payload: any;
  timestamp: Date;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}