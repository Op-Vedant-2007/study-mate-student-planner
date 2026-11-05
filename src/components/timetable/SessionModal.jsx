import React, { useState, useEffect } from 'react';
import { X, CalendarDays, Clock, BookOpen, AlignLeft } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';
import { getFormattedDate } from '../../data/sampleData';

export default function SessionModal({ isOpen, onClose, onSave, editingSession }) {
  const { subjects } = useStudy();

  const [subjectId, setSubjectId] = useState('');
  const [date, setDate] = useState(getFormattedDate(0));
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:30');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingSession) {
      setSubjectId(editingSession.subjectId || (subjects[0]?.id || ''));
      setDate(editingSession.date || getFormattedDate(0));
      setStartTime(editingSession.startTime || '09:00');
      setEndTime(editingSession.endTime || '10:30');
      setDescription(editingSession.description || '');
    } else {
      setSubjectId(subjects[0]?.id || '');
      setDate(getFormattedDate(0));
      setStartTime('09:00');
      setEndTime('10:30');
      setDescription('');
    }
    setError('');
  }, [editingSession, isOpen, subjects]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subjectId) {
      setError('Please select a subject');
      return;
    }
    if (!startTime || !endTime) {
      setError('Please specify both start and end times');
      return;
    }
    if (startTime >= endTime) {
      setError('End time must be later than start time');
      return;
    }

    const success = onSave({
      subjectId,
      date,
      startTime,
      endTime,
      description: description.trim()
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
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {editingSession ? 'Edit Study Session' : 'Schedule Study Session'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Plan a timetable slot for focused learning
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

          {/* Subject Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Select Subject *
            </label>
            <div className="relative">
              <BookOpen className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
              >
                {subjects.length === 0 && (
                  <option value="">No subjects available (Add a subject first)</option>
                )}
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name} {sub.code ? `(${sub.code})` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Session Date *
            </label>
            <div className="relative">
              <CalendarDays className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Start and End Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Start Time *
              </label>
              <div className="relative">
                <Clock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                End Time *
              </label>
              <div className="relative">
                <Clock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => {
                    setEndTime(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Description / Topic */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Topic / Goals
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Chapter 3: Dynamic Programming examples"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
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
              disabled={subjects.length === 0}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              {editingSession ? 'Save Changes' : 'Schedule Session'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
