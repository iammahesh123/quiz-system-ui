import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Award, TrendingUp, BookOpen, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StudentProgress() {
  const trajectoryData = {
    labels: ['Quiz 1 (Aug)', 'Quiz 2 (Sep)', 'Pop Quiz (Sep)', 'Midterm 1 (Oct)', 'Quiz 3 (Oct)'],
    datasets: [
      {
        label: 'My Score (%)',
        data: [82, 88, 79, 95, 92],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.08)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#4f46e5',
        pointRadius: 5,
      },
      {
        label: 'Cohort Average (%)',
        data: [74, 76, 75, 78, 77],
        borderColor: '#94a3b8',
        borderDash: [5, 5],
        fill: false,
        tension: 0.35,
        pointRadius: 3,
      },
    ],
  };

  const topicCompetencies = [
    { topic: 'Relational Schema & 3NF Normalization', score: 94, level: 'Mastery' },
    { topic: 'SQL Joins, Aggregations & Group By', score: 92, level: 'Mastery' },
    { topic: 'Balanced Search Trees (AVL & Red-Black)', score: 88, level: 'Proficient' },
    { topic: 'Graph Theory & BFS/DFS Traversals', score: 85, level: 'Proficient' },
    { topic: 'Dynamic Programming & Memoization', score: 72, level: 'Developing' },
    { topic: 'OS Process Concurrency & Deadlocks', score: 65, level: 'Needs Review' },
  ];

  const historicalAttempts = [
    {
      id: 'att-01',
      title: 'CS-201 Data Structures: Graphs & Trees',
      course: 'Data Structures',
      date: 'Oct 15, 2026',
      score: 95,
      grade: 'A',
      cohortRank: 'Top 4%',
      status: 'Passed',
    },
    {
      id: 'att-02',
      title: 'CS-301 SQL Aggregations & Group By',
      course: 'Database Management',
      date: 'Oct 08, 2026',
      score: 88,
      grade: 'B+',
      cohortRank: 'Top 15%',
      status: 'Passed',
    },
    {
      id: 'att-03',
      title: 'MATH-202 Linear Transformations & Eigenvalues',
      course: 'Discrete Mathematics',
      date: 'Sep 24, 2026',
      score: 92,
      grade: 'A',
      cohortRank: 'Top 8%',
      status: 'Passed',
    },
    {
      id: 'att-04',
      title: 'CS-101 Computing Foundations & Python Syntax',
      course: 'Intro to Computer Science',
      date: 'Sep 10, 2026',
      score: 98,
      grade: 'A+',
      cohortRank: 'Top 2%',
      status: 'Passed',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Academic Progress & Mastery</h1>
        <p className="text-xs text-slate-500 mt-1">
          Detailed performance breakdown, competency mastery meters, and grade trajectory analysis.
        </p>
      </div>

      {/* KPI Overview Row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Cumulative GPA Score', value: '91.8%', change: 'Grade A', icon: Award },
          { label: 'Assessments Completed', value: '12 / 12', change: '100% Rate', icon: CheckCircle2 },
          { label: 'Cohort Class Percentile', value: '96th', change: 'Top 4% of 156', icon: TrendingUp },
          { label: 'Competencies Mastered', value: '4 of 6', change: '2 in progress', icon: BookOpen },
        ].map((kpi, idx) => (
          <div key={idx} className="rounded-xl border border-slate-200 bg-white p-5 shadow-subtle">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">{kpi.label}</span>
              <kpi.icon className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold text-slate-900 tabular-nums">{kpi.value}</span>
              <span className="text-xs font-semibold text-emerald-600">{kpi.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Trajectory Chart and Mastery Breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Score Trajectory */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Score Trajectory vs Cohort Benchmark</h3>
              <p className="text-xs text-slate-400">Tracking score progression across exam sessions</p>
            </div>
            <Badge variant="success" size="sm">
              +14% Above Mean
            </Badge>
          </div>
          <div className="h-64">
            <Line
              data={trajectoryData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { min: 60, max: 100 } },
              }}
            />
          </div>
        </div>

        {/* Topic-wise Competencies */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Syllabus Topic Competency Breakdown</h3>
            <span className="text-xs text-slate-400">6 Evaluated Areas</span>
          </div>

          <div className="space-y-3.5">
            {topicCompetencies.map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{item.topic}</span>
                  <span
                    className={`font-bold tabular-nums ${
                      item.score >= 85
                        ? 'text-emerald-700'
                        : item.score >= 70
                        ? 'text-indigo-700'
                        : 'text-amber-700'
                    }`}
                  >
                    {item.score}% ({item.level})
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.score >= 85
                        ? 'bg-emerald-600'
                        : item.score >= 70
                        ? 'bg-indigo-600'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Historical Transcript Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-subtle overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">Official Evaluation Transcript</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Assessment Title</th>
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3">Completed On</th>
                <th className="px-6 py-3">Score & Grade</th>
                <th className="px-6 py-3">Cohort Rank</th>
                <th className="px-6 py-3">Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {historicalAttempts.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3.5 font-bold text-slate-900">{row.title}</td>
                  <td className="px-6 py-3.5 text-slate-600">{row.course}</td>
                  <td className="px-6 py-3.5 text-slate-500 tabular-nums">{row.date}</td>
                  <td className="px-6 py-3.5 font-bold text-slate-900 tabular-nums">
                    {row.score}% (Grade {row.grade})
                  </td>
                  <td className="px-6 py-3.5 text-indigo-600 font-semibold">{row.cohortRank}</td>
                  <td className="px-6 py-3.5">
                    <Badge variant="success" size="sm">
                      {row.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
