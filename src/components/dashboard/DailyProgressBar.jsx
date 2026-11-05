import React from 'react';
import { useStudy } from '../../context/StudyContext';
import { Target, CheckCircle2, Clock } from 'lucide-react';

export default function DailyProgressBar() {
  const { 
    taskCompletionPercentage, 
    completedTasksCount, 
    totalTasksCount, 
    todayStudyHours, 
    profile 
  } = useStudy();

  const targetHours = profile.dailyTargetHours || 4;
  const studyHoursNum = parseFloat(todayStudyHours) || 0;
  const studyGoalPercentage = Math.min(100, Math.round((studyHoursNum / targetHours) * 100));

  return (
    <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg shadow-indigo-500/15">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-md text-white mb-2">
            <Target className="w-3.5 h-3.5" />
            Today's Academic Pace
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Keep up the momentum!
          </h2>
          <p className="text-xs sm:text-sm text-blue-100/90 mt-0.5">
            You've completed <span className="font-semibold text-white">{completedTasksCount} of {totalTasksCount}</span> planned tasks today.
          </p>
        </div>

        {/* Big percentage pill */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15 self-start md:self-auto">
          <div className="text-right">
            <p className="text-xs text-blue-100 font-medium">Task Completion</p>
            <p className="text-2xl font-black">{taskCompletionPercentage}%</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-300" />
          </div>
        </div>
      </div>

      {/* Two Progress bars: Tasks and Study Hours */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/15">
        {/* Task Completion Bar */}
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1.5 text-blue-100">
            <span>Tasks Progress</span>
            <span>{completedTasksCount}/{totalTasksCount} Completed</span>
          </div>
          <div className="h-3 w-full bg-black/20 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-500"
              style={{ width: `${taskCompletionPercentage}%` }}
            />
          </div>
        </div>

        {/* Study Hours Target Bar */}
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1.5 text-blue-100">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Daily Study Goal ({targetHours} hrs target)
            </span>
            <span>{todayStudyHours} / {targetHours} hrs ({studyGoalPercentage}%)</span>
          </div>
          <div className="h-3 w-full bg-black/20 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-300 to-yellow-400 rounded-full transition-all duration-500"
              style={{ width: `${studyGoalPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
