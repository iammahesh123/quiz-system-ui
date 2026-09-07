import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  BarChart3,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  AlertTriangle,
  Award,
  Sparkles,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export default function StudentDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      name: 'Completed Tests',
      value: '12',
      change: '100% on-time',
      icon: BookOpen,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
    {
      name: 'Cumulative Grade',
      value: '91.8%',
      change: 'Grade A (Top 5%)',
      icon: Award,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      name: 'Pending Assessments',
      value: '1 Due',
      change: 'Closes today 5:00 PM',
      icon: AlertTriangle,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      highlight: true,
    },
    {
      name: 'Upcoming Schedule',
      value: '2 Tests',
      change: 'Next: Oct 28',
      icon: Calendar,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
  ];

  const recentQuizzes = [
    {
      id: 'qz-prev-1',
      title: 'CS-201 Data Structures: Graphs & Trees',
      course: 'Data Structures',
      date: 'Completed 3 days ago',
      score: 95,
      grade: 'A',
      maxScore: 100,
      feedback: 'Excellent work on AVL tree rotations and BFS traversal algorithms.',
    },
    {
      id: 'qz-prev-2',
      title: 'CS-301 SQL Aggregations & Group By',
      course: 'Database Management',
      date: 'Completed 1 week ago',
      score: 88,
      grade: 'B+',
      maxScore: 100,
      feedback: 'Good query structure; review HAVING clause vs WHERE clause execution order.',
    },
    {
      id: 'qz-prev-3',
      title: 'MATH-202 Linear Transformations',
      course: 'Discrete Mathematics',
      date: 'Completed 2 weeks ago',
      score: 92,
      grade: 'A',
      maxScore: 100,
      feedback: 'All matrix eigenvector equations solved accurately.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Active Exam Urgent Callout Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-850 to-slate-900 text-white p-6 shadow-md border border-indigo-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 border border-amber-400/40 px-3 py-1 text-xs font-semibold text-amber-300">
              <Clock className="h-3.5 w-3.5" />
              <span>Due Today • Closes at 5:00 PM</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              CS-301 Midterm: Relational Schema & Normalization
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Course: Database Management Systems • 30 Multiple Choice Questions • 60 Minutes Duration. Auto-save enabled.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              variant="primary"
              size="lg"
              className="bg-white text-indigo-900 hover:bg-slate-100 font-bold shadow-lg"
              rightIcon={<ArrowRight className="h-4 w-4" />}
              onClick={() => navigate('/exam/qz-101')}
            >
              Start Assessment Now
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className={`rounded-xl border bg-white p-5 shadow-subtle ${
              stat.highlight ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">{stat.name}</span>
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold text-slate-900 tabular-nums">{stat.value}</span>
              <span className="text-xs font-semibold text-indigo-600">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Grid: Graded Tests & Upcoming Timetable */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recently Graded Assessments */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Recently Evaluated Tests</h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-indigo-600"
              onClick={() => navigate('/student/progress')}
            >
              Detailed Transcript →
            </Button>
          </div>

          <div className="space-y-3 divide-y divide-slate-100">
            {recentQuizzes.map((quiz) => (
              <div key={quiz.id} className="pt-3 first:pt-0 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{quiz.title}</span>
                  <Badge variant="success" size="sm">
                    {quiz.score}% ({quiz.grade})
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-500">{quiz.date} • {quiz.course}</p>
                <div className="rounded-lg bg-slate-50 border border-slate-100 p-2.5 text-xs text-slate-600">
                  <span className="font-semibold text-slate-700">Feedback: </span>
                  {quiz.feedback}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Exam Schedule */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Upcoming Assessment Calendar</h3>
            <Badge variant="neutral" size="sm">
              Term Schedule
            </Badge>
          </div>

          <div className="space-y-3">
            {[
              {
                date: 'Oct 28, 2026',
                time: '2:00 PM',
                course: 'CS-401 Algorithms',
                title: 'Dynamic Programming & Memoization',
                duration: '75 Minutes',
              },
              {
                date: 'Nov 02, 2026',
                time: '10:00 AM',
                course: 'CS-302 Operating Systems',
                title: 'Process Synchronization & Semaphores',
                duration: '60 Minutes',
              },
              {
                date: 'Nov 14, 2026',
                time: '1:30 PM',
                course: 'EE-104 Circuit Analysis',
                title: 'Frequency Response & Bode Plots',
                duration: '90 Minutes',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{item.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {item.course} • {item.duration}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-indigo-700">{item.date}</p>
                  <p className="text-[11px] text-slate-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
