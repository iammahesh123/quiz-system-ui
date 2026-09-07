import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Calendar,
  BarChart3,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  FileQuestion,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export default function TeacherDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      name: 'Enrolled Students',
      value: '156',
      change: 'CS-301 & CS-401',
      icon: Users,
      href: '/teacher/students',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
    {
      name: 'Active Assessments',
      value: '4',
      change: '1 Due Today',
      icon: FileQuestion,
      href: '/teacher/quizzes',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      name: 'Submissions to Grade',
      value: '7',
      change: 'Short answers pending',
      icon: AlertCircle,
      href: '/teacher/quizzes',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      highlight: true,
    },
    {
      name: 'Cohort Mean Score',
      value: '78.5%',
      change: '+3.2% vs midterm',
      icon: BarChart3,
      href: '/teacher/analytics',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
  ];

  const recentQuizzes = [
    {
      id: 'quiz-1',
      title: 'CS-301: Relational Schema & Normalization',
      course: 'Database Management',
      dueDate: 'Today at 5:00 PM',
      participants: 45,
      total: 48,
      avgScore: 82,
      status: 'active',
    },
    {
      id: 'quiz-2',
      title: 'CS-401: Dynamic Programming & Greedy Algorithms',
      course: 'Algorithms',
      dueDate: 'Oct 28, 2026',
      participants: 38,
      total: 42,
      avgScore: 74,
      status: 'draft',
    },
    {
      id: 'quiz-3',
      title: 'CS-201: Balanced Binary Search Trees',
      course: 'Data Structures',
      dueDate: 'Oct 15, 2026',
      participants: 50,
      total: 50,
      avgScore: 79,
      status: 'completed',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Instructor Command Center</h1>
          <p className="text-xs text-slate-500 mt-1">
            Overview of active cohorts, test authoring, and assessment evaluation queue.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/teacher/students')}
          >
            Cohort Roster
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => navigate('/teacher/quizzes')}
          >
            Create Assessment
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            onClick={() => navigate(stat.href)}
            className={`group relative rounded-xl border bg-white p-5 shadow-subtle hover:shadow-card hover:border-indigo-300 transition-all cursor-pointer ${
              stat.highlight ? 'border-amber-300 ring-1 ring-amber-200/60' : 'border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.name}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-indigo-600">{stat.change}</span>
              </div>
            </div>

            <div className="mt-3 text-[11px] font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors">
              Manage in portal →
            </div>
          </div>
        ))}
      </div>

      {/* Grid: Quizzes & Live Schedule */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Active & Recent Quizzes */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-subtle p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Current Course Assessments</h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-indigo-600"
              onClick={() => navigate('/teacher/quizzes')}
            >
              View all ({recentQuizzes.length})
            </Button>
          </div>

          <div className="mt-4 divide-y divide-slate-100">
            {recentQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                onClick={() => navigate('/teacher/quizzes')}
                className="py-3.5 flex items-center justify-between hover:bg-slate-50/80 -mx-2 px-2 rounded-lg transition-colors cursor-pointer"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-slate-900 truncate">{quiz.title}</p>
                    <Badge
                      variant={
                        quiz.status === 'active'
                          ? 'success'
                          : quiz.status === 'draft'
                          ? 'neutral'
                          : 'info'
                      }
                      size="sm"
                    >
                      {quiz.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {quiz.course} • Closes: {quiz.dueDate}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-slate-900 tabular-nums">
                    {quiz.participants}/{quiz.total} Submissions
                  </span>
                  <p className="text-[11px] text-slate-500 tabular-nums">
                    Avg Score: {quiz.avgScore}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Teaching & Proctoring Schedule */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-subtle p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">This Week's Timetable</h2>
            <Badge variant="neutral" size="sm">
              Live Schedule
            </Badge>
          </div>

          <div className="mt-4 space-y-3.5">
            {[
              {
                time: '10:00 AM - 11:15 AM',
                day: 'Today',
                title: 'CS-301 Midterm Examination Session',
                location: 'Hall B-102 (Virtual Proctoring)',
                type: 'Exam Proctoring',
              },
              {
                time: '2:30 PM - 3:30 PM',
                day: 'Tomorrow',
                title: 'Algorithms Review Session & Office Hours',
                location: 'Room 304 / Zoom',
                type: 'Class Review',
              },
              {
                time: '9:00 AM - 10:30 AM',
                day: 'Thursday',
                title: 'Data Structures Pop Quiz',
                location: 'Computer Lab 3',
                type: 'Lab Assessment',
              },
            ].map((slot, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-700 font-bold flex flex-col items-center justify-center shrink-0 border border-indigo-100 text-[10px]">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900">{slot.title}</p>
                    <span className="text-[10px] font-semibold text-indigo-600 uppercase">{slot.day}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {slot.time} • {slot.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}