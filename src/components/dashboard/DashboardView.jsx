import React from 'react';
import { useStudy } from '../../context/StudyContext';
import { 
  BookOpen, 
  CheckSquare, 
  Clock, 
  CheckCircle2, 
  Flame, 
  Play, 
  CalendarDays,
  Plus
} from 'lucide-react';
import StatCard from './StatCard';
import DailyProgressBar from './DailyProgressBar';
import UpcomingTasksWidget from './UpcomingTasksWidget';
import TodayScheduleWidget from './TodayScheduleWidget';

export default function DashboardView({ 
  onNavigateTab, 
  onOpenTaskModal, 
  onOpenSessionModal, 
  onOpenSubjectModal 
}) {
  const { 
    subjects, 
    pendingTasksCount, 
    completedTasksCount, 
    todayStudyHours, 
    profile, 
    pomodoroStats 
  } = useStudy();

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Top Welcome & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Academic Overview
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Track your subjects, stay ahead on assignments, and hit your study targets today.
          </p>
        </div>

        {/* Quick action pill buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onOpenTaskModal()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/60 hover:bg-purple-100 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Task</span>
          </button>

          <button
            onClick={() => onOpenSessionModal()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 hover:bg-blue-100 transition-colors"
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Plan Session</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Total Subjects"
          value={subjects.length}
          subtitle="Enrolled academic courses"
          icon={BookOpen}
          colorClass="text-blue-600 dark:text-blue-400"
          bgClass="bg-blue-50 dark:bg-blue-950/50"
        />

        <StatCard
          title="Tasks Pending"
          value={pendingTasksCount}
          subtitle="Assignments & revisions"
          icon={CheckSquare}
          colorClass="text-purple-600 dark:text-purple-400"
          bgClass="bg-purple-50 dark:bg-purple-950/50"
        />

        <StatCard
          title="Tasks Completed"
          value={completedTasksCount}
          subtitle="Finished study tasks"
          icon={CheckCircle2}
          colorClass="text-emerald-600 dark:text-emerald-400"
          bgClass="bg-emerald-50 dark:bg-emerald-950/50"
          trend="Keep going!"
        />

        <StatCard
          title="Today's Study Hours"
          value={`${todayStudyHours}h`}
          subtitle={`Target: ${profile.dailyTargetHours || 4}h / day`}
          icon={Clock}
          colorClass="text-amber-600 dark:text-amber-400"
          bgClass="bg-amber-50 dark:bg-amber-950/50"
        />
      </div>

      {/* Daily Progress Bar Card */}
      <DailyProgressBar />

      {/* Two Column Grid: Upcoming Tasks & Today's Timetable */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingTasksWidget
          onNavigateToTasks={() => onNavigateTab('tasks')}
          onOpenAddTask={() => onOpenTaskModal()}
        />

        <TodayScheduleWidget
          onNavigateToTimetable={() => onNavigateTab('timetable')}
          onOpenAddSession={() => onOpenSessionModal()}
        />
      </div>

      {/* Pomodoro Quick Launch Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 dark:from-amber-950/20 dark:via-rose-950/20 dark:to-purple-950/20 rounded-2xl p-5 border border-amber-200/60 dark:border-amber-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20 shrink-0">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Ready to focus? Start a 25-minute Pomodoro session
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {pomodoroStats.todaySessions} sessions completed today ({pomodoroStats.totalFocusMinutes} mins total focus time).
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('pomodoro')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-semibold text-sm shadow-md shadow-rose-500/20 transition-all shrink-0 active:scale-95"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Launch Timer</span>
        </button>
      </div>
    </div>
  );
}
