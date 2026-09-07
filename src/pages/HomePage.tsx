import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  ShieldCheck,
  School,
  ArrowRight,
  Sparkles,
  Lock,
  BarChart2,
  Clock,
  CheckCircle,
} from 'lucide-react';
import useAuthStore, { UserRole } from '../store/auth';
import LoginModal from '../components/auth/LoginModal';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export default function HomePage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [modalDefaultRole, setModalDefaultRole] = useState<UserRole>('admin');
  const { loginAsDemo } = useAuthStore();
  const navigate = useNavigate();

  const handleLaunchRole = (role: UserRole) => {
    loginAsDemo(role);
    navigate(`/${role}`);
  };

  const handleOpenLogin = (role: UserRole = 'admin') => {
    setModalDefaultRole(role);
    setIsLoginModalOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans">
      {/* Institutional Topbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xs px-6 py-3.5 shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-900 tracking-tight">AssessPRO</span>
                <Badge variant="brand" size="sm">
                  Enterprise
                </Badge>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">University Assessment Management System</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs text-emerald-700 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Exam Engine Live (Fall Term 2026)</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOpenLogin('student')}
              className="hidden sm:inline-flex"
            >
              Candidate Portal
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => handleOpenLogin('admin')}
            >
              Institutional Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200 bg-gradient-to-b from-white via-indigo-50/20 to-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-200/80 px-3.5 py-1 text-xs font-semibold text-indigo-700">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Next-Generation Academic Assessment Platform</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl sm:leading-tight">
                High-Stakes University Testing, Authoring & Performance Insights
              </h1>

              <p className="text-base text-slate-600 sm:text-lg leading-relaxed max-w-2xl mx-auto">
                Comprehensive platform for department chairs, course professors, and candidates. Designed for high-volume exam scheduling, secure proctored testing, and rigorous psychometric analytics.
              </p>
            </div>

            {/* Instant Demo Role Selection Cards */}
            <div className="mt-12">
              <div className="text-center mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Instant Evaluator Access — Choose Any Persona To Launch
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl mx-auto">
                {/* Admin Card */}
                <div
                  onClick={() => handleLaunchRole('admin')}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-subtle hover:border-indigo-400 hover:shadow-card transition-all cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <ShieldCheck className="h-6 w-6" />
                      </div>
                      <Badge variant="brand" size="sm">
                        Governance
                      </Badge>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      University Administrator
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Oversee system-wide users, schedule campus examinations, resolve academic integrity flags, and audit institutional metrics.
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-indigo-600">
                    <span>Launch Admin Console</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Teacher Card */}
                <div
                  onClick={() => handleLaunchRole('teacher')}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-subtle hover:border-indigo-400 hover:shadow-card transition-all cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <School className="h-6 w-6" />
                      </div>
                      <Badge variant="success" size="sm">
                        Faculty
                      </Badge>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      Course Instructor
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Author quizzes with timing & shuffling rules, inspect student performance breakdowns, and analyze topic mastery trends.
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-emerald-700">
                    <span>Launch Faculty Hub</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Student Card */}
                <div
                  onClick={() => handleLaunchRole('student')}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-subtle hover:border-indigo-400 hover:shadow-card transition-all cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                      <Badge variant="info" size="sm">
                        Candidate
                      </Badge>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      Student Candidate
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Take scheduled and timed exams in a distraction-free workspace with autosave, review grades, and track academic growth.
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-blue-700">
                    <span>Launch Student Workspace</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Operational Highlights */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div className="p-6 rounded-xl bg-slate-50 border border-slate-100">
                <Clock className="h-8 w-8 text-indigo-600 mb-3" />
                <h4 className="text-sm font-bold text-slate-900">Distraction-Free Timed Exams</h4>
                <p className="mt-1 text-xs text-slate-500">
                  Full-screen exam workspace with persistent countdown, real-time autosave, and question palettes.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-slate-50 border border-slate-100">
                <Lock className="h-8 w-8 text-indigo-600 mb-3" />
                <h4 className="text-sm font-bold text-slate-900">Proctoring & Integrity Logs</h4>
                <p className="mt-1 text-xs text-slate-500">
                  Automated detection of tab switching, window blurring, and session anomalies with review workflows.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-slate-50 border border-slate-100">
                <BarChart2 className="h-8 w-8 text-indigo-600 mb-3" />
                <h4 className="text-sm font-bold text-slate-900">Psychometric Analytics</h4>
                <p className="mt-1 text-xs text-slate-500">
                  Class grade distributions, question discrimination index, and department-level competency tracking.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle className="h-8 w-8 text-indigo-600 mb-3" />
                <h4 className="text-sm font-bold text-slate-900">Bulk Operational Tools</h4>
                <p className="mt-1 text-xs text-slate-500">
                  High-density data tables, instant search, batch cohort role migration, and CSV grade exports.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-900 text-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-indigo-400" />
            <span className="text-sm font-bold text-slate-200">AssessPRO Quiz & Exam Management System</span>
          </div>
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} University Academic Computing. Built for enterprise assessment operations.
          </p>
        </div>
      </footer>

      {/* Sign-in Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        defaultRole={modalDefaultRole}
      />
    </div>
  );
}