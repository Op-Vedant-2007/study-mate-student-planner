import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useStudy } from '../../context/StudyContext';
import { 
  Settings as SettingsIcon, 
  Sun, 
  Moon, 
  User, 
  Clock, 
  RotateCcw, 
  Trash2, 
  Download, 
  Upload, 
  Check, 
  ShieldAlert,
  GraduationCap
} from 'lucide-react';

export default function SettingsView() {
  const { theme, setTheme } = useTheme();
  const { 
    profile, 
    updateProfile, 
    resetToSampleData, 
    clearAllData, 
    showToast,
    subjects,
    tasks,
    sessions,
    studyLogs 
  } = useStudy();

  const [name, setName] = useState(profile.name || 'Alex Morgan');
  const [college, setCollege] = useState(profile.college || 'Computer Science Department');
  const [dailyTargetHours, setDailyTargetHours] = useState(profile.dailyTargetHours || 4);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Name cannot be empty', 'error');
      return;
    }
    updateProfile({
      name: name.trim(),
      college: college.trim(),
      dailyTargetHours: Number(dailyTargetHours) || 4
    });
  };

  // Export JSON Backup
  const handleExportData = () => {
    const backupData = {
      profile,
      subjects,
      tasks,
      sessions,
      studyLogs,
      exportedAt: new Date().toISOString()
    };
    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `StudyMate_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup JSON downloaded successfully!');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Top Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Settings & Preferences
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Manage your appearance, student profile, daily goals, and application data.
        </p>
      </div>

      {/* 1. Theme Preferences */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 shadow-subtle">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
          Appearance & Theme
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
          Select your preferred visual style. Automatically persists in your browser.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
              theme === 'light'
                ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="p-3 rounded-xl bg-amber-100 text-amber-600">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Light Mode
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Crisp, soft blue and clean white palette
              </p>
            </div>
            {theme === 'light' && (
              <div className="ml-auto w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Check className="w-3.5 h-3.5" />
              </div>
            )}
          </button>

          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
              theme === 'dark'
                ? 'border-purple-600 bg-purple-50/50 dark:bg-purple-950/30'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="p-3 rounded-xl bg-purple-900/60 text-purple-300">
              <Moon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Dark Mode
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Deep slate and purple tones, easy on the eyes at night
              </p>
            </div>
            {theme === 'dark' && (
              <div className="ml-auto w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center">
                <Check className="w-3.5 h-3.5" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* 2. Student Profile & Goals Form */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 shadow-subtle">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
          Student Profile & Study Target
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
          Customize your greeting name and daily study pace.
        </p>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Student Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                College / Major / Department
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Daily Target Study Hours
            </label>
            <div className="relative max-w-xs">
              <Clock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="number"
                min="1"
                max="16"
                step="0.5"
                value={dailyTargetHours}
                onChange={(e) => setDailyTargetHours(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* 3. Data Management & Sample Data */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 shadow-subtle">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
          Sample Data & Backup
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
          Easily reset sample subjects and tasks for presentation, or start completely fresh.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Reset to Sample Data */}
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/60 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 transition-colors text-xs font-bold"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Load Sample Data</span>
          </button>

          {/* Export JSON */}
          <button
            type="button"
            onClick={handleExportData}
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200 transition-colors text-xs font-bold"
          >
            <Download className="w-4 h-4" />
            <span>Export Backup (JSON)</span>
          </button>

          {/* Clear All Data */}
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/60 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 hover:bg-rose-100 transition-colors text-xs font-bold"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All Data</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal for Reset Sample Data */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Load Sample Subjects & Tasks?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 mb-5">
              This will populate your dashboard with pre-configured subjects (Computer Networks, Data Structures, Mathematics, Java) and upcoming tasks for a smooth demonstration.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetToSampleData();
                  setShowResetConfirm(false);
                }}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md"
              >
                Yes, Load Sample Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Clear All */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-3">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Start Fresh & Clear All Data?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 mb-5">
              Are you sure? This will remove all added subjects, timetable sessions, and tasks from your browser's LocalStorage.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clearAllData();
                  setShowClearConfirm(false);
                }}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md"
              >
                Yes, Clear Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
