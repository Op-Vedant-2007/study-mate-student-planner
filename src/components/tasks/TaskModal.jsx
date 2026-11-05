import React, { useState, useEffect } from 'react';
import { X, CheckSquare, BookOpen, CalendarDays, Flag, Clock, AlignLeft } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';
import { getFormattedDate } from '../../data/sampleData';

export default function TaskModal({ isOpen, onClose, onSave, editingTask }) {
  const { subjects } = useStudy();

  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [type, setType] = useState('Assignment');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState(getFormattedDate(0));
  const [estimatedMinutes, setEstimatedMinutes] = useState(45);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const taskTypes = ['Assignment', 'Exam Prep', 'Revision', 'Project', 'General Study'];
  const priorities = ['Low', 'Medium', 'High'];

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setSubjectId(editingTask.subjectId || (subjects[0]?.id || ''));
      setType(editingTask.type || 'Assignment');
      setPriority(editingTask.priority || 'Medium');
      setDueDate(editingTask.dueDate || getFormattedDate(0));
      setEstimatedMinutes(editingTask.estimatedMinutes || 45);
      setNotes(editingTask.notes || '');
    } else {
      setTitle('');
      setSubjectId(subjects[0]?.id || '');
      setType('Assignment');
      setPriority('Medium');
      setDueDate(getFormattedDate(0));
      setEstimatedMinutes(45);
      setNotes('');
    }
    setError('');
  }, [editingTask, isOpen, subjects]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a task title');
      return;
    }

    const success = onSave({
      title: title.trim(),
      subjectId: subjectId || (subjects[0]?.id || ''),
      type,
      priority,
      dueDate,
      estimatedMinutes: Number(estimatedMinutes) || 30,
      notes: notes.trim()
    });

    if (success !== false) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {editingTask ? 'Edit Task / Assignment' : 'Add New Task'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Track homework, exam revisions, and deadlines
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 text-xs font-semibold rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
              {error}
            </div>
          )}

          {/* Task Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Task Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Complete Lab Report 3, Revise Chapter 4..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              autoFocus
            />
          </div>

          {/* Subject Dropdown & Task Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Subject
              </label>
              <div className="relative">
                <BookOpen className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <select
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
                >
                  {subjects.length === 0 && (
                    <option value="">No subjects yet (add one first)</option>
                  )}
                  {subjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
              >
                {taskTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Priority & Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Priority
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {priorities.map((p) => {
                  const isSelected = priority === p;
                  let selectedStyle = 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300';
                  if (isSelected) {
                    if (p === 'High') selectedStyle = 'bg-rose-500 text-white border-rose-500 shadow-sm';
                    else if (p === 'Medium') selectedStyle = 'bg-amber-500 text-white border-amber-500 shadow-sm';
                    else selectedStyle = 'bg-slate-600 text-white border-slate-600 shadow-sm';
                  }

                  return (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setPriority(p)}
                      className={`py-2 text-xs font-bold rounded-xl border text-center transition-all ${selectedStyle}`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Due Date
              </label>
              <div className="relative">
                <CalendarDays className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Notes / Key Instructions (Optional)
            </label>
            <textarea
              rows="2"
              placeholder="e.g. Include citations, practice questions 1-15, minimum 500 words..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-md shadow-purple-500/20 active:scale-95 transition-all"
            >
              {editingTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
