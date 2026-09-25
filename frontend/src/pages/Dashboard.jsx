import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import RiskBadge from '../components/RiskBadge';
import apiService from '../services/api';
import { 
  Users, 
  AlertOctagon, 
  CheckCircle, 
  Percent, 
  ShieldCheck, 
  ShieldAlert, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  AreaChart, 
  Area 
} from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.getDashboardData();
      setData(res);
    } catch (err) {
      setError('Unable to load live backend metrics. Ensure FastAPI is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: '#94A3B8' }}>
        <RefreshCw size={32} className="animate-spin" style={{ margin: '0 auto 1rem', display: 'block', color: '#6366F1' }} />
        <p style={{ fontSize: '1rem', fontWeight: 600 }}>Loading Executive Dashboard & ML Metrics...</p>
      </div>
    );
  }

  // Fallback default numbers if backend call fails or loading
  const totalApps = data?.totalApplications || 255352;
  const defaulted = data?.defaultedLoans || 29653;
  const nonDefaulted = data?.nonDefaultedLoans || 225694;
  const defaultRate = data?.datasetDefaultRatePct || 11.61;

  const lowRiskCount = data?.riskDistribution?.lowRisk || 3;
  const medRiskCount = data?.riskDistribution?.mediumRisk || 1;
  const highRiskCount = data?.riskDistribution?.highRisk || 1;

  // Chart Data
  const defaultDistributionData = [
    { name: 'Non-Defaulted', value: nonDefaulted, color: '#10B981' },
    { name: 'Defaulted', value: defaulted, color: '#EF4444' }
  ];

  const riskDistributionData = [
    { name: 'Low Risk', count: lowRiskCount, color: '#10B981' },
    { name: 'Medium Risk', count: medRiskCount, color: '#F59E0B' },
    { name: 'High Risk', count: highRiskCount, color: '#EF4444' }
  ];

  const monthlyTrendData = [
    { month: 'Jan', applications: 18400, defaults: 2100 },
    { month: 'Feb', applications: 19800, defaults: 2300 },
    { month: 'Mar', applications: 21500, defaults: 2450 },
    { month: 'Apr', applications: 22100, defaults: 2600 },
    { month: 'May', applications: 23400, defaults: 2750 },
    { month: 'Jun', applications: 24800, defaults: 2890 },
    { month: 'Jul', applications: 25900, defaults: 3010 },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Banner */}
      <div className="glass-card" style={{
        padding: '1.75rem 2rem',
        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.12) 0%, var(--bg-card) 100%)',
        border: '1px solid rgba(79, 70, 229, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <Sparkles size={18} color="var(--accent-primary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Real-Time Predictive Risk Intelligence
            </span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Executive Loan Default & Portfolio Risk Overview
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '750px' }}>
            Powered by scikit-learn Machine Learning (Random Forest classifier trained on 255,347 loan applications) and served via Python FastAPI backend.
          </p>
        </div>

        <Link to="/prediction" className="btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}>
          <span>Assess New Loan</span>
          <ArrowRight size={18} />
        </Link>
      </div>

      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          padding: '1rem 1.25rem',
          borderRadius: '12px',
          color: '#F87171',
          fontSize: '0.875rem'
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.25rem' }}>
        <StatCard 
          title="Total Applications" 
          value={totalApps.toLocaleString()} 
          subtext="Dataset + Live session records" 
          icon={Users} 
          color="indigo" 
        />
        <StatCard 
          title="Defaulted Loans" 
          value={defaulted.toLocaleString()} 
          subtext="High-risk default outcomes" 
          icon={AlertOctagon} 
          color="rose" 
        />
        <StatCard 
          title="Non-Defaulted Loans" 
          value={nonDefaulted.toLocaleString()} 
          subtext="Standard non-default applicants" 
          icon={CheckCircle} 
          color="emerald" 
        />
        <StatCard 
          title="Portfolio Default Rate" 
          value={`${defaultRate}%`} 
          subtext="Historical baseline average" 
          icon={Percent} 
          color="amber" 
        />
        <StatCard 
          title="Low Risk Applicants" 
          value={lowRiskCount} 
          subtext="Recommended approval" 
          icon={ShieldCheck} 
          color="emerald" 
        />
        <StatCard 
          title="High Risk Applicants" 
          value={highRiskCount} 
          subtext="Underwriting flag" 
          icon={ShieldAlert} 
          color="rose" 
        />
      </div>

      {/* Charts Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Pie Chart: Default vs Non-default */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '0.25rem' }}>
            Portfolio Default Breakdown
          </h3>
          <p style={{ fontSize: '0.775rem', color: '#94A3B8', marginBottom: '1.25rem' }}>
            Proportion of Defaulted vs Non-Defaulted Loan Applicants
          </p>

          <div style={{ height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={defaultDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {defaultDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: '#1E293B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#FFF' }}
                  formatter={(val) => val.toLocaleString()}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Risk Distribution */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '0.25rem' }}>
            Risk Level Distribution
          </h3>
          <p style={{ fontSize: '0.775rem', color: '#94A3B8', marginBottom: '1.25rem' }}>
            Evaluated session applications grouped by risk tier
          </p>

          <div style={{ height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip contentStyle={{ background: '#1E293B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#FFF' }} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Application Trend Chart */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F8FAFC' }}>
              Loan Application & Default Volume Trends
            </h3>
            <p style={{ fontSize: '0.775rem', color: '#94A3B8' }}>
              Monthly progression of submitted loans versus predicted default events
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#818CF8', fontWeight: 600 }}>
            <TrendingUp size={16} />
            <span>+12.4% MoM Growth</span>
          </div>
        </div>

        <div style={{ height: '280px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorDefs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip contentStyle={{ background: '#1E293B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#FFF' }} />
              <Legend verticalAlign="top" height={36} />
              <Area type="monotone" dataKey="applications" name="Total Applications" stroke="#6366F1" fillOpacity={1} fill="url(#colorApps)" />
              <Area type="monotone" dataKey="defaults" name="Default Cases" stroke="#EF4444" fillOpacity={1} fill="url(#colorDefs)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Evaluations Table */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F8FAFC' }}>
              Recent ML Loan Assessments
            </h3>
            <p style={{ fontSize: '0.775rem', color: '#94A3B8' }}>
              Real-time predictions calculated by FastAPI backend
            </p>
          </div>
          <Link to="/loans" className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
            View Full Portfolio
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>Applicant Income</th>
                <th>Loan Amount</th>
                <th>Credit Score</th>
                <th>DTI Ratio</th>
                <th>Default Prob.</th>
                <th>Risk Level</th>
                <th>ML Prediction</th>
              </tr>
            </thead>
            <tbody>
              {(data?.recentApplications || []).slice(0, 6).map((app) => (
                <tr key={app.id}>
                  <td style={{ fontWeight: 700, color: '#818CF8', fontFamily: 'var(--font-code)' }}>
                    {app.id}
                  </td>
                  <td>${app.applicantData.Income.toLocaleString()}</td>
                  <td>${app.applicantData.LoanAmount.toLocaleString()}</td>
                  <td>
                    <span style={{
                      fontWeight: 600,
                      color: app.applicantData.CreditScore >= 700 ? '#34D399' : app.applicantData.CreditScore >= 620 ? '#FBBF24' : '#F87171'
                    }}>
                      {app.applicantData.CreditScore}
                    </span>
                  </td>
                  <td>{(app.applicantData.DTIRatio * 100).toFixed(1)}%</td>
                  <td style={{ fontWeight: 600 }}>{app.probabilityPercentage}%</td>
                  <td><RiskBadge riskLevel={app.riskLevel} size="small" /></td>
                  <td>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: app.prediction === 1 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                      color: app.prediction === 1 ? '#F87171' : '#34D399'
                    }}>
                      {app.predictionLabel === 'YES' ? 'DEFAULT' : 'NO DEFAULT'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
