import { BaseService } from './BaseService.js';
import { APP_CONFIG } from '../../config/app.config.js';

export class CompanyService extends BaseService {
  constructor() {
    super();
    this.endpoints = APP_CONFIG.api.endpoints;
  }

  async getCompanies(filters = {}, pagination = {}) {
    const params = {
      ...filters,
      page: pagination.page || 1,
      limit: pagination.limit || APP_CONFIG.ui.pagination.defaultPageSize,
    };
    return this.get(this.endpoints.companies, params);
  }

  async getCompanyById(id) {
    return this.get(`${this.endpoints.companies}/${id}`);
  }

  async getFeaturedCompanies(limit = 5) {
    return this.get(this.endpoints.companies, { featured: true, limit });
  }

  async searchCompanies(query, filters = {}) {
    return this.get(`${this.endpoints.companies}/search`, { q: query, ...filters });
  }

  async createCompany(companyData) {
    return this.post(this.endpoints.companies, companyData);
  }

  async updateCompany(id, companyData) {
    return this.put(`${this.endpoints.companies}/${id}`, companyData);
  }
}

export const companyService = new CompanyService();