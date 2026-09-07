import React, { useState } from 'react';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Calendar,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  Bell,
  CheckCircle2,
  ChevronDown,
  Shield,
  BookOpen,
  FileQuestion,
  Award,
  Layers,
} from 'lucide-react';
import useAuthStore, { UserRole } from '../../store/auth';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/Badge';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: string;
}

const adminNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'User Directory', href: '/admin/users' },
  { icon: Calendar, label: 'Exam Timetable', href: '/admin/schedule' },
  { icon: BarChart3, label: 'Institutional Analytics', href: '/admin/analytics' },
];

const teacherNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/teacher' },
  { icon: FileQuestion, label: 'Assessments & Quizzes', href: '/teacher/quizzes' },
  { icon: Users, label: 'Student Cohort', href: '/teacher/students' },
  { icon: BarChart3, label: 'Class Analytics', href: '/teacher/analytics' },
];

const studentNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/student' },
  { icon: BookOpen, label: 'My Assessments', href: '/student/quizzes', badge: '1 Due' },
  { icon: Award, label: 'Academic Progress', href: '/student/progress' },
];

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [academicTerm, setAcademicTerm] = useState('Fall Term 2026');

  const { user, logout, loginAsDemo } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const navItems =
    user.role === 'admin'
      ? adminNavItems
      : user.role === 'teacher'
      ? teacherNavItems
      : studentNavItems;

  const handleSwitchRole = (newRole: UserRole) => {
    loginAsDemo(newRole);
    setIsProfileMenuOpen(false);
    navigate(`/${newRole}`);
  };

  const getBreadcrumbs = () => {
    const parts = location.pathname.split('/').filter(Boolean);
    if (parts.length === 0) return ['Portal'];
    return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1));
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Mobile Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs transition-opacity lg:hidden',
          isSidebarOpen ? 'block' : 'hidden'
        )}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar Navigation */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white transition-all duration-300 lg:static',
          isCollapsed ? 'w-20' : 'w-64',
          !isSidebarOpen && '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4">
          <Link
            to={`/${user.role}`}
            className="flex items-center gap-2.5 overflow-hidden"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <GraduationCap className="h-6 w-6" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 tracking-tight leading-none">
                  AssessPRO
                </span>
                <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase mt-1">
                  University Edition
                </span>
              </div>
            )}
          </Link>

          {/* Close for mobile */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Role Badge Indicator */}
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
          {!isCollapsed ? (
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Portal Scope
              </span>
              <Badge
                variant={
                  user.role === 'admin'
                    ? 'danger'
                    : user.role === 'teacher'
                    ? 'success'
                    : 'info'
                }
                size="sm"
                dot
              >
                {user.role.toUpperCase()}
              </Badge>
            </div>
          ) : (
            <div className="flex justify-center">
              <Shield className="h-4 w-4 text-indigo-600" />
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsSidebarOpen(false)}
                title={isCollapsed ? item.label : undefined}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                )}
              >
                <item.icon
                  className={cn(
                    'h-5 w-5 shrink-0 transition-colors',
                    isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                  )}
                />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
                {!isCollapsed && item.badge && (
                  <span className="ml-auto rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Sidebar Toggle (Desktop) */}
        <div className="hidden lg:flex border-t border-slate-100 p-3 justify-end">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="flex items-center justify-center w-full py-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 text-xs transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <div className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
                <span>Collapse Sidebar</span>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <div className="flex flex-1 flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 shadow-xs">
          {/* Mobile hamburger & Breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open sidebar"
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Breadcrumb Trail */}
            <nav aria-label="Breadcrumbs" className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="text-slate-400">Portal</span>
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb}>
                  <span className="text-slate-300">/</span>
                  <span
                    className={
                      idx === breadcrumbs.length - 1
                        ? 'text-slate-900 font-semibold'
                        : 'text-slate-600'
                    }
                  >
                    {crumb}
                  </span>
                </React.Fragment>
              ))}
            </nav>
          </div>

          {/* Right Top Header Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Academic Term Selector */}
            <div className="hidden md:flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <select
                value={academicTerm}
                onChange={(e) => setAcademicTerm(e.target.value)}
                className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="Fall Term 2026">Fall Term 2026</option>
                <option value="Spring Term 2027">Spring Term 2027</option>
                <option value="Summer Term 2026">Summer Term 2026</option>
              </select>
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                aria-label="View notifications"
                className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white p-4 shadow-dropdown border border-slate-200 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900 uppercase">System Notices</span>
                    <span className="text-[10px] text-indigo-600 font-medium cursor-pointer">Mark all read</span>
                  </div>
                  <div className="mt-2 space-y-2 text-xs">
                    <div className="rounded-lg p-2 bg-indigo-50/60 text-slate-700">
                      <p className="font-semibold text-indigo-900">Midterm Exam Windows Open</p>
                      <p className="text-slate-500 mt-0.5">CS-301 Database Systems scheduled for today at 10:00 AM.</p>
                    </div>
                    <div className="rounded-lg p-2 bg-amber-50/60 text-slate-700">
                      <p className="font-semibold text-amber-900">Academic Integrity Alert</p>
                      <p className="text-slate-500 mt-0.5">2 candidate session flags logged in Algorithms test.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-slate-200" />

            {/* User Profile & Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                aria-expanded={isProfileMenuOpen}
                className="flex items-center gap-2.5 rounded-lg p-1.5 text-left hover:bg-slate-100 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200">
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div className="hidden text-left sm:block">
                  <div className="text-xs font-semibold text-slate-900 leading-tight">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-slate-500 leading-tight capitalize">
                    {user.role} • {user.department ? user.department.split(' ')[0] : 'Faculty'}
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>

              {/* Profile Menu Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-dropdown border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    <div className="mt-1.5">
                      <Badge variant="brand" size="sm">
                        {user.role.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  {/* Switch Role Fast-Action */}
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Switch Role (Demo Mode)
                    </p>
                    <div className="space-y-1">
                      {(['admin', 'teacher', 'student'] as UserRole[]).map((r) => (
                        <button
                          key={r}
                          onClick={() => handleSwitchRole(r)}
                          className={cn(
                            'flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs transition-colors',
                            user.role === r
                              ? 'bg-indigo-50 font-semibold text-indigo-700'
                              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                          )}
                        >
                          <span className="capitalize">{r} Portal</span>
                          {user.role === r && <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sign out */}
                  <div className="pt-1">
                    <button
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Surface */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}