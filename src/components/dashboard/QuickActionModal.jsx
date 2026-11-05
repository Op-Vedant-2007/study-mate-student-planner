import React from 'react';
import { X, CheckSquare, BookOpen, CalendarDays, Timer } from 'lucide-react';

export default function QuickActionModal({ isOpen, onClose, onSelectAction }) {
  if (!isOpen) return null;

  const actions = [
    {
      id: 'task',
      title: 'New Study Task',
      desc: 'Add an assignment, revision, or exam task',
      icon: CheckSquare,
      color: 'from-purple-500 to-indigo-600',
      bgLight: 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400'
    },
    {
      id: 'session',
      title: 'Schedule Study Session',
      desc: 'Add a timetable slot for today or this week',
      icon: CalendarDays,
      color: 'from-blue-500 to-cyan-600',
      bgLight: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
    },
    {
      id: 'subject',
      title: 'Add New Subject',
      desc: 'Create a subject with study target hours',
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-600',
      bgLight: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
    },
    {
      id: 'pomodoro',
      title: 'Start Pomodoro Focus',
      desc: 'Jump into a 25-minute timer session',
      icon: Timer,
      color: 'from-amber-500 to-rose-600',
      bgLight: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            Quick Action
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Options */}
        <div className="p-4 space-y-2.5">
          {actions.map((act) => {
            const Icon = act.icon;
            return (
              <button
                key={act.id}
                onClick={() => {
                  onSelectAction(act.id);
                  onClose();
                }}
                className="w-full flex items-center gap-3.5 p-3 rounded-xl border border-slate-200/70 dark:border-slate-700/60 hover:border-blue-400 dark:hover:border-purple-500 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-all text-left group"
              >
                <div className={`p-2.5 rounded-xl ${act.bgLight} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-purple-400">
                    {act.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {act.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
