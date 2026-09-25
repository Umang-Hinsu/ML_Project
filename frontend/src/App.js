import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Prediction from './pages/Prediction';
import Loans from './pages/Loans';
import LoanDetails from './pages/LoanDetails';
import Analytics from './pages/Analytics';
import RiskAnalysis from './pages/RiskAnalysis';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import apiService from './services/api';
import './styles/index.css';

const pageTitles = {
  '/': { title: 'Executive Overview', subtitle: 'Loan default metrics and portfolio summary' },
  '/prediction': { title: 'Loan Default Prediction', subtitle: 'Real-time scikit-learn ML inference engine' },
  '/loans': { title: 'Loan Portfolio', subtitle: 'Comprehensive loan evaluation records' },
  '/analytics': { title: 'ML Performance & Benchmarking', subtitle: 'scikit-learn model evaluation metrics' },
  '/risk-analysis': { title: 'Risk Threshold Analysis', subtitle: 'Credit risk matrix & probability distributions' },
  '/reports': { title: 'Compliance Reports', subtitle: 'Exportable loan risk audit data' },
  '/profile': { title: 'Officer Profile & System Status', subtitle: 'Underwriter credentials and API diagnostics' }
};

function MainLayout() {
  const location = useLocation();
  const [isHealthy, setIsHealthy] = useState(true);
  const [selectedModel, setSelectedModel] = useState('Random Forest');
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    const checkHealth = async () => {
      try {
        const res = await apiService.getHealth();
        setIsHealthy(res.status === 'healthy');
        if (res.selectedModel) setSelectedModel(res.selectedModel);
      } catch (e) {
        setIsHealthy(false);
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  const pageInfo = pageTitles[location.pathname] || { title: 'CrediGuard AI', subtitle: 'Loan Risk Management' };

  return (
    <div className="app-container">
      <Sidebar isHealthy={isHealthy} />
      
      <div className="main-content">
        <Header 
          title={pageInfo.title} 
          subtitle={pageInfo.subtitle} 
          isHealthy={isHealthy}
          selectedModel={selectedModel}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/prediction" element={<Prediction />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/loans/:id" element={<LoanDetails />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/risk-analysis" element={<RiskAnalysis />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
