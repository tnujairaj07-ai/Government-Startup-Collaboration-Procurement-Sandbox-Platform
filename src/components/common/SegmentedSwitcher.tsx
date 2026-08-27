import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export interface TabOption {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface SegmentedSwitcherProps {
  tabs: TabOption[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SegmentedSwitcher: React.FC<SegmentedSwitcherProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'p-1 text-xs gap-1',
    md: 'p-1.5 text-xs sm:text-sm gap-1.5',
    lg: 'p-2 text-sm gap-2',
  };

  const itemPadding = {
    sm: 'px-2.5 py-1',
    md: 'px-3.5 py-1.5',
    lg: 'px-5 py-2',
  };

  return (
    <div
      className={clsx(
        "inline-flex items-center rounded-full bg-brand-sky-light/80 backdrop-blur-md border border-brand-sky p-1 shadow-inner",
        sizeClasses[size],
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={clsx(
              "relative rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 z-10 select-none",
              itemPadding[size],
              isActive
                ? "text-brand-royal font-bold shadow-sm"
                : "text-slate-500 hover:text-navy-900"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activePillTab"
                className="absolute inset-0 bg-white rounded-full shadow-md z-[-1] border border-white"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={clsx(
                  "text-[10px] font-bold px-1.5 py-0.2 rounded-full",
                  isActive
                    ? "bg-brand-sky text-brand-royal"
                    : "bg-slate-200/80 text-slate-600"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
