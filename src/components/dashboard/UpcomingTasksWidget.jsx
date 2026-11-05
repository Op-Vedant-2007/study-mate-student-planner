import React from 'react';
import { useStudy } from '../../context/StudyContext';
import { CheckSquare, ArrowRight, Clock, AlertCircle } from 'lucide-react';

export default function UpcomingTasksWidget({ onNavigateToTasks, onOpenAddTask }) {
  const { tasks, subjects, toggleTask } = useStudy();

  // Sort: pending first, then by priority (High > Medium > Low), then due date
  const pendingTasks = tasks.filter((t) => !t.completed);
  const displayTasks = pendingTasks.slice(0, 5);

  const getSubject = (id) => subjects.find((s) => s.id === id);

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200/60 dark:border-rose-800/50';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/50';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200/60 dark:border-slate-700';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-5 shadow-subtle flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Upcoming Tasks
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {pendingTasks.length} pending academic tasks
            </p>
          </div>
        </div>

        <button
          onClick={onNavigateToTasks}
          className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 flex items-center gap-1 hover:underline"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Task List */}
      <div className="flex-1 py-3 space-y-2.5">
        {displayTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-slate-400">
            <CheckSquare className="w-10 h-10 mb-2 text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">All caught up!</p>
            <p className="text-xs text-slate-400 mt-0.5">No pending tasks for today.</p>
            <button
              onClick={onOpenAddTask}
              className="mt-3 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
            >
              + Create a new task
            </button>
          </div>
        ) : (
          displayTasks.map((task) => {
            const subject = getSubject(task.subjectId);
            return (
              <div
                key={task.id}
                className="group flex items-start justify-between gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60 hover:border-purple-200 dark:hover:border-purple-800/60 bg-slate-50/50 dark:bg-slate-700/20 hover:bg-white dark:hover:bg-slate-700/40 transition-all"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="mt-1 w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors truncate">
                      {task.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                      {subject && (
                        <span className="flex items-center gap-1.5 font-medium">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: subject.color }}
                          />
                          {subject.name}
                        </span>
                      )}
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        Due: {task.dueDate}
                      </span>
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border shrink-0 ${getPriorityBadge(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
