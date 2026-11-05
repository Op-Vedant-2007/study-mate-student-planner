export const initialSubjects = [
  {
    id: "sub-1",
    name: "Computer Networks",
    code: "CS301",
    color: "#3B82F6", // Blue
    targetHours: 6,
    description: "OSI & TCP/IP models, routing protocols, socket programming and network security fundamentals."
  },
  {
    id: "sub-2",
    name: "Data Structures",
    code: "CS202",
    color: "#8B5CF6", // Purple
    targetHours: 8,
    description: "Linear and non-linear data structures, algorithms, Big-O complexity analysis and tree traversals."
  },
  {
    id: "sub-3",
    name: "Mathematics",
    code: "MTH104",
    color: "#06B6D4", // Cyan
    targetHours: 5,
    description: "Linear algebra, calculus, matrices, probability distributions and discrete mathematics."
  },
  {
    id: "sub-4",
    name: "Java Programming",
    code: "CS205",
    color: "#10B981", // Emerald
    targetHours: 7,
    description: "Object-oriented principles, multithreading, collections framework, and JVM internals."
  }
];

// Helper to get relative date string YYYY-MM-DD
export const getFormattedDate = (offsetDays = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split("T")[0];
};

export const initialTasks = [
  {
    id: "task-1",
    title: "Revise Computer Networks Unit 2",
    subjectId: "sub-1",
    type: "Revision",
    priority: "High",
    dueDate: getFormattedDate(0), // Today
    completed: false,
    estimatedMinutes: 60,
    notes: "Focus on sliding window protocols and Go-Back-N vs Selective Repeat algorithms."
  },
  {
    id: "task-2",
    title: "Complete Data Structures assignment",
    subjectId: "sub-2",
    type: "Assignment",
    priority: "High",
    dueDate: getFormattedDate(1), // Tomorrow
    completed: true,
    estimatedMinutes: 90,
    notes: "Implement binary search tree with insert, delete, and level-order traversal operations."
  },
  {
    id: "task-3",
    title: "Practice 20 mathematics questions",
    subjectId: "sub-3",
    type: "Exam Prep",
    priority: "Medium",
    dueDate: getFormattedDate(2),
    completed: false,
    estimatedMinutes: 75,
    notes: "Eigenvalues, eigenvectors, and diagonalizing symmetric matrices."
  },
  {
    id: "task-4",
    title: "Prepare Java programming notes",
    subjectId: "sub-4",
    type: "General Study",
    priority: "Low",
    dueDate: getFormattedDate(3),
    completed: false,
    estimatedMinutes: 45,
    notes: "Write clean examples of Java Stream API and Lambda Expressions."
  },
  {
    id: "task-5",
    title: "Data Structures quiz preparation",
    subjectId: "sub-2",
    type: "Exam Prep",
    priority: "High",
    dueDate: getFormattedDate(0), // Today
    completed: false,
    estimatedMinutes: 50,
    notes: "Review AVL tree rotations and Red-Black tree insertion cases."
  }
];

export const initialSessions = [
  {
    id: "ses-1",
    subjectId: "sub-1",
    date: getFormattedDate(0),
    startTime: "09:00",
    endTime: "10:30",
    description: "Network Layer Routing Protocols & IP Addressing",
    completed: true,
    durationMinutes: 90
  },
  {
    id: "ses-2",
    subjectId: "sub-2",
    date: getFormattedDate(0),
    startTime: "11:30",
    endTime: "13:00",
    description: "Trees and Graph Algorithms Hands-on Coding",
    completed: false,
    durationMinutes: 90
  },
  {
    id: "ses-3",
    subjectId: "sub-3",
    date: getFormattedDate(0),
    startTime: "16:00",
    endTime: "17:15",
    description: "Calculus problems & Differential Equations",
    completed: false,
    durationMinutes: 75
  },
  {
    id: "ses-4",
    subjectId: "sub-4",
    date: getFormattedDate(1),
    startTime: "10:00",
    endTime: "11:30",
    description: "Java Generics and Collections deep dive",
    completed: false,
    durationMinutes: 90
  }
];

export const colorPalette = [
  { name: "Blue", hex: "#3B82F6" },
  { name: "Purple", hex: "#8B5CF6" },
  { name: "Cyan", hex: "#06B6D4" },
  { name: "Emerald", hex: "#10B981" },
  { name: "Amber", hex: "#F59E0B" },
  { name: "Rose", hex: "#F43F5E" },
  { name: "Indigo", hex: "#6366F1" },
  { name: "Teal", hex: "#14B8A6" },
];
