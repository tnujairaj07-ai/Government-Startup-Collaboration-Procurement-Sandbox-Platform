import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function NotificationToast() {
  const { toast } = useApp();

  if (!toast) return null;

  const bgMap = {
    success: 'bg-emerald-900/90 border-emerald-600 text-emerald-100',
    error: 'bg-rose-900/90 border-rose-600 text-rose-100',
    info: 'bg-blue-900/90 border-blue-600 text-blue-100',
    warning: 'bg-amber-900/90 border-amber-600 text-amber-100',
  };

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-400" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className={`flex items-center space-x-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md ${bgMap[toast.type] || bgMap.info}`}>
        {iconMap[toast.type] || iconMap.info}
        <span className="text-xs font-semibold">{toast.message}</span>
      </div>
    </div>
  );
}
