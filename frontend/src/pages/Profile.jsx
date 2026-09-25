import React, { useEffect, useState } from 'react';
import apiService from '../services/api';
import { UserCheck, CheckCircle2 } from 'lucide-react';

const Profile = () => {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    const check = async () => {
      try {
        const data = await apiService.getHealth();
        setHealth(data);
      } catch (e) {
        setHealth({ status: 'offline' });
      }
    };
    check();
  }, []);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <UserCheck size={24} color="#818CF8" />
          Risk Officer Profile & System Diagnostics
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#94A3B8', marginTop: '0.2rem' }}>
          User session credentials and FastAPI model server configuration.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1.5rem' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            fontWeight: 800,
            color: '#FFFFFF',
            boxShadow: '0 4px 16px rgba(99,102,241,0.4)'
          }}>
            RO
          </div>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#F8FAFC' }}>
              Senior Credit Risk Analyst
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#818CF8', fontWeight: 600 }}>
              Credit Risk & Underwriting Division • ID: OFF-88421
            </p>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.25rem' }}>
              Access Level: Executive Underwriter • Granted full ML model prediction overrides
            </div>
          </div>
        </div>

        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '1rem' }}>
          Backend REST API Diagnostics
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>API Connection Status</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: health?.status === 'healthy' ? '#34D399' : '#F87171', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
              <CheckCircle2 size={16} />
              {health?.status === 'healthy' ? 'Active & Connected' : 'Offline'}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Loaded ML Model</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#F8FAFC', marginTop: '0.2rem' }}>
              {health?.selectedModel || 'Random Forest Classifier'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
