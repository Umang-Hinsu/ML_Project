import React from 'react';

const StatCard = ({ title, value, subtext, icon: Icon, trend, color = 'indigo' }) => {
  const colorMap = {
    indigo: { bg: 'rgba(99, 102, 241, 0.12)', text: '#818CF8', border: 'rgba(99, 102, 241, 0.25)' },
    emerald: { bg: 'rgba(16, 185, 129, 0.12)', text: '#34D399', border: 'rgba(16, 185, 129, 0.25)' },
    amber: { bg: 'rgba(245, 158, 11, 0.12)', text: '#FBBF24', border: 'rgba(245, 158, 11, 0.25)' },
    rose: { bg: 'rgba(239, 68, 68, 0.12)', text: '#F87171', border: 'rgba(239, 68, 68, 0.25)' },
    cyan: { bg: 'rgba(6, 182, 212, 0.12)', text: '#38BDF8', border: 'rgba(6, 182, 212, 0.25)' }
  };

  const theme = colorMap[color] || colorMap.indigo;

  return (
    <div className="glass-card" style={{ padding: '1.35rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
        <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {title}
        </span>
        {Icon && (
          <div style={{
            background: theme.bg,
            border: `1px solid ${theme.border}`,
            padding: '0.5rem',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon size={18} color={theme.text} />
          </div>
        )}
      </div>

      <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem', letterSpacing: '-0.02em' }}>
        {value}
      </div>

      {subtext && (
        <div style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          {trend && (
            <span style={{ color: trend.startsWith('+') ? '#34D399' : '#F87171', fontWeight: 700 }}>
              {trend}
            </span>
          )}
          <span>{subtext}</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
