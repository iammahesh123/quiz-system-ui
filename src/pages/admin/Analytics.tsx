import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Download, TrendingUp, Users, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState<'30d' | '3m' | '6m' | '1y'>('6m');

  const rangeDatasets: Record<string, { labels: string[]; quizzes: number[]; attempts: number[]; activeUsers: number[] }> = {
    '30d': {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      quizzes: [12, 18, 14, 22],
      attempts: [310, 480, 420, 610],
      activeUsers: [980, 1120, 1250, 1450],
    },
    '3m': {
      labels: ['July', 'August', 'September'],
      quizzes: [45, 62, 85],
      attempts: [1200, 2100, 3400],
      activeUsers: [1200, 1500, 1850],
    },
    '6m': {
      labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      quizzes: [55, 59, 80, 81, 56, 92],
      attempts: [1400, 1800, 2400, 2100, 2900, 3850],
      activeUsers: [1100, 1250, 1450, 1600, 1750, 2150],
    },
    '1y': {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      quizzes: [180, 240, 310, 380],
      attempts: [5200, 7100, 8900, 12450],
      activeUsers: [1400, 1700, 2100, 2345],
    },
  };

  const currentData = rangeDatasets[timeRange];

  const quizActivityData = {
    labels: currentData.labels,
    datasets: [
      {
        label: 'Exams Created',
        data: currentData.quizzes,
        backgroundColor: 'rgba(99, 102, 241, 0.85)',
        borderRadius: 6,
      },
      {
        label: 'Student Attempts (x10)',
        data: currentData.attempts.map((v) => Math.round(v / 10)),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderRadius: 6,
      },
    ],
  };

  const departmentPerformanceData = {
    labels: ['Computer Science', 'Electrical Eng', 'Mathematics', 'Physics'],
    datasets: [
      {
        label: 'Average Score (%)',
        data: [78.4, 72.1, 84.5, 76.2],
        backgroundColor: [
          'rgba(99, 102, 241, 0.85)',
          'rgba(14, 165, 233, 0.85)',
          'rgba(16, 185, 129, 0.85)',
          'rgba(245, 158, 11, 0.85)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const userGrowthData = {
    labels: currentData.labels,
    datasets: [
      {
        label: 'Active Institutional Users',
        data: currentData.activeUsers,
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.08)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#4f46e5',
      },
    ],
  };

  const handleExportAnalytics = () => {
    const csv =
      'data:text/csv;charset=utf-8,Period,Quizzes,Attempts,ActiveUsers\n' +
      currentData.labels
        .map(
          (label, i) =>
            `${label},${currentData.quizzes[i]},${currentData.attempts[i]},${currentData.activeUsers[i]}`
        )
        .join('\n');
    const a = document.createElement('a');
    a.href = encodeURI(csv);
    a.download = `analytics_${timeRange}_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Institutional Performance & Analytics</h1>
          <p className="text-xs text-slate-500 mt-1">
            Department-level benchmarking, exam completion metrics, and user growth trends.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-slate-300 bg-white p-1 text-xs">
            {(['30d', '3m', '6m', '1y'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`rounded-md px-3 py-1 font-semibold transition-colors ${
                  timeRange === range
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="h-4 w-4" />}
            onClick={handleExportAnalytics}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Enrolled Candidates', value: '2,345', change: '+14%', icon: Users },
          { label: 'Overall Completion Rate', value: '91.8%', change: '+3.2%', icon: CheckCircle2 },
          { label: 'Institutional Mean Score', value: '77.8%', change: '+4.5%', icon: TrendingUp },
          { label: 'Integrity Compliance Score', value: '99.2%', change: 'Normal', icon: ShieldCheck },
        ].map((m, idx) => (
          <div key={idx} className="rounded-xl border border-slate-200 bg-white p-5 shadow-subtle">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">{m.label}</span>
              <m.icon className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold text-slate-900 tabular-nums">{m.value}</span>
              <span className="text-xs font-semibold text-emerald-600">{m.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Assessments Created vs Attempts</h3>
            <span className="text-xs text-slate-500">Period: {timeRange.toUpperCase()}</span>
          </div>
          <div className="h-64">
            <Bar
              data={quizActivityData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' as const } },
              }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Mean Score by Department</h3>
            <span className="text-xs text-slate-500">Benchmark 75%</span>
          </div>
          <div className="h-64 flex items-center justify-center">
            <Pie
              data={departmentPerformanceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right' as const } },
              }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-subtle space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">User Growth & Engagement Trajectory</h3>
            <span className="text-xs text-slate-500">Total: 2,345 Users</span>
          </div>
          <div className="h-72">
            <Line
              data={userGrowthData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: false },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}