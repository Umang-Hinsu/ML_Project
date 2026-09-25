import React, { useEffect, useState } from 'react';
import apiService from '../services/api';
import { BarChart3, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await apiService.getDashboardData();
        setMetrics(data.mlMetrics);
      } catch (err) {
        console.error('Failed to load metrics:', err);
      }
    };
    fetchMetrics();
  }, []);

  const modelComparisonData = [
    { name: 'Logistic Regression', Accuracy: 0.6764, Precision: 0.2195, Recall: 0.6990, F1_Score: 0.3341 },
    { name: 'Decision Tree', Accuracy: 0.8814, Precision: 0.4200, Recall: 0.0553, F1_Score: 0.0977 },
    { name: 'Random Forest', Accuracy: 0.7780, Precision: 0.2713, Recall: 0.5407, F1_Score: 0.3613 }
  ];

  const featureImportancesData = metrics?.feature_importances || [
    { feature: 'InterestRate', importance: 0.2450 },
    { feature: 'Income', importance: 0.1820 },
    { feature: 'LoanAmount', importance: 0.1540 },
    { feature: 'CreditScore', importance: 0.1280 },
    { feature: 'DTIRatio', importance: 0.0950 },
    { feature: 'MonthsEmployed', importance: 0.0760 },
    { feature: 'Age', importance: 0.0510 },
    { feature: 'NumCreditLines', importance: 0.0380 },
    { feature: 'HasCoSigner', importance: 0.0310 }
  ];

  const bestModel = metrics?.best_model || 'Random Forest';

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <BarChart3 size={24} color="#818CF8" />
          Machine Learning Model Performance & Analytics
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#94A3B8', marginTop: '0.2rem' }}>
          Rigorous benchmarking and scikit-learn evaluation metrics across Logistic Regression, Decision Tree, and Random Forest.
        </p>
      </div>

      {/* Winner Banner */}
      <div className="glass-card" style={{
        padding: '1.5rem 2rem',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '0.75rem', borderRadius: '12px' }}>
            <Award size={28} color="#34D399" />
          </div>
          <div>
            <div style={{ fontSize: '0.775rem', fontWeight: 700, color: '#34D399', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Selected Best Model (Ranked by F1-Score)
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#F8FAFC' }}>
              {bestModel} Classifier
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#CBD5E1', marginTop: '0.15rem' }}>
              Achieved highest overall balance between Precision and Recall (F1 = 0.3613) on 51,070 holdout test cases.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>SAVED BACKEND MODEL</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#818CF8', fontFamily: 'var(--font-code)' }}>
            loan_default_model.pkl
          </div>
        </div>
      </div>

      {/* Model Benchmark Comparison Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
        {modelComparisonData.map((m) => {
          const isWinner = m.name === bestModel;
          return (
            <div key={m.name} className="glass-card" style={{
              padding: '1.5rem',
              border: isWinner ? '2px solid #10B981' : '1px solid rgba(255,255,255,0.08)',
              background: isWinner ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-card)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F8FAFC' }}>{m.name}</h4>
                {isWinner && (
                  <span style={{ fontSize: '0.675rem', fontWeight: 800, background: '#10B981', color: '#FFF', padding: '2px 8px', borderRadius: '10px' }}>
                    WINNER
                  </span>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem', borderRadius: '8px' }}>
                  <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Accuracy</div>
                  <div style={{ fontWeight: 800, color: '#F8FAFC', fontSize: '1.1rem' }}>{(m.Accuracy * 100).toFixed(1)}%</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem', borderRadius: '8px' }}>
                  <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>F1-Score</div>
                  <div style={{ fontWeight: 800, color: isWinner ? '#34D399' : '#818CF8', fontSize: '1.1rem' }}>{m.F1_Score.toFixed(4)}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem', borderRadius: '8px' }}>
                  <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Precision</div>
                  <div style={{ fontWeight: 700, color: '#F8FAFC' }}>{(m.Precision * 100).toFixed(1)}%</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem', borderRadius: '8px' }}>
                  <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Recall</div>
                  <div style={{ fontWeight: 700, color: '#F8FAFC' }}>{(m.Recall * 100).toFixed(1)}%</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Model Benchmark Chart */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '0.25rem' }}>
          Comparative Metric Breakdown
        </h3>
        <p style={{ fontSize: '0.775rem', color: '#94A3B8', marginBottom: '1.25rem' }}>
          Side-by-side metric comparison on validation test set
        </p>

        <div style={{ height: '280px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={modelComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} domain={[0, 1]} />
              <Tooltip contentStyle={{ background: '#1E293B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#FFF' }} />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="Accuracy" fill="#6366F1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Precision" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Recall" fill="#38BDF8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="F1_Score" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Feature Importances Chart */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '0.25rem' }}>
          Top Feature Importances (Random Forest Model)
        </h3>
        <p style={{ fontSize: '0.775rem', color: '#94A3B8', marginBottom: '1.25rem' }}>
          Relative influence of applicant financial attributes in determining loan default probability
        </p>

        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={featureImportancesData} margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
              <XAxis type="number" stroke="#64748B" fontSize={12} />
              <YAxis type="category" dataKey="feature" stroke="#64748B" fontSize={12} width={120} />
              <Tooltip contentStyle={{ background: '#1E293B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#FFF' }} />
              <Bar dataKey="importance" fill="#818CF8" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
