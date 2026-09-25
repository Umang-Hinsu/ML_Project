import axios from 'axios';

/**
 * Normalizes the API URL to guarantee it points to the valid '/api' prefix,
 * preventing common deployment typos (e.g. omitting /api or adding trailing slashes).
 */
export const getCleanApiBaseUrl = () => {
  const envUrl = process.env.REACT_APP_API_URL;
  if (!envUrl || !envUrl.trim()) {
    return 'http://localhost:8000/api';
  }
  let cleanUrl = envUrl.trim().replace(/\/+$/, '');
  if (!cleanUrl.endsWith('/api')) {
    cleanUrl += '/api';
  }
  return cleanUrl;
};

export const API_BASE_URL = getCleanApiBaseUrl();

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // 60 seconds timeout to accommodate free-tier cloud container cold starts (e.g. Render / Railway)
  timeout: 60000,
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
