import { APP_CONFIG } from '../../config/app.config.js';

export class BaseService {
  constructor() {
    this.baseUrl = APP_CONFIG.api.baseUrl;
    this.timeout = APP_CONFIG.api.timeout;
    this.retryAttempts = APP_CONFIG.api.retryAttempts;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        data,
        success: true,
        message: 'Request successful',
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        message: error.message,
        timestamp: new Date(),
        error,
      };
    }
  }

  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, { method: 'GET' });
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}