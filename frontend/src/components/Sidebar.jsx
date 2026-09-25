import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calculator, 
  FileText, 
  BarChart3, 
  ShieldAlert, 
  FileSpreadsheet, 
  UserCheck, 
  Shield, 
  Activity 
} from 'lucide-react';

const Sidebar = ({ isHealthy }) => {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/prediction', label: 'Loan Prediction', icon: Calculator, highlight: true },
    { path: '/loans', label: 'Loan Portfolio', icon: FileText },
    { path: '/analytics', label: 'ML Analytics', icon: BarChart3 },
    { path: '/risk-analysis', label: 'Risk Analysis', icon: ShieldAlert },
    { path: '/reports', label: 'Executive Reports', icon: FileSpreadsheet },
    { path: '/profile', label: 'Officer Profile', icon: UserCheck },
  ];

  return (
    <aside style={{
      width: '260px',
      background: '#0F172A',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      zIndex: 20
    }}>
      {/* Brand Header */}
      <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #6366F1 0%, #4338CA 100%)',
            padding: '0.6rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)'
          }}>
            <Shield size={22} color="#FFFFFF" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#F8FAFC', letterSpacing: '-0.02em' }}>
              Credi<span style={{ color: '#818CF8' }}>Guard</span> AI
            </h1>
            <p style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 500 }}>
              Loan Default & Risk Engine
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ padding: '1.25rem 0.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.8rem 1rem',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#FFFFFF' : '#94A3B8',
                background: isActive 
                  ? item.highlight 
                    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(67, 56, 202, 0.2) 100%)' 
                    : 'rgba(255, 255, 255, 0.06)'
                  : 'transparent',
                border: isActive ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              })}
            >
              <Icon size={19} style={{ color: item.highlight ? '#818CF8' : 'inherit' }} />
              <span>{item.label}</span>
              {item.highlight && (
                <span style={{
                  marginLeft: 'auto',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  background: '#6366F1',
                  color: '#FFF',
                  padding: '2px 6px',
                  borderRadius: '6px',
                  textTransform: 'uppercase'
                }}>
                  ML Engine
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Backend Status Footer */}
      <div style={{ padding: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(15, 23, 42, 0.6)' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '10px',
          padding: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <Activity size={18} color={isHealthy ? '#10B981' : '#EF4444'} />
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#F8FAFC' }}>
              FastAPI ML Service
            </div>
            <div style={{ fontSize: '0.7rem', color: isHealthy ? '#34D399' : '#F87171', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: isHealthy ? '#10B981' : '#EF4444',
                display: 'inline-block'
              }}></span>
              {isHealthy ? 'Connected & Ready' : 'Backend Disconnected'}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
