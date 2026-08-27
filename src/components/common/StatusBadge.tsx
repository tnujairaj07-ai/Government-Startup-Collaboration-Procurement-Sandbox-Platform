import React from 'react';
import clsx from 'clsx';
import { CheckCircle2, AlertCircle, Clock, ShieldCheck, Sparkles, XCircle } from 'lucide-react';

export type BadgeVariant = 'emerald' | 'amber' | 'crimson' | 'violet' | 'blue' | 'slate';

interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md' | 'lg';
  icon?: 'check' | 'alert' | 'clock' | 'shield' | 'sparkles' | 'x' | 'dot' | 'none';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant = 'emerald',
  size = 'md',
  icon = 'none',
  className = '',
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    emerald: 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]',
    amber: 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]',
    crimson: 'bg-[#FEE2E2] text-[#DC2626] border-[#FECACA]',
    violet: 'bg-[#F3E8FF] text-[#7C3AED] border-[#DDD6FE]',
    blue: 'bg-[#DDEBFC] text-[#1D64EC] border-[#BFDBFE]',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 font-medium gap-1',
    md: 'text-[11px] px-2.5 py-1 font-semibold gap-1.5',
    lg: 'text-xs px-3 py-1.5 font-semibold gap-2',
  };

  const renderIcon = () => {
    const iconClass = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5';
    switch (icon) {
      case 'check':
        return <CheckCircle2 className={iconClass} />;
      case 'alert':
        return <AlertCircle className={iconClass} />;
      case 'clock':
        return <Clock className={iconClass} />;
      case 'shield':
        return <ShieldCheck className={iconClass} />;
      case 'sparkles':
        return <Sparkles className={iconClass} />;
      case 'x':
        return <XCircle className={iconClass} />;
      case 'dot':
        return <span className="w-1.5 h-1.5 rounded-full bg-current" />;
      default:
        return null;
    }
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border transition-colors shadow-xs select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {renderIcon()}
      <span>{label}</span>
    </span>
  );
};
