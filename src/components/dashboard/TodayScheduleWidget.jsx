import React from 'react';
import { useStudy } from '../../context/StudyContext';
import { CalendarDays, ArrowRight, Clock, CheckCircle2, Circle } from 'lucide-react';

export default function TodayScheduleWidget({ onNavigateToTimetable, onOpenAddSession }) {
  const { todaySessions, subjects, toggleSession } = useStudy();

  const getSubject = (id) => subjects.find((s) => s.id === id);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-5 shadow-subtle flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Today's Timetable
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {todaySessions.length} study sessions planned today
            </p>
          </div>
        </div>

        <button
          onClick={onNavigateToTimetable}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1 hover:underline"
        >
          <span>Full Timetable</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Schedule List */}
      <div className="flex-1 py-3 space-y-2.5">
        {todaySessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-slate-400">
            <CalendarDays className="w-10 h-10 mb-2 text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No sessions today</p>
            <p className="text-xs text-slate-400 mt-0.5">Plan your study timetable now.</p>
            <button
              onClick={onOpenAddSession}
              className="mt-3 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              + Schedule study session
            </button>
          </div>
        ) : (
          todaySessions.map((session) => {
            const subject = getSubject(session.subjectId);
            return (
              <div
                key={session.id}
                className={`group flex items-center justify-between gap-3 p-3 rounded-xl border transition-all ${
                  session.completed
                    ? 'border-emerald-200/60 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/20 opacity-80'
                    : 'border-slate-100 dark:border-slate-700/60 hover:border-blue-200 dark:hover:border-blue-800/60 bg-slate-50/50 dark:bg-slate-700/20 hover:bg-white dark:hover:bg-slate-700/40'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={() => toggleSession(session.id)}
                    title={session.completed ? 'Mark uncompleted' : 'Mark completed'}
                    className="shrink-0 p-1 rounded-lg text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {session.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-md text-white shrink-0"
                        style={{ backgroundColor: subject?.color || '#3B82F6' }}
                      >
                        {subject ? subject.name : 'Study Session'}
                      </span>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {session.startTime} - {session.endTime}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 truncate">
                      {session.description || 'No topic specified'}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                    {session.durationMinutes}m
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
