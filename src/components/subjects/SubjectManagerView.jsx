import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import { Plus, Search, BookOpen, Layers } from 'lucide-react';
import SubjectCard from './SubjectCard';
import SubjectModal from './SubjectModal';

export default function SubjectManagerView({ onOpenAddSubject, isModalOpen, setIsModalOpen }) {
  const { subjects, addSubject, updateSubject } = useStudy();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingSubject, setEditingSubject] = useState(null);

  const filteredSubjects = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.code && s.code.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleEdit = (subject) => {
    setEditingSubject(subject);
    setIsModalOpen(true);
  };

  const handleSave = (subjectData) => {
    if (editingSubject) {
      return updateSubject(editingSubject.id, subjectData);
    } else {
      return addSubject(subjectData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSubject(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Subjects
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Organize your courses, track target hours, and view subject-level progress.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingSubject(null);
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Subject</span>
        </button>
      </div>

      {/* Search & Counter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search subjects by name or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-subtle transition-all"
          />
        </div>

        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-blue-500" />
          <span>Showing {filteredSubjects.length} of {subjects.length} subjects</span>
        </div>
      </div>

      {/* Grid of Subjects */}
      {filteredSubjects.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-12 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {searchQuery ? 'No matching subjects found' : 'No subjects added yet'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1">
            {searchQuery
              ? `No subjects match "${searchQuery}". Try a different keyword.`
              : 'Add your college courses, semester subjects, or syllabus topics to start organizing your study schedule.'}
          </p>
          {!searchQuery && (
            <button
              onClick={() => {
                setEditingSubject(null);
                setIsModalOpen(true);
              }}
              className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Subject</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSubjects.map((sub) => (
            <SubjectCard
              key={sub.id}
              subject={sub}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <SubjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        editingSubject={editingSubject}
      />
    </div>
  );
}
