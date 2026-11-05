# StudyMate – Student Study Planner 🎓

A modern, responsive, and intuitive web application designed to help students organize daily study schedules, manage subjects, track assignments, and monitor academic progress.

---

## 🚀 Live Local Application
The application is currently running at:
- **Local URL:** `http://localhost:3000/`

To restart or run the project in development mode:
```bash
npm run dev
```

To create an optimized production build:
```bash
npm run build
```

---

## 🛠️ Technology Stack
- **Frontend Framework:** React.js (Vite)
- **Styling:** Tailwind CSS (Modern soft blue, white, and purple aesthetic with responsive layouts)
- **Icons:** Lucide React (`lucide-react`)
- **Visual Rewards:** Canvas Confetti (`canvas-confetti`)
- **Audio Feedback:** Browser Web Audio API (Synthesizer bell chime for Pomodoro focus & break alerts)
- **Persistence:** Browser `localStorage` (Automatic state synchronization with zero setup)

---

## ✨ Key Features & Sections

### 1. 📊 Academic Dashboard
- Personalized greeting based on time of day (Good morning / afternoon / evening).
- Real-time today's date and academic stats:
  - **Total Subjects** enrolled.
  - **Tasks Pending** count.
  - **Tasks Completed** count.
  - **Today's Study Hours** logged.
- **Daily Progress Bar:** Dual progress bars displaying task completion rate and study hours vs daily target.
- **Upcoming Tasks Widget:** Quick checkbox completion for urgent tasks.
- **Today's Timetable Widget:** Live preview of scheduled slots with one-click completion.
- **Quick Action Launcher:** Fast modal to add tasks, timetable slots, subjects, or start a Pomodoro timer.

### 2. 📚 Subject Manager ("My Subjects")
- Add, view, edit, and delete academic courses and subjects.
- Subject properties:
  - Subject Name (e.g. *Computer Networks*, *Data Structures*, *Mathematics*, *Java Programming*).
  - Course Code (e.g. *CS301*, *CS202*).
  - Color palette tagging for quick visual recognition.
  - Weekly target study hours (e.g. 6 hrs/week).
  - Syllabus description / module notes.
- Real-time search filter by subject name, code, or description.
- Subject-level analytics showing total tasks and logged study hours.
- Safe deletion confirmation modal.

### 3. 🗓️ Study Timetable (Daily Schedule)
- Interactive daily timetable with date navigation (Previous day, Next day, Today jump, or custom date picker).
- Schedule study sessions with:
  - Subject selection.
  - Session date.
  - Start time & End time (with validation).
  - Topic / study goal.
- Direct session completion toggle that automatically logs study minutes to the subject's progress tracker.
- Toggle between **Daily View** and **All Sessions**.

### 4. 📝 Task and Assignment Manager
- Comprehensive task management for homework, assignments, and exam preparation.
- Filter tasks by:
  - **Status:** All, Pending, Completed.
  - **Subject:** Specific course filter.
  - **Priority:** High (Rose), Medium (Amber), Low (Slate).
  - **Search:** Instant keyword search across titles and notes.
- Visual status indicators for due dates (Due Today, Overdue, or upcoming).
- Instant confetti celebratory feedback upon task completion.

### 5. 📈 Progress Tracker & Analytics
- Visual KPI cards for completion rate, total tasks finished, active courses, and total logged study hours.
- **Subject-wise Study Hours Chart:** Comparative horizontal bar chart showing hours logged against weekly target goals.
- **Subject-wise Task Completion:** Progress bars tracking assignments completed per subject.
- **Student Milestones & Badges:** Unlocked achievements for reaching academic targets (First Step, Task Conqueror, Focused Scholar, Multi-Subject Master).

### 6. 🍅 Pomodoro Study Timer
- Science-backed 25-minute focus intervals and 5-minute / 15-minute restorative breaks.
- Large circular progress indicator with digital countdown display.
- Play, Pause, Resume, Reset, and Skip controls.
- **Subject Linking:** Choose which subject to study; completed sessions automatically record focus minutes in your study log!
- **Web Audio API Chime:** Pleasant synthesizer chime alert when focus or break sessions end (no external audio files needed).
- Sound mute toggle option.

### 7. ⚙️ Settings & Data Control
- **Theme Switcher:** Seamless toggle between crisp Light Mode and eye-friendly Dark Mode (persisted in LocalStorage).
- **Student Profile:** Customize student name, college/department, and daily target study hours.
- **Sample Data Loader:** One-click button to reload default sample data (Computer Networks, Data Structures, Mathematics, Java) for demonstrations and presentations.
- **Export Backup:** Download a full JSON backup of your planner data anytime.
- **Clear All Data:** Option to wipe data and start with a fresh slate.

---

## 📁 Project Structure
```
STUDENT SMART STUDY PLANNER/
├── index.html                     # Application entry HTML with Inter font
├── package.json                   # Dependencies and npm scripts
├── vite.config.js                 # Vite server configuration
├── tailwind.config.js             # Tailwind CSS theme and dark mode settings
├── postcss.config.js              # PostCSS plugins
├── src/
│   ├── main.jsx                   # React root with ThemeProvider & StudyProvider
│   ├── App.jsx                    # Navigation, layout structure, and modal coordinators
│   ├── index.css                  # Tailwind styles and custom animations
│   ├── context/
│   │   ├── StudyContext.jsx       # State management for subjects, tasks, timetable, logs
│   │   └── ThemeContext.jsx       # Dark / Light theme toggle & localStorage sync
│   ├── data/
│   │   └── sampleData.js          # Default sample subjects, tasks, and color palette
│   └── components/
│       ├── layout/
│       │   ├── Sidebar.jsx        # Navigation sidebar with responsive mobile drawer
│       │   ├── Header.jsx         # Top greeting, quick add, and theme toggle
│       │   └── Toast.jsx          # Notification toast system
│       ├── dashboard/
│       │   ├── DashboardView.jsx  # Main academic overview
│       │   ├── StatCard.jsx       # Metric cards
│       │   ├── DailyProgressBar.jsx
│       │   ├── UpcomingTasksWidget.jsx
│       │   ├── TodayScheduleWidget.jsx
│       │   └── QuickActionModal.jsx
│       ├── subjects/
│       │   ├── SubjectManagerView.jsx
│       │   ├── SubjectCard.jsx
│       │   └── SubjectModal.jsx
│       ├── timetable/
│       │   ├── TimetableView.jsx
│       │   └── SessionModal.jsx
│       ├── tasks/
│       │   ├── TaskManagerView.jsx
│       │   └── TaskModal.jsx
│       ├── progress/
│       │   └── ProgressTrackerView.jsx
│       ├── pomodoro/
│       │   └── PomodoroTimerView.jsx
│       └── settings/
│           └── SettingsView.jsx
```
