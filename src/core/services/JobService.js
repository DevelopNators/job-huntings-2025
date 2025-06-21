import { BaseService } from './BaseService.js';
import { APP_CONFIG } from '../../config/app.config.js';

export class JobService extends BaseService {
  constructor() {
    super();
    this.endpoints = APP_CONFIG.api.endpoints;
  }

  async getJobs(filters = {}, pagination = {}) {
    const params = {
      ...filters,
      page: pagination.page || 1,
      limit: pagination.limit || APP_CONFIG.ui.pagination.defaultPageSize,
    };
    return this.get(this.endpoints.jobs, params);
  }

  async getJobById(id) {
    return this.get(`${this.endpoints.jobs}/${id}`);
  }

  async getFeaturedJobs(limit = 6) {
    return this.get(this.endpoints.jobs, { featured: true, limit });
  }

  async searchJobs(query, filters = {}) {
    return this.get(`${this.endpoints.jobs}/search`, { q: query, ...filters });
  }

  async getJobsByCategory(categoryId, pagination = {}) {
    return this.getJobs({ categoryId }, pagination);
  }

  async getJobsByCompany(companyId, pagination = {}) {
    return this.getJobs({ companyId }, pagination);
  }

  async createJob(jobData) {
    return this.post(this.endpoints.jobs, jobData);
  }

  async updateJob(id, jobData) {
    return this.put(`${this.endpoints.jobs}/${id}`, jobData);
  }

  async deleteJob(id) {
    return this.delete(`${this.endpoints.jobs}/${id}`);
  }
}

export const jobService = new JobService();