import React, { useState } from 'react';
import apiService from '../services/api';
import RiskBadge from '../components/RiskBadge';
import { 
  Calculator, 
  Send, 
  RotateCcw, 
  AlertTriangle, 
  User, 
  DollarSign, 
  Briefcase, 
  CreditCard,
  Sparkles,
  Info,
  Cpu
} from 'lucide-react';

const Prediction = () => {
  const initialFormState = {
    Age: 35,
    Income: 75000,
    LoanAmount: 25000,
    CreditScore: 710,
    MonthsEmployed: 48,
    NumCreditLines: 4,
    InterestRate: 9.5,
    LoanTerm: 36,
    DTIRatio: 0.28,
    Education: "Bachelor's",
    EmploymentType: "Full-time",
    MaritalStatus: "Married",
    HasMortgage: "Yes",
    HasDependents: "Yes",
    LoanPurpose: "Auto",
    HasCoSigner: "No"
  };

  const [formData, setFormData] = useState(initialFormState);
  const [selectedModel, setSelectedModel] = useState("Logistic Regression");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let parsedValue = value;

    if (type === 'number') {
      parsedValue = value === '' ? '' : Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const loadPreset = (presetType) => {
    if (presetType === 'low') {
      setFormData({
        Age: 48,
        Income: 140000,
        LoanAmount: 20000,
        CreditScore: 810,
        MonthsEmployed: 120,
        NumCreditLines: 2,
        InterestRate: 5.5,
        LoanTerm: 36,
        DTIRatio: 0.15,
        Education: "Master's",
        EmploymentType: "Full-time",
        MaritalStatus: "Married",
        HasMortgage: "Yes",
        HasDependents: "Yes",
        LoanPurpose: "Home",
        HasCoSigner: "Yes"
      });
    } else if (presetType === 'medium') {
      setFormData({
        Age: 32,
        Income: 55000,
        LoanAmount: 28000,
        CreditScore: 660,
        MonthsEmployed: 24,
        NumCreditLines: 5,
        InterestRate: 12.0,
        LoanTerm: 48,
        DTIRatio: 0.38,
        Education: "Bachelor's",
        EmploymentType: "Full-time",
        MaritalStatus: "Single",
        HasMortgage: "No",
        HasDependents: "No",
        LoanPurpose: "Auto",
        HasCoSigner: "No"
      });
    } else if (presetType === 'high') {
      setFormData({
        Age: 22,
        Income: 24000,
        LoanAmount: 50000,
        CreditScore: 540,
        MonthsEmployed: 4,
        NumCreditLines: 8,
        InterestRate: 21.5,
        LoanTerm: 60,
        DTIRatio: 0.62,
        Education: "High School",
        EmploymentType: "Unemployed",
        MaritalStatus: "Single",
        HasMortgage: "No",
        HasDependents: "Yes",
        LoanPurpose: "Other",
        HasCoSigner: "No"
      });
    }
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        ...formData,
        Age: Number(formData.Age),
        Income: Number(formData.Income),
        LoanAmount: Number(formData.LoanAmount),
        CreditScore: Number(formData.CreditScore),
        MonthsEmployed: Number(formData.MonthsEmployed),
        NumCreditLines: Number(formData.NumCreditLines),
        InterestRate: Number(formData.InterestRate),
        LoanTerm: Number(formData.LoanTerm),
        DTIRatio: Number(formData.DTIRatio),
        selected_model: selectedModel
      };

      const data = await apiService.predictLoan(payload);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail || 
        'Failed to process ML prediction. Please check that FastAPI backend is running at http://localhost:8000.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header Info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Calculator size={26} color="var(--accent-primary)" />
            Loan Default Prediction & Risk Engine
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.2rem', fontWeight: 500 }}>
            Select an ML Classifier from the dropdown and enter applicant features for real-time inference.
          </p>
        </div>

        {/* Quick Pre-fill Presets */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '0.25rem' }}>
            Sample Profiles:
          </span>
          <button 
            type="button" 
            onClick={() => loadPreset('low')}
            className="btn-secondary" 
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', borderColor: '#059669', color: '#059669', background: '#D1FAE5', fontWeight: 700 }}
          >
            Low Risk Profile
          </button>
          <button 
            type="button" 
            onClick={() => loadPreset('medium')}
            className="btn-secondary" 
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', borderColor: '#D97706', color: '#D97706', background: '#FEF3C7', fontWeight: 700 }}
          >
            Medium Risk Profile
          </button>
          <button 
            type="button" 
            onClick={() => loadPreset('high')}
            className="btn-secondary" 
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', borderColor: '#DC2626', color: '#DC2626', background: '#FEE2E2', fontWeight: 700 }}
          >
            High Risk Profile
          </button>
        </div>
      </div>

      {error && (
        <div style={{
          background: '#FEE2E2',
          border: '1px solid #FCA5A5',
          padding: '1rem 1.25rem',
          borderRadius: '12px',
          color: '#991B1B',
          fontSize: '0.9rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <AlertTriangle size={20} color="#DC2626" />
          <span>{error}</span>
        </div>
      )}

      {/* Model Selector Bar */}
      <div style={{
        background: 'linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)',
        border: '1px solid #4338CA',
        padding: '1.25rem 1.75rem',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
        boxShadow: '0 8px 24px rgba(79, 70, 229, 0.25)',
        color: '#FFFFFF'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '0.75rem', borderRadius: '12px', display: 'flex' }}>
            <Cpu size={26} color="#FFFFFF" />
          </div>
          <div>
            <label style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', display: 'block', letterSpacing: '-0.01em' }}>
              Select Machine Learning Classifier Model
            </label>
            <span style={{ fontSize: '0.85rem', color: '#E0E7FF', fontWeight: 500 }}>
              Choose which of the 5 Task 5 models to use for generating predictions
            </span>
          </div>
        </div>

        <select 
          value={selectedModel} 
          onChange={(e) => setSelectedModel(e.target.value)} 
          style={{ 
            minWidth: '310px', 
            fontWeight: 800, 
            backgroundColor: '#FFFFFF', 
            border: '2px solid #818CF8', 
            color: '#1E1B4B',
            fontSize: '0.95rem',
            padding: '0.75rem 1.1rem',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            outline: 'none'
          }}
        >
          <option value="Logistic Regression">🔹 Logistic Regression (Linear Classifier)</option>
          <option value="Decision Tree">🌳 Decision Tree Classifier (Tree Model)</option>
          <option value="Support Vector Classifier (SVC)">⚡ Support Vector Classifier (LinearSVC)</option>
          <option value="K-Nearest Neighbors (KNN)">📍 K-Nearest Neighbors (KNN Baseline)</option>
          <option value="Naive Bayes">🎲 Naive Bayes (Gaussian Probabilistic)</option>
        </select>
      </div>

      {/* Main Layout: Form Left, Prediction Card Right */}
      <div style={{ display: 'grid', gridTemplateColumns: result ? '1.1fr 0.9fr' : '1fr', gap: '1.75rem', transition: 'all 0.3s ease' }}>
        
        {/* Form Container */}
        <form className="glass-card" onSubmit={handleSubmit} style={{ padding: '2rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          
          {/* Section 1: Demographics & Personal */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.6rem' }}>
              <User size={20} color="var(--accent-primary)" />
              Applicant Demographics & Background
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Age (years)</label>
                <input 
                  type="number" 
                  name="Age" 
                  min="18" 
                  max="100" 
                  value={formData.Age} 
                  onChange={handleChange} 
                  className="form-input" 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Education Level</label>
                <select name="Education" value={formData.Education} onChange={handleChange} className="form-select" required>
                  <option value="High School">High School</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Marital Status</label>
                <select name="MaritalStatus" value={formData.MaritalStatus} onChange={handleChange} className="form-select" required>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Financial Dependents</label>
                <select name="HasDependents" value={formData.HasDependents} onChange={handleChange} className="form-select" required>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Employment & Income */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.6rem' }}>
              <Briefcase size={20} color="var(--accent-primary)" />
              Employment & Income Profile
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Annual Gross Income ($)</label>
                <input 
                  type="number" 
                  name="Income" 
                  min="0" 
                  step="1000"
                  value={formData.Income} 
                  onChange={handleChange} 
                  className="form-input" 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Employment Status</label>
                <select name="EmploymentType" value={formData.EmploymentType} onChange={handleChange} className="form-select" required>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Self-employed">Self-employed</option>
                  <option value="Unemployed">Unemployed</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Months Employed</label>
                <input 
                  type="number" 
                  name="MonthsEmployed" 
                  min="0" 
                  value={formData.MonthsEmployed} 
                  onChange={handleChange} 
                  className="form-input" 
                  required 
                />
              </div>
            </div>
          </div>

          {/* Section 3: Requested Loan Details */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.6rem' }}>
              <DollarSign size={20} color="var(--accent-primary)" />
              Requested Loan Details
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Requested Principal ($)</label>
                <input 
                  type="number" 
                  name="LoanAmount" 
                  min="1000" 
                  step="1000"
                  value={formData.LoanAmount} 
                  onChange={handleChange} 
                  className="form-input" 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Interest Rate (%)</label>
                <input 
                  type="number" 
                  name="InterestRate" 
                  min="1.0" 
                  max="35.0" 
                  step="0.1"
                  value={formData.InterestRate} 
                  onChange={handleChange} 
                  className="form-input" 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Loan Term (months)</label>
                <select name="LoanTerm" value={formData.LoanTerm} onChange={handleChange} className="form-select" required>
                  <option value="12">12 Months (1 Year)</option>
                  <option value="24">24 Months (2 Years)</option>
                  <option value="36">36 Months (3 Years)</option>
                  <option value="48">48 Months (4 Years)</option>
                  <option value="60">60 Months (5 Years)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Stated Loan Purpose</label>
                <select name="LoanPurpose" value={formData.LoanPurpose} onChange={handleChange} className="form-select" required>
                  <option value="Auto">Auto</option>
                  <option value="Home">Home</option>
                  <option value="Education">Education</option>
                  <option value="Business">Business</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Credit & Liabilities */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.6rem' }}>
              <CreditCard size={20} color="var(--accent-primary)" />
              Credit Profile & Existing Liabilities
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Credit Score (300 - 850)</label>
                <input 
                  type="number" 
                  name="CreditScore" 
                  min="300" 
                  max="850" 
                  value={formData.CreditScore} 
                  onChange={handleChange} 
                  className="form-input" 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Debt-to-Income (DTI) Ratio</label>
                <input 
                  type="number" 
                  name="DTIRatio" 
                  min="0.0" 
                  max="1.0" 
                  step="0.01"
                  value={formData.DTIRatio} 
                  onChange={handleChange} 
                  className="form-input" 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Active Credit Lines</label>
                <input 
                  type="number" 
                  name="NumCreditLines" 
                  min="0" 
                  value={formData.NumCreditLines} 
                  onChange={handleChange} 
                  className="form-input" 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Existing Mortgage</label>
                <select name="HasMortgage" value={formData.HasMortgage} onChange={handleChange} className="form-select" required>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Creditworthy Co-Signer</label>
                <select name="HasCoSigner" value={formData.HasCoSigner} onChange={handleChange} className="form-select" required>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '1.25rem', borderTop: '2px solid var(--border-color)' }}>
            <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '0.85rem 2.25rem', fontSize: '1rem', fontWeight: 800 }}>
              {loading ? (
                <>
                  <Sparkles size={18} className="animate-spin" />
                  <span>Evaluating {selectedModel}...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Predict Loan Default ({selectedModel})</span>
                </>
              )}
            </button>

            <button 
              type="button" 
              onClick={() => { setFormData(initialFormState); setResult(null); setError(null); }} 
              className="btn-secondary"
            >
              <RotateCcw size= {16} />
              <span>Reset Form</span>
            </button>
          </div>
        </form>

        {/* Prediction Results Display Card */}
        {result && (
          <div className="glass-card animate-fade-in" style={{
            padding: '2rem',
            background: result.prediction === 1
              ? '#FEF2F2'
              : '#ECFDF5',
            border: result.prediction === 1 
              ? '2px solid #FCA5A5' 
              : '2px solid #6EE7B7',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Model Decision Output
                </span>
                <RiskBadge riskLevel={result.riskLevel} />
              </div>

              {/* Model Badge */}
              <div style={{
                background: '#4F46E5',
                color: '#FFFFFF',
                padding: '0.6rem 1rem',
                borderRadius: '10px',
                marginBottom: '1.25rem',
                fontSize: '0.875rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)'
              }}>
                <Cpu size={18} color="#FFFFFF" />
                <span>Selected Model: {result.selectedModel || selectedModel}</span>
              </div>

              {/* Default Outcome Headline */}
              <div style={{
                marginBottom: '1.5rem',
                textAlign: 'center',
                padding: '1.75rem 1rem',
                background: '#FFFFFF',
                borderRadius: '16px',
                border: result.prediction === 1 ? '2px solid #F87171' : '2px solid #34D399',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 700, marginBottom: '0.25rem', letterSpacing: '0.05em' }}>
                  FINAL INFERENCE OUTCOME
                </div>
                <div style={{
                  fontSize: '2.4rem',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  color: result.prediction === 1 ? '#DC2626' : '#059669'
                }}>
                  {result.predictionLabel === 'YES' ? 'DEFAULT PREDICTED' : 'NO DEFAULT'}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.5rem', fontWeight: 600, fontFamily: 'var(--font-code)' }}>
                  Record ID: {result.id}
                </div>
              </div>

              {/* Probability Meter Bar */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
                  <span>Default Risk Probability</span>
                  <span style={{ color: result.prediction === 1 ? '#DC2626' : '#059669', fontWeight: 900, fontSize: '1.05rem' }}>
                    {result.probabilityPercentage}% ({result.probability})
                  </span>
                </div>

                <div style={{ width: '100%', height: '14px', background: '#E2E8F0', borderRadius: '7px', overflow: 'hidden', padding: '2px' }}>
                  <div style={{
                    width: `${result.probabilityPercentage}%`,
                    height: '100%',
                    borderRadius: '5px',
                    background: result.probability < 0.2 
                      ? '#059669' 
                      : result.probability < 0.45 
                        ? '#D97706' 
                        : '#DC2626',
                    transition: 'width 0.6s ease'
                  }}></div>
                </div>
              </div>

              {/* Recommendation Message */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1E1B4B', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Info size={18} color="#4F46E5" />
                  <span>Underwriting Recommendation</span>
                </div>
                <p style={{ fontSize: '0.925rem', color: '#334155', lineHeight: 1.5, fontWeight: 600 }}>
                  {result.message}
                </p>
              </div>

              {/* Feature Highlights Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', fontSize: '0.85rem' }}>
                <div style={{ background: '#FFFFFF', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <span style={{ color: '#64748B', fontWeight: 600 }}>Income-to-Loan:</span>
                  <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '1rem' }}>
                    {(formData.Income / formData.LoanAmount).toFixed(2)}x
                  </div>
                </div>
                <div style={{ background: '#FFFFFF', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <span style={{ color: '#64748B', fontWeight: 600 }}>DTI Ratio:</span>
                  <div style={{ fontWeight: 800, color: formData.DTIRatio > 0.4 ? '#DC2626' : '#059669', fontSize: '1rem' }}>
                    {(formData.DTIRatio * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.08)', fontSize: '0.8rem', color: '#475569', fontWeight: 700, textAlign: 'center' }}>
              ✓ Verified via {result.selectedModel || selectedModel} (`preprocessing_pipeline.pkl`)
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prediction;
