import React, { useState, useEffect, useRef } from 'react';
import { useStudy } from '../../context/StudyContext';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  Bell, 
  BookOpen, 
  Coffee, 
  Flame, 
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';

export default function PomodoroTimerView() {
  const { subjects, recordCompletedPomodoro, showToast } = useStudy();

  // Modes: 'focus' (25m), 'shortBreak' (5m), 'longBreak' (15m)
  const [mode, setMode] = useState('focus');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Time in seconds
  const modeTimes = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  };

  const [timeLeft, setTimeLeft] = useState(modeTimes.focus);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  // Set default subject
  useEffect(() => {
    if (subjects.length > 0 && !selectedSubjectId) {
      setSelectedSubjectId(subjects[0].id);
    }
  }, [subjects, selectedSubjectId]);

  // Web Audio API Synthesizer Chime
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const playTone = (freq, startTime, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.3, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      const now = ctx.currentTime;
      playTone(523.25, now, 0.4);       // C5
      playTone(659.25, now + 0.15, 0.4); // E5
      playTone(783.99, now + 0.3, 0.6);  // G5
      playTone(1046.50, now + 0.45, 0.8);// C6
    } catch (e) {
      console.log('Audio chime error:', e);
    }
  };

  // Timer Tick
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsActive(false);
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, mode, selectedSubjectId]);

  const handleTimerComplete = () => {
    playChime();
    if (mode === 'focus') {
      recordCompletedPomodoro(selectedSubjectId, 25);
      showToast('Pomodoro Focus session complete! Time for a short break ☕');
      switchMode('shortBreak');
    } else {
      showToast('Break finished! Ready to focus again? 🚀', 'info');
      switchMode('focus');
    }
  };

  const switchMode = (newMode) => {
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(modeTimes[newMode]);
  };

  const toggleStartPause = () => {
    setIsActive((prev) => !prev);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(modeTimes[mode]);
  };

  const skipTimer = () => {
    setIsActive(false);
    if (mode === 'focus') {
      switchMode('shortBreak');
    } else {
      switchMode('focus');
    }
  };

  // Format MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Progress percentage
  const totalDuration = modeTimes[mode];
  const progressPercent = ((totalDuration - timeLeft) / totalDuration) * 100;
  const strokeDashoffset = 100 - progressPercent;

  const currentSubject = subjects.find((s) => s.id === selectedSubjectId);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-3xl mx-auto">
      {/* Top Header */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Pomodoro Study Timer
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Stay hyper-focused using 25-minute intervals with disciplined recovery breaks.
        </p>
      </div>

      {/* Main Timer Container */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 p-6 sm:p-10 shadow-card flex flex-col items-center relative overflow-hidden">
        {/* Background glow */}
        <div
          className={`absolute top-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700 ${
            mode === 'focus' ? 'bg-purple-500' : 'bg-emerald-500'
          }`}
        />

        {/* Mode Selector Tabs */}
        <div className="flex items-center p-1.5 bg-slate-100 dark:bg-slate-700/60 rounded-2xl text-xs sm:text-sm font-semibold mb-8 z-10">
          <button
            onClick={() => switchMode('focus')}
            className={`px-4 sm:px-6 py-2 rounded-xl transition-all ${
              mode === 'focus'
                ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-md font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            25m Focus
          </button>
          <button
            onClick={() => switchMode('shortBreak')}
            className={`px-4 sm:px-6 py-2 rounded-xl transition-all ${
              mode === 'shortBreak'
                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-md font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            5m Short Break
          </button>
          <button
            onClick={() => switchMode('longBreak')}
            className={`px-4 sm:px-6 py-2 rounded-xl transition-all ${
              mode === 'longBreak'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-md font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            15m Long Break
          </button>
        </div>

        {/* Circular Countdown Display */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center z-10 mb-8">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-slate-100 dark:stroke-slate-700/50"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Animated progress ring */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className={`transition-all duration-1000 ${
                mode === 'focus'
                  ? 'stroke-purple-600 dark:stroke-purple-400'
                  : 'stroke-emerald-500 dark:stroke-emerald-400'
              }`}
              strokeWidth="6"
              strokeDasharray="276.46"
              strokeDashoffset={(276.46 * strokeDashoffset) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Time text centered */}
          <div className="absolute flex flex-col items-center">
            <span className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
              {timeFormatted}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-2 flex items-center gap-1.5">
              {mode === 'focus' ? (
                <>
                  <Flame className="w-3.5 h-3.5 text-purple-500" />
                  Focus Mode
                </>
              ) : (
                <>
                  <Coffee className="w-3.5 h-3.5 text-emerald-500" />
                  Break Time
                </>
              )}
            </span>
          </div>
        </div>

        {/* Controls: Play/Pause, Reset, Skip */}
        <div className="flex items-center gap-4 z-10 mb-6">
          <button
            onClick={resetTimer}
            title="Reset Timer"
            className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all active:scale-95"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={toggleStartPause}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-base shadow-lg transition-all active:scale-95 ${
              mode === 'focus'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-purple-500/25'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-500/25'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5 fill-white" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-white" />
                <span>{timeLeft === modeTimes[mode] ? 'Start Session' : 'Resume'}</span>
              </>
            )}
          </button>

          <button
            onClick={skipTimer}
            title="Skip to next"
            className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all active:scale-95"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Subject Assignment & Sound Toggle Bar */}
        <div className="w-full max-w-md pt-6 border-t border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
          {/* Link to subject */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <BookOpen className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
            >
              <option value="">General Study (No Subject)</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  Log to: {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sound alert toggle */}
          <button
            onClick={() => setSoundEnabled((prev) => !prev)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-purple-600" />
                <span>Sound On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span>Muted</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Pomodoro Technique Pro-Tips Card */}
      <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 p-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          How to use Pomodoro for academic success:
        </h4>
        <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
          <li>Choose a specific chapter, lecture note, or assignment question before starting.</li>
          <li>Silence your phone notifications and eliminate desktop distractions for 25 minutes.</li>
          <li>When the bell chimes, step away from your desk, stretch, and drink a glass of water.</li>
          <li>After completing 4 focus blocks, reward yourself with a restorative 15-minute break.</li>
        </ul>
      </div>
    </div>
  );
}
