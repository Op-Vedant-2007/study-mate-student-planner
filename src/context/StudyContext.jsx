import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialSubjects, initialTasks, initialSessions, getFormattedDate } from '../data/sampleData';
import confetti from 'canvas-confetti';

const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  // 1. Subjects State
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('studymate_subjects');
    return saved ? JSON.parse(saved) : initialSubjects;
  });

  // 2. Tasks State
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('studymate_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  // 3. Timetable Sessions State
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('studymate_sessions');
    return saved ? JSON.parse(saved) : initialSessions;
  });

  // 4. Study Logs (Minutes logged per subject & date)
  const [studyLogs, setStudyLogs] = useState(() => {
    const saved = localStorage.getItem('studymate_study_logs');
    if (saved) return JSON.parse(saved);
    // Initial sample study logs
    return [
      { id: 'log-1', subjectId: 'sub-1', date: getFormattedDate(0), minutes: 90, source: 'Timetable Session' },
      { id: 'log-2', subjectId: 'sub-2', date: getFormattedDate(-1), minutes: 60, source: 'Pomodoro' },
      { id: 'log-3', subjectId: 'sub-3', date: getFormattedDate(-1), minutes: 45, source: 'Study Session' },
      { id: 'log-4', subjectId: 'sub-4', date: getFormattedDate(-2), minutes: 75, source: 'Assignment Work' },
      { id: 'log-5', subjectId: 'sub-1', date: getFormattedDate(-3), minutes: 60, source: 'Pomodoro' },
      { id: 'log-6', subjectId: 'sub-2', date: getFormattedDate(-4), minutes: 90, source: 'Practice' },
    ];
  });

  // 5. User Profile
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('studymate_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Alex Morgan',
      college: 'Dept. of Computer Science & Engineering',
      dailyTargetHours: 4,
      avatarColor: '#3B82F6'
    };
  });

  // 6. Pomodoro Timer Stats
  const [pomodoroStats, setPomodoroStats] = useState(() => {
    const saved = localStorage.getItem('studymate_pomodoro_stats');
    return saved ? JSON.parse(saved) : {
      sessionsCompleted: 4,
      totalFocusMinutes: 100,
      todaySessions: 2
    };
  });

  // 7. Active Toast Notifications
  const [toasts, setToasts] = useState([]);

  // LocalStorage sync effects
  useEffect(() => {
    localStorage.setItem('studymate_subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('studymate_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('studymate_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('studymate_study_logs', JSON.stringify(studyLogs));
  }, [studyLogs]);

  useEffect(() => {
    localStorage.setItem('studymate_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('studymate_pomodoro_stats', JSON.stringify(pomodoroStats));
  }, [pomodoroStats]);

  // Toast Notification System
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // SUBJECT ACTIONS
  const addSubject = (subjectData) => {
    if (!subjectData.name || !subjectData.name.trim()) {
      showToast('Subject name cannot be empty', 'error');
      return false;
    }
    const newSub = {
      id: 'sub-' + Date.now(),
      name: subjectData.name.trim(),
      code: subjectData.code ? subjectData.code.trim().toUpperCase() : '',
      color: subjectData.color || '#3B82F6',
      targetHours: Number(subjectData.targetHours) || 5,
      description: subjectData.description ? subjectData.description.trim() : ''
    };
    setSubjects((prev) => [...prev, newSub]);
    showToast(`Subject "${newSub.name}" added successfully!`);
    return true;
  };

  const updateSubject = (id, updatedData) => {
    if (!updatedData.name || !updatedData.name.trim()) {
      showToast('Subject name cannot be empty', 'error');
      return false;
    }
    setSubjects((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? {
              ...sub,
              ...updatedData,
              name: updatedData.name.trim(),
              code: updatedData.code ? updatedData.code.trim().toUpperCase() : '',
              targetHours: Number(updatedData.targetHours) || sub.targetHours
            }
          : sub
      )
    );
    showToast('Subject updated successfully!');
    return true;
  };

  const deleteSubject = (id) => {
    const subToDelete = subjects.find((s) => s.id === id);
    setSubjects((prev) => prev.filter((s) => s.id !== id));
    // Also clean up or unassign tasks & sessions with this subject
    setTasks((prev) => prev.filter((t) => t.subjectId !== id));
    setSessions((prev) => prev.filter((s) => s.subjectId !== id));
    showToast(`Deleted subject "${subToDelete?.name || ''}"`);
  };

  // TASK ACTIONS
  const addTask = (taskData) => {
    if (!taskData.title || !taskData.title.trim()) {
      showToast('Task title cannot be empty', 'error');
      return false;
    }
    const newTask = {
      id: 'task-' + Date.now(),
      title: taskData.title.trim(),
      subjectId: taskData.subjectId || (subjects[0]?.id || ''),
      type: taskData.type || 'General Study',
      priority: taskData.priority || 'Medium',
      dueDate: taskData.dueDate || getFormattedDate(0),
      completed: false,
      estimatedMinutes: Number(taskData.estimatedMinutes) || 45,
      notes: taskData.notes ? taskData.notes.trim() : ''
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast(`Task "${newTask.title}" created successfully!`);
    return true;
  };

  const updateTask = (id, updatedData) => {
    if (!updatedData.title || !updatedData.title.trim()) {
      showToast('Task title cannot be empty', 'error');
      return false;
    }
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedData, title: updatedData.title.trim() } : t))
    );
    showToast('Task updated successfully!');
    return true;
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast('Task deleted successfully');
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          if (nextCompleted) {
            // Trigger confetti
            try {
              confetti({
                particleCount: 60,
                spread: 70,
                origin: { y: 0.7 },
                colors: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B']
              });
            } catch (e) {
              // Ignore if canvas confetti isn't supported
            }
            showToast(`Task completed! Great job! 🎉`);
          }
          return { ...t, completed: nextCompleted };
        }
        return t;
      })
    );
  };

  // TIMETABLE / SESSION ACTIONS
  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return 60;
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    const diff = (endH * 60 + endM) - (startH * 60 + startM);
    return diff > 0 ? diff : 60;
  };

  const addSession = (sessionData) => {
    if (!sessionData.startTime || !sessionData.endTime) {
      showToast('Please set both start and end time', 'error');
      return false;
    }
    if (sessionData.startTime >= sessionData.endTime) {
      showToast('End time must be after start time', 'error');
      return false;
    }

    const duration = calculateDuration(sessionData.startTime, sessionData.endTime);
    const newSession = {
      id: 'ses-' + Date.now(),
      subjectId: sessionData.subjectId || (subjects[0]?.id || ''),
      date: sessionData.date || getFormattedDate(0),
      startTime: sessionData.startTime,
      endTime: sessionData.endTime,
      description: sessionData.description ? sessionData.description.trim() : 'Study Session',
      completed: false,
      durationMinutes: duration
    };
    setSessions((prev) => [...prev, newSession]);
    showToast('Study session scheduled successfully!');
    return true;
  };

  const updateSession = (id, updatedData) => {
    if (updatedData.startTime >= updatedData.endTime) {
      showToast('End time must be after start time', 'error');
      return false;
    }
    const duration = calculateDuration(updatedData.startTime, updatedData.endTime);
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedData, durationMinutes: duration } : s))
    );
    showToast('Study session updated successfully!');
    return true;
  };

  const deleteSession = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    showToast('Study session deleted');
  };

  const toggleSession = (id) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextCompleted = !s.completed;
          if (nextCompleted) {
            // Log study minutes
            logStudyMinutes(s.subjectId, s.durationMinutes || 60, s.date, 'Timetable: ' + s.description);
            try {
              confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.8 },
                colors: ['#10B981', '#3B82F6']
              });
            } catch (e) {}
            showToast(`Session marked complete! ${s.durationMinutes} minutes logged. ⭐`);
          }
          return { ...s, completed: nextCompleted };
        }
        return s;
      })
    );
  };

  // LOG STUDY MINUTES
  const logStudyMinutes = (subjectId, minutes, date = getFormattedDate(0), source = 'Study Session') => {
    const newLog = {
      id: 'log-' + Date.now(),
      subjectId,
      date,
      minutes: Number(minutes) || 25,
      source
    };
    setStudyLogs((prev) => [newLog, ...prev]);
  };

  // POMODORO SESSION LOG
  const recordCompletedPomodoro = (subjectId, focusMinutes = 25) => {
    setPomodoroStats((prev) => ({
      sessionsCompleted: prev.sessionsCompleted + 1,
      totalFocusMinutes: prev.totalFocusMinutes + focusMinutes,
      todaySessions: prev.todaySessions + 1
    }));
    if (subjectId) {
      logStudyMinutes(subjectId, focusMinutes, getFormattedDate(0), 'Pomodoro Focus Session');
    }
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}
    showToast(`Pomodoro session finished! ${focusMinutes} mins logged! 🍅`);
  };

  // UPDATE PROFILE
  const updateProfile = (newProfile) => {
    setProfile((prev) => ({ ...prev, ...newProfile }));
    showToast('Profile & preferences saved!');
  };

  // RESET / SAMPLE DATA
  const resetToSampleData = () => {
    setSubjects(initialSubjects);
    setTasks(initialTasks);
    setSessions(initialSessions);
    setStudyLogs([
      { id: 'log-1', subjectId: 'sub-1', date: getFormattedDate(0), minutes: 90, source: 'Timetable Session' },
      { id: 'log-2', subjectId: 'sub-2', date: getFormattedDate(-1), minutes: 60, source: 'Pomodoro' },
      { id: 'log-3', subjectId: 'sub-3', date: getFormattedDate(-1), minutes: 45, source: 'Study Session' },
      { id: 'log-4', subjectId: 'sub-4', date: getFormattedDate(-2), minutes: 75, source: 'Assignment Work' },
      { id: 'log-5', subjectId: 'sub-1', date: getFormattedDate(-3), minutes: 60, source: 'Pomodoro' },
      { id: 'log-6', subjectId: 'sub-2', date: getFormattedDate(-4), minutes: 90, source: 'Practice' },
    ]);
    setPomodoroStats({
      sessionsCompleted: 4,
      totalFocusMinutes: 100,
      todaySessions: 2
    });
    showToast('Reset to default sample data! ✨');
  };

  const clearAllData = () => {
    setSubjects([]);
    setTasks([]);
    setSessions([]);
    setStudyLogs([]);
    setPomodoroStats({ sessionsCompleted: 0, totalFocusMinutes: 0, todaySessions: 0 });
    showToast('All data cleared. You can start fresh!', 'info');
  };

  // DERIVED STATS
  const todayDateStr = getFormattedDate(0);

  // Today's study hours from logs
  const todayStudyMinutes = studyLogs
    .filter((log) => log.date === todayDateStr)
    .reduce((sum, log) => sum + (Number(log.minutes) || 0), 0);
  const todayStudyHours = (todayStudyMinutes / 60).toFixed(1);

  // Total study hours
  const totalStudyMinutes = studyLogs.reduce((sum, log) => sum + (Number(log.minutes) || 0), 0);
  const totalStudyHours = (totalStudyMinutes / 60).toFixed(1);

  // Tasks counts
  const totalTasksCount = tasks.length;
  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const pendingTasksCount = totalTasksCount - completedTasksCount;
  const taskCompletionPercentage = totalTasksCount > 0
    ? Math.round((completedTasksCount / totalTasksCount) * 100)
    : 0;

  // Today's scheduled sessions
  const todaySessions = sessions.filter((s) => s.date === todayDateStr);

  return (
    <StudyContext.Provider
      value={{
        // Data
        subjects,
        tasks,
        sessions,
        studyLogs,
        profile,
        pomodoroStats,
        toasts,
        // Stats
        todayStudyHours,
        todayStudyMinutes,
        totalStudyHours,
        totalStudyMinutes,
        totalTasksCount,
        completedTasksCount,
        pendingTasksCount,
        taskCompletionPercentage,
        todaySessions,
        // Subject actions
        addSubject,
        updateSubject,
        deleteSubject,
        // Task actions
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        // Session actions
        addSession,
        updateSession,
        deleteSession,
        toggleSession,
        // Others
        logStudyMinutes,
        recordCompletedPomodoro,
        updateProfile,
        resetToSampleData,
        clearAllData,
        showToast,
        removeToast
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
};
