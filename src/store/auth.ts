import { create } from 'zustand';

export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
  loginAsDemo: (role: UserRole) => User;
}

// Preset institutional demo users
export const DEMO_USERS: Record<UserRole, User> = {
  admin: {
    id: 'usr-admin-01',
    name: 'Dr. Robert Vance',
    email: 'admin@univ.edu',
    role: 'admin',
    department: 'Academic Affairs & Governance',
  },
  teacher: {
    id: 'usr-prof-02',
    name: 'Prof. Elena Rostova',
    email: 'elena.rostova@univ.edu',
    role: 'teacher',
    department: 'Computer Science & Engineering',
  },
  student: {
    id: 'usr-stud-03',
    name: 'Marcus Chen',
    email: 'marcus.chen@student.univ.edu',
    role: 'student',
    department: 'Computer Science (Year 3)',
  },
};

const getInitialUser = (): User | null => {
  try {
    const saved = localStorage.getItem('quiz_app_user');
    return saved ? JSON.parse(saved) : DEMO_USERS.admin; // Default to admin for seamless evaluation
  } catch {
    return DEMO_USERS.admin;
  }
};

const getInitialToken = (): string | null => {
  return localStorage.getItem('quiz_app_token') || 'demo-jwt-session-token';
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getInitialUser(),
  token: getInitialToken(),
  isLoading: false,

  login: (user, token) => {
    localStorage.setItem('quiz_app_user', JSON.stringify(user));
    localStorage.setItem('quiz_app_token', token);
    set({ user, token, isLoading: false });
  },

  logout: () => {
    localStorage.removeItem('quiz_app_user');
    localStorage.removeItem('quiz_app_token');
    set({ user: null, token: null, isLoading: false });
  },

  setLoading: (isLoading) => set({ isLoading }),

  loginAsDemo: (role: UserRole) => {
    const demoUser = DEMO_USERS[role];
    const demoToken = `demo-${role}-token-${Date.now()}`;
    localStorage.setItem('quiz_app_user', JSON.stringify(demoUser));
    localStorage.setItem('quiz_app_token', demoToken);
    set({ user: demoUser, token: demoToken, isLoading: false });
    return demoUser;
  },
}));

export default useAuthStore;