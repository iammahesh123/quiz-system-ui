import { useState } from 'react';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Calendar,
  GraduationCap,
  Layout,
  LogOut,
  Menu,
  Users,
  X,
} from 'lucide-react';
import useAuthStore from '../../store/auth';
import { cn } from '../../lib/utils';

const adminNavItems = [
  { icon: Layout, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: Calendar, label: 'Schedule', href: '/admin/schedule' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
];

const teacherNavItems = [
  { icon: Layout, label: 'Dashboard', href: '/teacher' },
  { icon: Users, label: 'Students', href: '/teacher/students' },
  { icon: Calendar, label: 'Quizzes', href: '/teacher/quizzes' },
  { icon: BarChart3, label: 'Analytics', href: '/teacher/analytics' },
];

const studentNavItems = [
  { icon: Layout, label: 'Dashboard', href: '/student' },
  { icon: Calendar, label: 'My Quizzes', href: '/student/quizzes' },
  { icon: BarChart3, label: 'My Progress', href: '/student/progress' },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  console.log('User:', user); // Debugging log

  if (!user) {
    console.log('No user found. Redirecting to home page.'); // Debugging log
    return <Navigate to="/" replace />;
  }

  const navItems =
    user.role === 'admin'
      ? adminNavItems
      : user.role === 'teacher'
      ? teacherNavItems
      : studentNavItems;

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Mobile sidebar overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-gray-900/80 lg:hidden',
          sidebarOpen ? 'block' : 'hidden'
        )}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 transform bg-white transition-transform lg:static lg:translate-x-0',
          !sidebarOpen && '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <GraduationCap className="h-8 w-8 text-indigo-600" />
          <span className="text-xl font-semibold">Quiz System</span>
          <button
            className="ml-auto rounded-lg p-1 hover:bg-gray-100 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="space-y-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100',
                location.pathname === item.href && 'bg-indigo-50 text-indigo-600'
              )}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      {/* Main content */}
      <div className="flex flex-col flex-1 h-screen">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-white px-6">
          <button
            className="rounded-lg p-1 hover:bg-gray-100 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
      
          <div className="ml-auto flex items-center gap-4">
            <div className="text-sm">
              <div className="font-medium">{user.email}</div>
              <div className="text-gray-600">{user.role}</div>
            </div>
            <button
              onClick={() => {
                console.log('Logging out...'); // Debugging log
                logout();
                navigate('/');
              }}
              className="rounded-lg p-1 hover:bg-gray-100"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Main panel */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}