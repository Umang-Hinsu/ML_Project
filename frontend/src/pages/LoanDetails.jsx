import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiService from '../services/api';
import RiskBadge from '../components/RiskBadge';
import { ArrowLeft } from 'lucide-react';

const LoanDetails = () => {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await apiService.getLoanDetails(id);
        setLoan(res);
      } catch (err) {
        setError(`Loan record ${id} not found in active session history.`);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  if (loading) {
    return <div style={{ padding: '3rem', color: '#94A3B8' }}>Loading record {id}...</div>;
  }

  if (error || !loan) {
    return (
      <div style={{ padding: '3rem', color: '#F87171' }}>
        <p>{error || 'Loan record not found.'}</p>
        <Link to="/loans" className="btn-secondary" style={{ marginTop: '1rem' }}>
          <ArrowLeft size={16} /> Back to Loans
        </Link>
      </div>
    );
  }

  const { applicantData } = loan;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/loans" className="btn-secondary" style={{ padding: '0.5rem 0.85rem' }}>
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F8FAFC' }}>
          Application Inspection: {loan.id}
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* ML Prediction Overview Card */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#F8FAFC' }}>
              ML Model Verdict
            </h3>
            <RiskBadge riskLevel={loan.riskLevel} />
          </div>

          <div style={{
            background: loan.prediction === 1 ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)',
            border: loan.prediction === 1 ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(16,185,129,0.3)',
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
            marginBottom: '1.25rem'
          }}>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>PREDICTED OUTCOME</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: loan.prediction === 1 ? '#F87171' : '#34D399' }}>
              {loan.predictionLabel === 'YES' ? 'DEFAULT PREDICTED' : 'NO DEFAULT'}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#CBD5E1', marginTop: '0.35rem' }}>
              Model Probability: <strong>{loan.probabilityPercentage}%</strong>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#818CF8', marginBottom: '0.3rem' }}>
              Underwriting Guidance:
            </div>
            <p style={{ fontSize: '0.875rem', color: '#E2E8F0', lineHeight: 1.5 }}>
              {loan.message}
            </p>
          </div>
        </div>

        {/* Financial Highlights Card */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '1rem' }}>
            Key Financial Indicators
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
              <span style={{ color: '#94A3B8' }}>Annual Income:</span>
              <strong style={{ color: '#34D399' }}>${applicantData.Income?.toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
              <span style={{ color: '#94A3B8' }}>Loan Principal Requested:</span>
              <strong style={{ color: '#F8FAFC' }}>${applicantData.LoanAmount?.toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
              <span style={{ color: '#94A3B8' }}>FICO Credit Score:</span>
              <strong style={{ color: applicantData.CreditScore >= 700 ? '#34D399' : '#F87171' }}>{applicantData.CreditScore}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
              <span style={{ color: '#94A3B8' }}>Debt-to-Income (DTI) Ratio:</span>
              <strong style={{ color: applicantData.DTIRatio > 0.4 ? '#F87171' : '#34D399' }}>{(applicantData.DTIRatio * 100).toFixed(1)}%</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
              <span style={{ color: '#94A3B8' }}>Employment History:</span>
              <strong style={{ color: '#F8FAFC' }}>{applicantData.MonthsEmployed} months ({applicantData.EmploymentType})</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
