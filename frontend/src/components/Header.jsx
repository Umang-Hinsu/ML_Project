import React from 'react';
import { Cpu, CheckCircle2, AlertTriangle, Sun, Moon } from 'lucide-react';

const Header = ({ title, subtitle, isHealthy, selectedModel = "Random Forest", theme, toggleTheme }) => {
  return (
    <header style={{
      height: '70px',
      borderBottom: '1px solid var(--border-color)',
      background: 'var(--bg-card)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      boxShadow: 'var(--shadow-sm)',
      transition: 'background 0.3s ease'
    }}>
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
          {title}
        </h2>
        {subtitle && (
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {subtitle}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Theme Switcher Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            padding: '0.45rem 0.85rem',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--text-main)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          title="Toggle Light / Dark Theme"
        >
          {theme === 'dark' ? (
            <>
              <Sun size={15} color="#FBBF24" />
              <span>Light Theme</span>
            </>
          ) : (
            <>
              <Moon size={15} color="#6366F1" />
              <span>Dark Theme</span>
            </>
          )}
        </button>

        {/* ML Model Indicator Pill */}
        <div style={{
          background: 'rgba(79, 70, 229, 0.08)',
          border: '1px solid rgba(79, 70, 229, 0.2)',
          padding: '0.4rem 0.85rem',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.8rem',
          color: 'var(--accent-primary)',
          fontWeight: 600
        }}>
          <Cpu size={15} />
          <span>Active ML: <strong>{selectedModel}</strong></span>
        </div>

        {/* System Health Badge */}
        <div style={{
          background: isHealthy ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
          border: isHealthy ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(239, 68, 68, 0.25)',
          padding: '0.4rem 0.85rem',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.8rem',
          color: isHealthy ? 'var(--risk-low)' : 'var(--risk-high)',
          fontWeight: 600
        }}>
          {isHealthy ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
          <span>{isHealthy ? 'FastAPI Online' : 'FastAPI Offline'}</span>
        </div>

        {/* User Profile Quick Tag */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          paddingLeft: '0.85rem',
          borderLeft: '1px solid var(--border-color)'
        }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4F46E5 0%, #0284C7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            color: '#FFFFFF',
            fontSize: '0.9rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            RO
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
              Senior Risk Officer
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              Credit Risk Dept.
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
