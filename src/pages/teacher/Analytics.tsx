import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Download, Users, TrendingUp, CheckCircle, Award } from 'lucide-react';
import { Button } from '../../components/ui/Button';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const classAnalytics: Record<
  string,
  {
    name: string;
    totalQuizzes: number;
    activeStudents: number;
    avgScore: string;
    completionRate: string;
    scores: number[];
    participation: number[];
    topAreas: string[];
    attentionAreas: string[];
  }
> = {
  all: {
    name: 'All Assigned Classes (Aggregated)',
    totalQuizzes: 12,
    activeStudents: 156,
    avgScore: '78.5%',
    completionRate: '92.4%',
    scores: [75, 78, 82, 74, 85],
    participation: [85, 88, 92, 90, 94],
    topAreas: ['Relational Schema & 3NF', 'Graph Traversal (BFS/DFS)', 'Basic SQL Joins'],
    attentionAreas: ['Distributed Locking & Semaphores', 'Dynamic Programming Optimization'],
  },
  cs301: {
    name: 'CS-301: Database Management Systems',
    totalQuizzes: 5,
    activeStudents: 48,
    avgScore: '82.0%',
    completionRate: '95.8%',
    scores: [80, 84, 86, 79, 88],
    participation: [90, 94, 98, 96, 96],
    topAreas: ['B+ Tree Indexing', 'Functional Dependencies', 'Transactions (ACID)'],
    attentionAreas: ['Complex Nested Correlated Subqueries'],
  },
  cs401: {
    name: 'CS-401: Design & Analysis of Algorithms',
    totalQuizzes: 4,
    activeStudents: 42,
    avgScore: '74.2%',
    completionRate: '88.0%',
    scores: [68, 72, 75, 71, 79],
    participation: [80, 82, 85, 88, 90],
    topAreas: ['Greedy Choice Property', 'Asymptotic Big-O Analysis'],
    attentionAreas: ['NP-Completeness Reductions', 'Matrix Chain Multiplication'],
  },
  cs201: {
    name: 'CS-201: Data Structures & Algorithms',
    totalQuizzes: 3,
    activeStudents: 66,
    avgScore: '79.5%',
    completionRate: '94.0%',
    scores: [76, 80, 82, 78, 84],
    participation: [88, 90, 92, 94, 95],
    topAreas: ['Stack & Queue Implementations', 'Hash Collisions & Probing'],
    attentionAreas: ['AVL Tree Double Rotations'],
  },
};

export default function TeacherAnalytics() {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const current = classAnalytics[selectedClass] || classAnalytics.all;

  const performanceData = {
    labels: ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4', 'Quiz 5'],
    datasets: [
      {
        label: 'Cohort Average (%)',
        data: current.scores,
        backgroundColor: 'rgba(99, 102, 241, 0.85)',
        borderRadius: 6,
      },
    ],
  };

  const participationData = {
    labels: ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5'],
    datasets: [
      {
        label: 'Candidate Attendance / Submission Rate (%)',
        data: current.participation,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.08)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#10b981',
      },
    ],
  };

  const handleExport = () => {
    const csv = `Course,TotalQuizzes,Enrolled,AvgScore,CompletionRate\n"${current.name}",${current.totalQuizzes},${current.activeStudents},${current.avgScore},${current.completionRate}`;
    const a = document.createElement('a');
    a.href = encodeURI('data:text/csv;charset=utf-8,' + csv);
    a.download = `class_analytics_${selectedClass}_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Class Performance & Psychometrics</h1>
          <p className="text-xs text-slate-500 mt-1">
            Analyze grade distributions, participation trends, and identify learning gaps by course.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold text-slate-800 focus:ring-1 focus:ring-indigo-500 shadow-xs"
          >
            <option value="all">All Classes (Aggregated)</option>
            <option value="cs301">CS-301 Database Systems</option>
            <option value="cs401">CS-401 Algorithms</option>
            <option value="cs201">CS-201 Data Structures</option>
          </select>

          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="h-4 w-4" />}
            onClick={handleExport}
          >
            Export Class Report
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Assessments Created', value: current.totalQuizzes, icon: Award },
          { label: 'Active Enrolled Candidates', value: current.activeStudents, icon: Users },
          { label: 'Cohort Mean Score', value: current.avgScore, icon: TrendingUp },
          { label: 'Assessment Completion Rate', value: current.completionRate, icon: CheckCircle },
        ].map((m, idx) => (
          <div key={idx} className="rounded-xl border border-slate-200 bg-white p-5 shadow-subtle">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">{m.label}</span>
              <m.icon className="h-4 w-4 text-indigo-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900 tabular-nums mt-2">{m.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Mean Score Trajectory</h3>
            <span className="text-xs text-slate-500">Benchmark: 70%</span>
          </div>
          <div className="h-64">
            <Bar
              data={performanceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { min: 40, max: 100 } },
              }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Submission & Attendance Rate</h3>
            <span className="text-xs text-slate-500">Target: 90%+</span>
          </div>
          <div className="h-64">
            <Line
              data={participationData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { min: 50, max: 100 } },
              }}
            />
          </div>
        </div>
      </div>

      {/* Diagnostic Strengths & Weaknesses */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-subtle space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Curriculum Mastery & Learning Gap Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs">
            <h4 className="font-bold text-emerald-900 mb-2">High Mastery Competencies</h4>
            <ul className="space-y-1.5 text-emerald-800">
              {current.topAreas.map((area, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs">
            <h4 className="font-bold text-amber-900 mb-2">Topics Requiring Class Review</h4>
            <ul className="space-y-1.5 text-amber-800">
              {current.attentionAreas.map((area, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600 shrink-0" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}