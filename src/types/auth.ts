export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface Department {
  id: string;
  name: string;
  createdAt: Date;
}

export interface Branch {
  id: string;
  name: string;
  departmentId: string;
  createdAt: Date;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  duration: number;
  startTime: Date;
  endTime: Date;
  createdBy: string;
  status: 'draft' | 'published' | 'completed';
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  score: number;
  startedAt: Date;
  completedAt?: Date;
  status: 'in-progress' | 'completed' | 'abandoned';
}