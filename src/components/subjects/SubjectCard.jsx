import React, { useState } from 'react';
import { BookOpen, Edit2, Trash2, CheckSquare, Clock, AlertTriangle } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';

export default function SubjectCard({ subject, onEdit }) {
  const { deleteSubject, tasks, studyLogs } = useStudy();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Subject specific statistics
  const subjectTasks = tasks.filter((t) => t.subjectId === subject.id);
  const completedTasks = subjectTasks.filter((t) => t.completed).length;
  const pendingTasks = subjectTasks.length - completedTasks;

  const totalMinutesLogged = studyLogs
    .filter((log) => log.subjectId === subject.id)
    .reduce((sum, log) => sum + (Number(log.minutes) || 0), 0);
  const totalHoursLogged = (totalMinutesLogged / 60).toFixed(1);

  const targetHours = subject.targetHours || 5;
  const targetProgress = Math.min(100, Math.round(((totalMinutesLogged / 60) / targetHours) * 100));

  const handleDelete = () => {
    deleteSubject(subject.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-subtle hover:shadow-card-hover transition-all duration-200 flex flex-col overflow-hidden relative group">
      {/* Top accent bar with subject color */}
      <div className="h-2 w-full" style={{ backgroundColor: subject.color }} />

      <div className="p-5 flex-1 flex flex-col">
        {/* Header: Name, Code & Actions */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                {subject.name}
              </h3>
              {subject.code && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 uppercase">
                  {subject.code}
                </span>
              )}
            </div>
            {subject.description && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {subject.description}
              </p>
            )}
          </div>

          {/* Edit & Delete Action Buttons */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onEdit(subject)}
              title="Edit Subject"
              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              title="Delete Subject"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/60">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/30">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <CheckSquare className="w-3.5 h-3.5 text-purple-500" />
              <span>Tasks</span>
            </div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {completedTasks}/{subjectTasks.length} <span className="text-xs font-normal text-slate-400">({pendingTasks} pending)</span>
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/30">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Study Logged</span>
            </div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {totalHoursLogged}h <span className="text-xs font-normal text-slate-400">/ {targetHours}h goal</span>
            </p>
          </div>
        </div>

        {/* Target Progress Bar */}
        <div className="mt-4 pt-2">
          <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
            <span>Weekly Target Progress</span>
            <span className="font-semibold">{targetProgress}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${targetProgress}%`,
                backgroundColor: subject.color
              }}
            />
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal Overlay */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-5 text-center animate-fade-in">
          <div className="p-3 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mb-2">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Delete "{subject.name}"?
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
            This will also remove all scheduled timetable sessions and tasks tied to this subject.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
