import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';

const RiskBadge = ({ riskLevel, size = 'normal' }) => {
  let badgeClass = 'badge-low';
  let Icon = ShieldCheck;

  if (riskLevel === 'Medium Risk') {
    badgeClass = 'badge-medium';
    Icon = AlertTriangle;
  } else if (riskLevel === 'High Risk') {
    badgeClass = 'badge-high';
    Icon = ShieldAlert;
  }

  const isSmall = size === 'small';

  return (
    <span 
      className={badgeClass}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isSmall ? '0.25rem' : '0.4rem',
        padding: isSmall ? '0.25rem 0.6rem' : '0.4rem 0.85rem',
        borderRadius: '20px',
        fontSize: isSmall ? '0.725rem' : '0.8rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.03em'
      }}
    >
      <Icon size={isSmall ? 13 : 15} />
      <span>{riskLevel}</span>
    </span>
  );
};

export default RiskBadge;
