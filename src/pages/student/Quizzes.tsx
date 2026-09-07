import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  ArrowRight,
  BookOpen,
  Award,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

interface StudentAssessment {
  id: string;
  title: string;
  course: string;
  instructor: string;
  durationMinutes: number;
  questionsCount: number;
  dueDate: string;
  status: 'available' | 'upcoming' | 'completed';
  score?: number;
  grade?: string;
  proctored: boolean;
  syllabus: string;
}

const assessments: StudentAssessment[] = [
  {
    id: 'qz-101',
    title: 'CS-301 Midterm Examination: Relational Schema & Normalization',
    course: 'CS-301 Database Management Systems',
    instructor: 'Prof. Elena Rostova',
    durationMinutes: 60,
    questionsCount: 30,
    dueDate: 'Today at 5:00 PM',
    status: 'available',
    proctored: true,
    syllabus: 'ER Modeling, Relational Algebra, Functional Dependencies, 1NF, 2NF, 3NF, BCNF.',
  },
  {
    id: 'qz-102',
    title: 'CS-401 Dynamic Programming & Greedy Strategies Quiz',
    course: 'CS-401 Design & Analysis of Algorithms',
    instructor: 'Prof. Elena Rostova',
    durationMinutes: 75,
    questionsCount: 25,
    dueDate: 'Oct 28, 2026 at 2:00 PM',
    status: 'upcoming',
    proctored: true,
    syllabus: 'Optimal Substructure, Overlapping Subproblems, Knapsack, Huffman Coding.',
  },
  {
    id: 'qz-103',
    title: 'CS-302 Process Synchronization & Deadlocks Pop Test',
    course: 'CS-302 Operating Systems',
    instructor: 'Dr. Sarah Connor',
    durationMinutes: 45,
    questionsCount: 20,
    dueDate: 'Nov 02, 2026 at 10:00 AM',
    status: 'upcoming',
    proctored: false,
    syllabus: 'Peterson Solution, Semaphores, Monitors, Banker Algorithm.',
  },
  {
    id: 'qz-104',
    title: 'CS-201 Balanced Trees & Graph Traversals',
    course: 'CS-201 Data Structures',
    instructor: 'Dr. Alan Turing',
    durationMinutes: 45,
    questionsCount: 20,
    dueDate: 'Completed Oct 15',
    status: 'completed',
    score: 95,
    grade: 'A',
    proctored: true,
    syllabus: 'AVL Trees, Red-Black Properties, BFS, DFS, Dijkstra Shortest Path.',
  },
  {
    id: 'qz-105',
    title: 'CS-301 SQL Aggregations & Complex Joins',
    course: 'CS-301 Database Management Systems',
    instructor: 'Prof. Elena Rostova',
    durationMinutes: 45,
    questionsCount: 20,
    dueDate: 'Completed Oct 08',
    status: 'completed',
    score: 88,
    grade: 'B+',
    proctored: true,
    syllabus: 'Inner/Outer Joins, Group By, Having, Window Functions (OVER, PARTITION BY).',
  },
];

export default function StudentQuizzes() {
  const [activeTab, setActiveTab] = useState<'available' | 'upcoming' | 'completed'>('available');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filtered = assessments.filter((a) => {
    const matchesTab = a.status === activeTab;
    const matchesQuery =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.course.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Course Assessments</h1>
          <p className="text-xs text-slate-500 mt-1">
            Access active examinations, review syllabus schedules, and inspect feedback on completed tests.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search assessments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:ring-1 focus:ring-indigo-500 shadow-xs"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold">
        {[
          { key: 'available' as const, label: 'Available & Due Now (1)', badge: 'Urgent' },
          { key: 'upcoming' as const, label: 'Upcoming Scheduled (2)' },
          { key: 'completed' as const, label: 'Completed & Graded (2)' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'border-indigo-600 text-indigo-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="rounded-full bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 font-bold">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Assessment Cards Grid */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-white p-12 text-center text-slate-400 text-xs">
            No assessments found under this category.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl border p-5 bg-white shadow-subtle transition-all space-y-4 ${
                item.status === 'available'
                  ? 'border-indigo-300 ring-1 ring-indigo-200/60'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                      {item.course}
                    </span>
                    {item.proctored && (
                      <Badge variant="neutral" size="sm" dot>
                        Proctored Exam
                      </Badge>
                    )}
                    {item.status === 'available' && (
                      <Badge variant="warning" size="sm">
                        Closing Soon
                      </Badge>
                    )}
                    {item.status === 'completed' && (
                      <Badge variant="success" size="sm">
                        Score: {item.score}% (Grade {item.grade})
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-500">Instructor: {item.instructor}</p>
                </div>

                <div className="shrink-0">
                  {item.status === 'available' ? (
                    <Button
                      variant="primary"
                      size="md"
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                      onClick={() => navigate(`/exam/${item.id}`)}
                    >
                      Start Examination
                    </Button>
                  ) : item.status === 'completed' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/student/progress')}
                    >
                      View Detailed Feedback
                    </Button>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      <Clock className="h-3.5 w-3.5" />
                      Scheduled
                    </span>
                  )}
                </div>
              </div>

              {/* Assessment Metadata & Syllabus Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block">Duration & Format:</span>
                  <span className="font-semibold text-slate-700">
                    {item.durationMinutes} Minutes • {item.questionsCount} Multiple Choice
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Assessment Window:</span>
                  <span className="font-semibold text-slate-700">{item.dueDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Academic Syllabus:</span>
                  <span className="text-slate-600 truncate block" title={item.syllabus}>
                    {item.syllabus}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
