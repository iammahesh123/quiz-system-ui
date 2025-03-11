import { create } from 'zustand';
import { Navigate, NavigateFunction } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
}

interface AuthState {
  user: User | null;
  fullName: string | null;
  token: string | null;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: (navigate?: NavigateFunction) => void;
  setLoading: (isLoading: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
  fullName: localStorage.getItem('fullName') || null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  login: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({ user, token, isLoading: false });
  },
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null, isLoading: false });
  },
  setLoading: (isLoading) => set({ isLoading }),
}));

export default useAuthStore;