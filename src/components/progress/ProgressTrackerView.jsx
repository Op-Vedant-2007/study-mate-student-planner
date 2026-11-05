import React from 'react';
import { useStudy } from '../../context/StudyContext';
import { 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Award, 
  Flame, 
  Target, 
  BookOpen, 
  Calendar,
  Sparkles
} from 'lucide-react';

export default function ProgressTrackerView() {
  const { 
    subjects, 
    tasks, 
    studyLogs, 
    totalTasksCount, 
    completedTasksCount, 
    taskCompletionPercentage, 
    totalStudyHours 
  } = useStudy();

  // Subject-wise study statistics
  const subjectStats = subjects.map((sub) => {
    const subTasks = tasks.filter((t) => t.subjectId === sub.id);
    const subCompleted = subTasks.filter((t) => t.completed).length;
    const taskPercent = subTasks.length > 0 ? Math.round((subCompleted / subTasks.length) * 100) : 0;

    const subMinutes = studyLogs
      .filter((log) => log.subjectId === sub.id)
      .reduce((sum, log) => sum + (Number(log.minutes) || 0), 0);
    const subHours = (subMinutes / 60).toFixed(1);

    const targetH = sub.targetHours || 5;
    const hoursPercent = Math.min(100, Math.round(((subMinutes / 60) / targetH) * 100));

    return {
      ...sub,
      totalTasks: subTasks.length,
      completedTasks: subCompleted,
      taskPercent,
      subHours: parseFloat(subHours),
      hoursPercent
    };
  });

  // Calculate highest study hour for relative SVG bar graph
  const maxHours = Math.max(1, ...subjectStats.map((s) => s.subHours));

  // Achievements
  const achievements = [
    {
      id: 'ach-1',
      title: 'First Step',
      desc: 'Completed at least 1 study task',
      unlocked: completedTasksCount >= 1,
      icon: Target
    },
    {
      id: 'ach-2',
      title: 'Task Conqueror',
      desc: 'Completed 5 or more study tasks',
      unlocked: completedTasksCount >= 5,
      icon: CheckCircle2
    },
    {
      id: 'ach-3',
      title: 'Focused Scholar',
      desc: 'Logged more than 5 hours of study time',
      unlocked: parseFloat(totalStudyHours) >= 5,
      icon: Clock
    },
    {
      id: 'ach-4',
      title: 'Multi-Subject Master',
      desc: 'Enrolled in 3 or more courses',
      unlocked: subjects.length >= 3,
      icon: Award
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Progress Tracker
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Visual analytics of your academic tasks, logged study hours, and subject performance.
        </p>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Tasks Completed
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {completedTasksCount}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              of {totalTasksCount} total
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {totalTasksCount - completedTasksCount} pending
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Completion Rate
            </span>
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {taskCompletionPercentage}%
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Overall tasks finished
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Study Hours
            </span>
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {totalStudyHours}h
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Logged across all courses
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active Courses
            </span>
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {subjects.length}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Monitored subjects
          </p>
        </div>
      </div>

      {/* Visual Chart: Subject-wise Study Hours */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 shadow-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Study Hours by Subject
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Comparative distribution of logged study time across your courses
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 self-start sm:self-auto">
            {totalStudyHours} Total Hours
          </span>
        </div>

        {subjectStats.length === 0 ? (
          <p className="text-center text-xs text-slate-400 py-6">Add subjects to view charts.</p>
        ) : (
          <div className="space-y-4">
            {subjectStats.map((sub) => {
              const barWidth = Math.max(8, Math.round((sub.subHours / maxHours) * 100));

              return (
                <div key={sub.id} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: sub.color }}
                      />
                      {sub.name} {sub.code ? `(${sub.code})` : ''}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">
                      <span className="font-bold text-slate-900 dark:text-white">{sub.subHours}h</span> / {sub.targetHours}h target
                    </span>
                  </div>

                  <div className="h-4 w-full bg-slate-100 dark:bg-slate-700/60 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2 text-[10px] text-white font-bold"
                      style={{
                        width: `${barWidth}%`,
                        backgroundColor: sub.color
                      }}
                    >
                      {sub.subHours > 0 && `${sub.subHours}h`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Two Column Section: Subject-wise Task Completion & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject-wise Task Completion */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 shadow-subtle">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Subject-wise Task Completion
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
            Breakdown of finished assignments and study tasks
          </p>

          <div className="space-y-4">
            {subjectStats.map((sub) => (
              <div key={sub.id} className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-700/20">
                <div className="flex justify-between items-center text-xs font-semibold mb-2">
                  <span className="text-slate-800 dark:text-slate-200 font-bold">
                    {sub.name}
                  </span>
                  <span className="text-purple-600 dark:text-purple-400 font-bold">
                    {sub.completedTasks} / {sub.totalTasks} ({sub.taskPercent}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-200/80 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
                    style={{ width: `${sub.taskPercent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Achievements & Badges */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 shadow-subtle">
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Student Milestones
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
            Earn badges as you hit your academic goals
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {achievements.map((ach) => {
              const Icon = ach.icon;
              return (
                <div
                  key={ach.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    ach.unlocked
                      ? 'border-amber-200/80 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20'
                      : 'border-slate-200/60 dark:border-slate-700/50 bg-slate-50/30 dark:bg-slate-800/40 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl shrink-0 ${
                        ach.unlocked
                          ? 'bg-amber-500 text-white shadow-sm'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        {ach.title}
                        {ach.unlocked && <Sparkles className="w-3 h-3 text-amber-500" />}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {ach.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
