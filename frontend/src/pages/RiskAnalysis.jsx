import React from 'react';
import RiskBadge from '../components/RiskBadge';
import { ShieldAlert } from 'lucide-react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell } from 'recharts';

const RiskAnalysis = () => {
  const riskThresholds = [
    { level: 'Low Risk', range: '< 20% Default Prob.', action: 'Automated Instant Approval', color: '#10B981', desc: 'Strong credit history, low DTI, stable employment history' },
    { level: 'Medium Risk', range: '20% - 45% Default Prob.', action: 'Standard Underwriting Review', color: '#F59E0B', desc: 'Moderate leverage, higher DTI, collateral verification required' },
    { level: 'High Risk', range: '> 45% Default Prob.', action: 'High-Risk Underwriting Protocol', color: '#EF4444', desc: 'Elevated DTI ratio, past delinquencies or low credit score' }
  ];

  // Scatter plot data mapping DTI vs CreditScore vs InterestRate
  const scatterRiskData = [
    { creditScore: 780, dti: 18, interestRate: 5.5, risk: 'Low Risk', color: '#10B981' },
    { creditScore: 810, dti: 12, interestRate: 4.8, risk: 'Low Risk', color: '#10B981' },
    { creditScore: 720, dti: 25, interestRate: 7.2, risk: 'Low Risk', color: '#10B981' },
    { creditScore: 680, dti: 35, interestRate: 11.5, risk: 'Medium Risk', color: '#F59E0B' },
    { creditScore: 640, dti: 42, interestRate: 14.8, risk: 'Medium Risk', color: '#F59E0B' },
    { creditScore: 590, dti: 52, interestRate: 19.2, risk: 'High Risk', color: '#EF4444' },
    { creditScore: 550, dti: 65, interestRate: 22.0, risk: 'High Risk', color: '#EF4444' },
    { creditScore: 610, dti: 48, interestRate: 17.5, risk: 'High Risk', color: '#EF4444' },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <ShieldAlert size={24} color="#818CF8" />
          Portfolio Risk Analysis & Threshold Matrix
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#94A3B8', marginTop: '0.2rem' }}>
          Deep-dive risk segmentation, probability threshold mappings, and credit exposure analysis.
        </p>
      </div>

      {/* Risk Tiers Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
        {riskThresholds.map((tier) => (
          <div key={tier.level} className="glass-card" style={{
            padding: '1.5rem',
            border: `1px solid ${tier.color}40`,
            background: `${tier.color}08`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
              <RiskBadge riskLevel={tier.level} />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: tier.color, fontFamily: 'var(--font-code)' }}>
                {tier.range}
              </span>
            </div>

            <div style={{ fontSize: '0.925rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '0.5rem' }}>
              Policy Action: {tier.action}
            </div>

            <p style={{ fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.4 }}>
              {tier.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Credit Score vs DTI Scatter Analysis */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '0.25rem' }}>
          Credit Score vs Debt-to-Income (DTI) Risk Mapping
        </h3>
        <p style={{ fontSize: '0.775rem', color: '#94A3B8', marginBottom: '1.25rem' }}>
          Scatter matrix illustrating risk tier transitions relative to borrower FICO and DTI %
        </p>

        <div style={{ height: '320px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
              <XAxis type="number" dataKey="creditScore" name="Credit Score" domain={[500, 850]} stroke="#64748B" unit=" FICO" />
              <YAxis type="number" dataKey="dti" name="DTI Ratio" domain={[0, 80]} stroke="#64748B" unit="%" />
              <ZAxis type="number" dataKey="interestRate" range={[100, 400]} name="Interest Rate" unit="%" />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ background: '#1E293B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#FFF' }}
              />
              <Scatter name="Borrowers" data={scatterRiskData}>
                {scatterRiskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;
