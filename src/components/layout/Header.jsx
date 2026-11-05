import React, { useState } from 'react';
import { Menu, Sun, Moon, Plus, Bell, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useStudy } from '../../context/StudyContext';

export default function Header({ onOpenMobileSidebar, onOpenQuickAction }) {
  const { theme, toggleTheme } = useTheme();
  const { profile, todayStudyHours } = useStudy();

  // Get current time greeting & date
  const now = new Date();
  const hour = now.getHours();
  let greeting = 'Good morning';
  if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
  else if (hour >= 17) greeting = 'Good evening';

  const dateFormatted = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="h-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-700/80 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8">
      {/* Left: Mobile trigger & Greeting */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              {greeting}, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{profile.name.split(' ')[0]}</span>!
            </h1>
            <Sparkles className="w-4 h-4 text-amber-500 hidden sm:inline-block animate-bounce" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {dateFormatted}
          </p>
        </div>
      </div>

      {/* Right: Quick actions, Theme toggle */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Today's Study Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 text-xs font-semibold text-blue-700 dark:text-blue-300">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span>{todayStudyHours} hrs studied today</span>
        </div>

        {/* Quick Add Button */}
        <button
          onClick={onOpenQuickAction}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium text-xs sm:text-sm shadow-md shadow-blue-500/20 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Item</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200/60 dark:border-slate-700 transition-colors"
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4 text-purple-600" />
          ) : (
            <Sun className="w-4 h-4 text-amber-400" />
          )}
        </button>
      </div>
    </header>
  );
}
