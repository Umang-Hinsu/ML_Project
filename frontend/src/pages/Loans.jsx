import React, { useEffect, useState, useCallback } from 'react';
import apiService from '../services/api';
import RiskBadge from '../components/RiskBadge';
import { Search, Eye, FileText, RefreshCw, X } from 'lucide-react';

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('');
  const [activeModalLoan, setActiveModalLoan] = useState(null);

  const fetchLoans = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiService.getLoans(search, selectedRisk);
      setLoans(data.loans || []);
    } catch (err) {
      console.error('Failed to load loans:', err);
    } finally {
      setLoading(false);
    }
  }, [search, selectedRisk]);

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FileText size={24} color="#818CF8" />
            Evaluated Loan Portfolio
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#94A3B8', marginTop: '0.2rem' }}>
            Search, filter, and inspect recent loan application risk assessments.
          </p>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Search Input */}
          <div style={{ position: 'relative' }}>
            <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search by ID or Purpose..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.25rem', width: '240px', fontSize: '0.85rem' }}
            />
          </div>

          {/* Risk Level Filter Pill Group */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(15, 23, 42, 0.8)', padding: '0.25rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            {[
              { label: 'All', value: '' },
              { label: 'Low Risk', value: 'Low Risk' },
              { label: 'Medium Risk', value: 'Medium Risk' },
              { label: 'High Risk', value: 'High Risk' }
            ].map((btn) => (
              <button
                key={btn.label}
                onClick={() => setSelectedRisk(btn.value)}
                style={{
                  background: selectedRisk === btn.value ? '#6366F1' : 'transparent',
                  color: selectedRisk === btn.value ? '#FFFFFF' : '#94A3B8',
                  border: 'none',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.775rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loan Table */}
      <div className="glass-card" style={{ padding: '1.5rem', overflowX: 'auto' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94A3B8' }}>
            <RefreshCw size={24} className="animate-spin" style={{ margin: '0 auto 0.5rem', display: 'block' }} />
            <span>Fetching loan applications...</span>
          </div>
        ) : loans.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
            No loan records found matching the search criteria.
          </div>
        ) : (
          <table className="custom-table">
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>Evaluation Time</th>
                <th>Purpose</th>
                <th>Income ($)</th>
                <th>Loan Amount ($)</th>
                <th>Credit Score</th>
                <th>Prob. (%)</th>
                <th>Risk Level</th>
                <th>Outcome</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id}>
                  <td style={{ fontWeight: 700, color: '#818CF8', fontFamily: 'var(--font-code)' }}>
                    {loan.id}
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                    {loan.timestamp || 'Just now'}
                  </td>
                  <td>{loan.applicantData.LoanPurpose}</td>
                  <td>${loan.applicantData.Income.toLocaleString()}</td>
                  <td>${loan.applicantData.LoanAmount.toLocaleString()}</td>
                  <td style={{
                    fontWeight: 700,
                    color: loan.applicantData.CreditScore >= 700 ? '#34D399' : loan.applicantData.CreditScore >= 620 ? '#FBBF24' : '#F87171'
                  }}>
                    {loan.applicantData.CreditScore}
                  </td>
                  <td style={{ fontWeight: 700 }}>{loan.probabilityPercentage}%</td>
                  <td><RiskBadge riskLevel={loan.riskLevel} size="small" /></td>
                  <td>
                    <span style={{
                      padding: '0.2rem 0.55rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: loan.prediction === 1 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                      color: loan.prediction === 1 ? '#F87171' : '#34D399'
                    }}>
                      {loan.predictionLabel === 'YES' ? 'DEFAULT' : 'NO DEFAULT'}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => setActiveModalLoan(loan)}
                      className="btn-secondary"
                      style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                    >
                      <Eye size={13} />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Loan Detail Modal */}
      {activeModalLoan && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1.5rem'
        }}>
          <div className="glass-card animate-fade-in" style={{
            width: '100%',
            maxWidth: '650px',
            background: '#141E33',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            padding: '2rem',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F8FAFC' }}>
                  Loan Assessment Record Details
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#818CF8', fontFamily: 'var(--font-code)' }}>
                  {activeModalLoan.id} • {activeModalLoan.timestamp}
                </p>
              </div>
              <button 
                onClick={() => setActiveModalLoan(null)}
                style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Prediction Summary */}
            <div style={{
              background: activeModalLoan.prediction === 1 ? 'rgba(239, 68, 68, 0.12)' : 'rgba(16, 185, 129, 0.12)',
              border: activeModalLoan.prediction === 1 ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
              padding: '1.25rem',
              borderRadius: '12px',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>ML DEFAULT PREDICTION</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: activeModalLoan.prediction === 1 ? '#F87171' : '#34D399' }}>
                  {activeModalLoan.predictionLabel === 'YES' ? 'DEFAULT PREDICTED' : 'NO DEFAULT'}
                </div>
                <div style={{ fontSize: '0.825rem', color: '#CBD5E1', marginTop: '0.2rem' }}>
                  Probability: <strong>{activeModalLoan.probabilityPercentage}%</strong> ({activeModalLoan.probability})
                </div>
              </div>
              <RiskBadge riskLevel={activeModalLoan.riskLevel} />
            </div>

            {/* Applicant Features Grid */}
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#C7D2FE', marginBottom: '0.75rem' }}>
              Submitted Applicant Features (17 ML Inputs)
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.825rem', marginBottom: '1.5rem' }}>
              {Object.entries(activeModalLoan.applicantData).map(([key, val]) => (
                <div key={key} style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem 0.85rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>{key}:</span>
                  <span style={{ fontWeight: 700, color: '#F8FAFC' }}>{String(val)}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setActiveModalLoan(null)} className="btn-primary">
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loans;
