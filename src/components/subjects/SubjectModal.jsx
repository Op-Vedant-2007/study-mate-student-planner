import React, { useState, useEffect } from 'react';
import { X, BookOpen, Clock, Tag, FileText, Palette } from 'lucide-react';
import { colorPalette } from '../../data/sampleData';

export default function SubjectModal({ isOpen, onClose, onSave, editingSubject }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [targetHours, setTargetHours] = useState(6);
  const [color, setColor] = useState('#3B82F6');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingSubject) {
      setName(editingSubject.name || '');
      setCode(editingSubject.code || '');
      setTargetHours(editingSubject.targetHours || 6);
      setColor(editingSubject.color || '#3B82F6');
      setDescription(editingSubject.description || '');
    } else {
      setName('');
      setCode('');
      setTargetHours(6);
      setColor('#3B82F6');
      setDescription('');
    }
    setError('');
  }, [editingSubject, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a subject name');
      return;
    }

    const success = onSave({
      name,
      code,
      targetHours: Number(targetHours) || 1,
      color,
      description
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
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {editingSubject ? 'Edit Subject' : 'Add New Subject'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage subject details and study goals
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 text-xs font-semibold rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
              {error}
            </div>
          )}

          {/* Subject Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Subject Name *
            </label>
            <div className="relative">
              <BookOpen className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="e.g. Operating Systems, Mathematics"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                autoFocus
              />
            </div>
          </div>

          {/* Course Code & Target Weekly Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Course Code (Optional)
              </label>
              <div className="relative">
                <Tag className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. CS301"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Weekly Target (Hours)
              </label>
              <div className="relative">
                <Clock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  min="1"
                  max="40"
                  value={targetHours}
                  onChange={(e) => setTargetHours(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Color Picker Palette */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Color Tag
            </label>
            <div className="flex flex-wrap items-center gap-2.5">
              {colorPalette.map((c) => (
                <button
                  type="button"
                  key={c.hex}
                  onClick={() => setColor(c.hex)}
                  className={`w-7 h-7 rounded-full transition-transform ${
                    color === c.hex ? 'scale-125 ring-2 ring-offset-2 ring-slate-400 dark:ring-offset-slate-800' : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Description / Syllabus Notes (Optional)
            </label>
            <div className="relative">
              <textarea
                rows="3"
                placeholder="Brief summary of modules, textbooks, or exam dates..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
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
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              {editingSubject ? 'Save Changes' : 'Add Subject'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
