import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  CalendarDays, 
  CheckSquare, 
  TrendingUp, 
  Timer, 
  Settings, 
  GraduationCap,
  X
} from 'lucide-react';
import { useStudy } from '../../context/StudyContext';

export default function Sidebar({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen }) {
  const { subjects, pendingTasksCount, todaySessions, profile } = useStudy();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'subjects',
      label: 'My Subjects',
      icon: BookOpen,
      badge: subjects.length > 0 ? subjects.length : null
    },
    {
      id: 'timetable',
      label: 'Study Timetable',
      icon: CalendarDays,
      badge: todaySessions.length > 0 ? `${todaySessions.length} today` : null,
      badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300'
    },
    {
      id: 'tasks',
      label: 'Tasks & Assignments',
      icon: CheckSquare,
      badge: pendingTasksCount > 0 ? pendingTasksCount : null,
      badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300'
    },
    {
      id: 'progress',
      label: 'Progress Tracker',
      icon: TrendingUp,
      badge: null
    },
    {
      id: 'pomodoro',
      label: 'Pomodoro Timer',
      icon: Timer,
      badge: 'Focus',
      badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      badge: null
    }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white dark:bg-slate-800 border-r border-slate-200/80 dark:border-slate-700/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                Study<span className="text-purple-600 dark:text-purple-400">Mate</span>
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Student Study Planner</p>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-2">
            Main Navigation
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/40 dark:to-purple-950/40 text-blue-700 dark:text-purple-300 shadow-sm border border-blue-100/60 dark:border-purple-800/40 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-600 dark:bg-purple-600 text-white shadow-sm'
                        : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white group-hover:bg-slate-200/60 dark:group-hover:bg-slate-600/40'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      item.badgeColor || 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Card Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-700/60">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/50 dark:border-slate-700/50">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-sm shrink-0"
              style={{ backgroundColor: profile.avatarColor || '#3B82F6' }}
            >
              {profile.name
                ? profile.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)
                : 'ST'}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                {profile.name || 'Student'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                Goal: {profile.dailyTargetHours || 4}h / day
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
