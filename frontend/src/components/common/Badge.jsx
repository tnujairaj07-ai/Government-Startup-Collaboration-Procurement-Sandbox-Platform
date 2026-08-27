import React from 'react';

export function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const variantStyles = {
    default: 'bg-slate-100 text-slate-800 border-slate-200',
    primary: 'bg-blue-50 text-blue-700 border-blue-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    dark: 'bg-slate-800 text-slate-200 border-slate-700',
  };

  const sizeStyles = {
    xs: 'text-[10px] px-1.5 py-0.5 font-medium',
    sm: 'text-xs px-2.5 py-1 font-semibold',
    md: 'text-sm px-3 py-1.5 font-semibold',
  };

  return (
    <span className={`inline-flex items-center rounded-md border ${variantStyles[variant] || variantStyles.default} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
}

export function StageBadge({ stage }) {
  const stageMap = {
    screening: { label: '1. Screening', variant: 'cyan' },
    expert_review: { label: '2. Expert Review', variant: 'warning' },
    contract_approval: { label: '3. Contract Approval', variant: 'purple' },
    active_sandbox: { label: '4. Active Sandbox', variant: 'success' },
    gem_transition: { label: '5. GeM Ready', variant: 'primary' },
    rejected: { label: 'Rejected', variant: 'danger' },
  };

  const info = stageMap[stage] || { label: stage, variant: 'default' };
  return <Badge variant={info.variant}>{info.label}</Badge>;
}

export function CyberScoreBadge({ score }) {
  let color = 'text-rose-600 bg-rose-50 border-rose-200';
  if (score >= 90) color = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  else if (score >= 75) color = 'text-amber-700 bg-amber-50 border-amber-200';

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${color}`}>
      🛡️ Cyber {score}/100
    </span>
  );
}
