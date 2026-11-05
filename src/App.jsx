import React, { useState } from 'react';
import { useStudy } from './context/StudyContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Toast from './components/layout/Toast';

// Views
import DashboardView from './components/dashboard/DashboardView';
import SubjectManagerView from './components/subjects/SubjectManagerView';
import TimetableView from './components/timetable/TimetableView';
import TaskManagerView from './components/tasks/TaskManagerView';
import ProgressTrackerView from './components/progress/ProgressTrackerView';
import PomodoroTimerView from './components/pomodoro/PomodoroTimerView';
import SettingsView from './components/settings/SettingsView';

// Modals
import QuickActionModal from './components/dashboard/QuickActionModal';
import TaskModal from './components/tasks/TaskModal';
import SessionModal from './components/timetable/SessionModal';
import SubjectModal from './components/subjects/SubjectModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Quick Action Modal State
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);

  // Dedicated Modals
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);

  const { addTask, addSession, addSubject } = useStudy();

  const handleSelectQuickAction = (actionId) => {
    if (actionId === 'task') {
      setIsTaskModalOpen(true);
    } else if (actionId === 'session') {
      setIsSessionModalOpen(true);
    } else if (actionId === 'subject') {
      setIsSubjectModalOpen(true);
    } else if (actionId === 'pomodoro') {
      setActiveTab('pomodoro');
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 antialiased font-sans transition-colors duration-200">
      {/* Toast Notifications */}
      <Toast />

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Top Header */}
        <Header
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenQuickAction={() => setIsQuickActionOpen(true)}
        />

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenTaskModal={() => setIsTaskModalOpen(true)}
              onOpenSessionModal={() => setIsSessionModalOpen(true)}
              onOpenSubjectModal={() => setIsSubjectModalOpen(true)}
            />
          )}

          {activeTab === 'subjects' && (
            <SubjectManagerView
              onOpenAddSubject={() => setIsSubjectModalOpen(true)}
              isModalOpen={isSubjectModalOpen}
              setIsModalOpen={setIsSubjectModalOpen}
            />
          )}

          {activeTab === 'timetable' && (
            <TimetableView
              isModalOpen={isSessionModalOpen}
              setIsModalOpen={setIsSessionModalOpen}
            />
          )}

          {activeTab === 'tasks' && (
            <TaskManagerView
              isModalOpen={isTaskModalOpen}
              setIsModalOpen={setIsTaskModalOpen}
            />
          )}

          {activeTab === 'progress' && <ProgressTrackerView />}

          {activeTab === 'pomodoro' && <PomodoroTimerView />}

          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Global Quick Action Modal */}
      <QuickActionModal
        isOpen={isQuickActionOpen}
        onClose={() => setIsQuickActionOpen(false)}
        onSelectAction={handleSelectQuickAction}
      />

      {/* Standalone Modals (Triggerable from Quick Action & Dashboard) */}
      <TaskModal
        isOpen={isTaskModalOpen && activeTab !== 'tasks'}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={(taskData) => addTask(taskData)}
      />

      <SessionModal
        isOpen={isSessionModalOpen && activeTab !== 'timetable'}
        onClose={() => setIsSessionModalOpen(false)}
        onSave={(sessionData) => addSession(sessionData)}
      />

      <SubjectModal
        isOpen={isSubjectModalOpen && activeTab !== 'subjects'}
        onClose={() => setIsSubjectModalOpen(false)}
        onSave={(subjectData) => addSubject(subjectData)}
      />
    </div>
  );
}
