import React from 'react';
import { useStudy } from '../../context/StudyContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useStudy();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
        let borderClass = 'border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/90 dark:bg-emerald-950/90 text-emerald-900 dark:text-emerald-100';

        if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
          borderClass = 'border-rose-200 dark:border-rose-800/50 bg-rose-50/90 dark:bg-rose-950/90 text-rose-900 dark:text-rose-100';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-blue-500 shrink-0" />;
          borderClass = 'border-blue-200 dark:border-blue-800/50 bg-blue-50/90 dark:bg-blue-950/90 text-blue-900 dark:text-blue-100';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 animate-slide-in ${borderClass}`}
          >
            <div className="flex items-center gap-3">
              {icon}
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
