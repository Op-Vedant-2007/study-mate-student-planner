import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import { 
  CalendarDays, 
  Plus, 
  Clock, 
  CheckCircle2, 
  Circle, 
  Edit2, 
  Trash2, 
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { getFormattedDate } from '../../data/sampleData';
import SessionModal from './SessionModal';

export default function TimetableView({ isModalOpen, setIsModalOpen }) {
  const { 
    sessions, 
    subjects, 
    addSession, 
    updateSession, 
    deleteSession, 
    toggleSession 
  } = useStudy();

  const [selectedDate, setSelectedDate] = useState(getFormattedDate(0));
  const [filterMode, setFilterMode] = useState('selected'); // 'selected' | 'all'
  const [editingSession, setEditingSession] = useState(null);

  const getSubject = (id) => subjects.find((s) => s.id === id);

  // Filtered sessions
  const displaySessions = (
    filterMode === 'all'
      ? sessions
      : sessions.filter((s) => s.date === selectedDate)
  ).sort((a, b) => a.startTime.localeCompare(b.startTime));

  // Change date by offset
  const changeDateBy = (days) => {
    const current = new Date(selectedDate);
    current.setDate(current.getDate() + days);
    setSelectedDate(current.toISOString().split('T')[0]);
  };

  const handleEdit = (session) => {
    setEditingSession(session);
    setIsModalOpen(true);
  };

  const handleSave = (sessionData) => {
    if (editingSession) {
      return updateSession(editingSession.id, sessionData);
    } else {
      return addSession(sessionData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSession(null);
  };

  // Format header display date
  const dateObj = new Date(selectedDate + 'T00:00:00');
  const formattedDayStr = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  const isToday = selectedDate === getFormattedDate(0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Study Timetable
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Plan daily study sessions, assign subjects, and track your focus hours.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingSession(null);
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Session</span>
        </button>
      </div>

      {/* Date Navigator Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Day switch controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
          <button
            onClick={() => changeDateBy(-1)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="text-center min-w-[180px]">
            <span className="text-sm font-bold text-slate-900 dark:text-white block">
              {formattedDayStr}
            </span>
            <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
              {isToday ? "Today's Schedule" : selectedDate}
            </span>
          </div>

          <button
            onClick={() => changeDateBy(1)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Quick Today Jump */}
          {!isToday && (
            <button
              onClick={() => setSelectedDate(getFormattedDate(0))}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 hover:bg-blue-100"
            >
              Today
            </button>
          )}
        </div>

        {/* View Mode & Date picker */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-700/50 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setFilterMode('selected')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterMode === 'selected'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Daily View
            </button>
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterMode === 'all'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              All Sessions ({sessions.length})
            </button>
          </div>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setFilterMode('selected');
            }}
            className="text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Sessions Timeline List */}
      {displaySessions.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-12 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
            <CalendarDays className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No study sessions for {isToday ? 'today' : formattedDayStr}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1">
            Build your study routine! Add sessions to set aside dedicated time for your courses.
          </p>
          <button
            onClick={() => {
              setEditingSession(null);
              setIsModalOpen(true);
            }}
            className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Session for {selectedDate}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {displaySessions.map((session) => {
            const subject = getSubject(session.subjectId);
            return (
              <div
                key={session.id}
                className={`bg-white dark:bg-slate-800 rounded-2xl border p-4 sm:p-5 shadow-subtle hover:shadow-card transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  session.completed
                    ? 'border-emerald-200/80 dark:border-emerald-900/50 bg-emerald-50/20 dark:bg-emerald-950/10'
                    : 'border-slate-200/80 dark:border-slate-700/80'
                }`}
              >
                <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                  {/* Complete Toggle */}
                  <button
                    onClick={() => toggleSession(session.id)}
                    title={session.completed ? 'Mark pending' : 'Mark completed'}
                    className="p-1 rounded-xl text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mt-0.5 sm:mt-0"
                  >
                    {session.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="w-6 h-6 shrink-0" />
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      {subject ? (
                        <span
                          className="text-xs font-bold px-2.5 py-0.5 rounded-md text-white shadow-xs"
                          style={{ backgroundColor: subject.color }}
                        >
                          {subject.name} {subject.code ? `(${subject.code})` : ''}
                        </span>
                      ) : (
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-200 text-slate-700">
                          General Study
                        </span>
                      )}

                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-500" />
                        {session.startTime} - {session.endTime}
                      </span>

                      <span className="text-[11px] font-semibold text-slate-400">
                        ({session.durationMinutes} minutes)
                      </span>

                      {filterMode === 'all' && (
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-md">
                          Date: {session.date}
                        </span>
                      )}
                    </div>

                    <p className={`text-sm ${session.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'} font-medium`}>
                      {session.description || 'Focused study and assignment review'}
                    </p>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  {session.completed && (
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Hours Logged
                    </span>
                  )}

                  <button
                    onClick={() => handleEdit(session)}
                    title="Edit Session"
                    className="p-2 rounded-xl text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => deleteSession(session.id)}
                    title="Delete Session"
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Add / Edit */}
      <SessionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        editingSession={editingSession}
      />
    </div>
  );
}
