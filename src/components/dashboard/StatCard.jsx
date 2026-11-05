import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, colorClass, bgClass, trend }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-subtle hover:shadow-card transition-all duration-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl ${bgClass || 'bg-blue-50 dark:bg-blue-950/50'}`}>
          <Icon className={`w-5 h-5 ${colorClass || 'text-blue-600 dark:text-blue-400'}`} />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {value}
        </span>
        {trend && (
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
}
