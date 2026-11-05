import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import { 
  CheckSquare, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  AlertCircle, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  Circle,
  Tag,
  BookOpen
} from 'lucide-react';
import TaskModal from './TaskModal';
import { getFormattedDate } from '../../data/sampleData';

export default function TaskManagerView({ isModalOpen, setIsModalOpen }) {
  const { 
    tasks, 
    subjects, 
    addTask, 
    updateTask, 
    deleteTask, 
    toggleTask,
    pendingTasksCount,
    completedTasksCount
  } = useStudy();

  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'completed'
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const todayStr = getFormattedDate(0);

  const getSubject = (id) => subjects.find((s) => s.id === id);

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    // Status filter
    if (statusFilter === 'pending' && task.completed) return false;
    if (statusFilter === 'completed' && !task.completed) return false;

    // Subject filter
    if (subjectFilter !== 'all' && task.subjectId !== subjectFilter) return false;

    // Priority filter
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchNotes = task.notes && task.notes.toLowerCase().includes(q);
      const subject = getSubject(task.subjectId);
      const matchSubject = subject && subject.name.toLowerCase().includes(q);
      if (!matchTitle && !matchNotes && !matchSubject) return false;
    }

    return true;
  });

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSave = (taskData) => {
    if (editingTask) {
      return updateTask(editingTask.id, taskData);
    } else {
      return addTask(taskData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-700/60 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Tasks & Assignments
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Stay organized with deadlines, revision goals, and assignments.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingTask(null);
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-md shadow-purple-500/20 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4 shadow-subtle space-y-3">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-700/50 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === 'all'
                  ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              All Tasks ({tasks.length})
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === 'pending'
                  ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Pending ({pendingTasksCount})
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === 'completed'
                  ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Completed ({completedTasksCount})
            </button>
          </div>

          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Showing {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
          </div>
        </div>

        {/* Search & Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 dark:border-slate-700/60">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Subject Filter */}
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Subjects</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-12 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
            <CheckSquare className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {searchQuery || subjectFilter !== 'all' || priorityFilter !== 'all'
              ? 'No tasks match your criteria'
              : 'No tasks right now'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1">
            Stay on top of assignments, homework, and test preparation by adding tasks.
          </p>
          <button
            onClick={() => {
              setEditingTask(null);
              setIsModalOpen(true);
            }}
            className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Task</span>
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredTasks.map((task) => {
            const subject = getSubject(task.subjectId);
            const isDueToday = task.dueDate === todayStr;
            const isOverdue = task.dueDate < todayStr && !task.completed;

            return (
              <div
                key={task.id}
                className={`bg-white dark:bg-slate-800 rounded-2xl border p-4 shadow-subtle hover:shadow-card transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  task.completed
                    ? 'border-emerald-200/80 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/10 opacity-75'
                    : isOverdue
                    ? 'border-rose-200/80 dark:border-rose-900/50'
                    : 'border-slate-200/80 dark:border-slate-700/80'
                }`}
              >
                {/* Left: Checkbox & Info */}
                <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                  <button
                    onClick={() => toggleTask(task.id)}
                    title={task.completed ? 'Mark incomplete' : 'Mark completed'}
                    className="p-1 rounded-xl text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors mt-0.5 sm:mt-0 shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      {subject && (
                        <span
                          className="text-[11px] font-bold px-2 py-0.5 rounded-md text-white shadow-xs"
                          style={{ backgroundColor: subject.color }}
                        >
                          {subject.name}
                        </span>
                      )}

                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {task.type}
                      </span>

                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getPriorityBadge(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <h4
                      className={`text-sm font-semibold transition-colors ${
                        task.completed
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-800 dark:text-slate-100'
                      }`}
                    >
                      {task.title}
                    </h4>

                    {task.notes && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {task.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Due Date & Actions */}
                <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                  <div className="text-right">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 ${
                        isOverdue
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                          : isDueToday
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      {isDueToday ? 'Due Today' : isOverdue ? 'Overdue: ' + task.dueDate : task.dueDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(task)}
                      title="Edit Task"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      title="Delete Task"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Add / Edit */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        editingTask={editingTask}
      />
    </div>
  );
}
