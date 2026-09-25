import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const apiService = {
  // GET /api/health
  async getHealth() {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },

  // POST /api/prediction
  async predictLoan(applicantData) {
    try {
      const response = await apiClient.post('/prediction', applicantData);
      return response.data;
    } catch (error) {
      console.error('Loan prediction request failed:', error);
      throw error;
    }
  },

  // GET /api/dashboard
  async getDashboardData() {
    try {
      const response = await apiClient.get('/dashboard');
      return response.data;
    } catch (error) {
      console.error('Failed to load dashboard metrics:', error);
      throw error;
    }
  },

  // GET /api/loans
  async getLoans(search = '', riskLevel = '') {
    try {
      const params = {};
      if (search) params.search = search;
      if (riskLevel) params.risk_level = riskLevel;
      
      const response = await apiClient.get('/loans', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch loans:', error);
      throw error;
    }
  },

  // GET /api/loans/:id
  async getLoanDetails(loanId) {
    try {
      const response = await apiClient.get(`/loans/${loanId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch loan ${loanId}:`, error);
      throw error;
    }
  }
};

export default apiService;
