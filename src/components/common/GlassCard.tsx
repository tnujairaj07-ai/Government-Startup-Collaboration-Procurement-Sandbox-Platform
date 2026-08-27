import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'frosted' | 'white' | 'subcard' | 'gradient' | 'notched';
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  variant = 'frosted',
  onClick,
  hoverEffect = false,
}) => {
  const baseStyles = 'rounded-2xl transition-all duration-200';
  
  const variantStyles = {
    frosted: 'glass-panel text-navy-900',
    white: 'bg-white border border-slate-200/80 shadow-glass text-navy-900',
    subcard: 'glass-subcard text-navy-900',
    gradient: 'bg-gradient-to-br from-brand-royal to-[#38BDF8] text-white shadow-action',
    notched: 'passport-ticket border border-white/80'
  };

  const hoverStyles = hoverEffect ? 'hover:-translate-y-1 hover:shadow-glass-hover cursor-pointer' : '';

  return (
    <div 
      className={clsx(baseStyles, variantStyles[variant], hoverStyles, className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
