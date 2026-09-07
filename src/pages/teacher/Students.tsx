import { useState } from 'react';
import { Download, Plus, Search, UserCheck, Award, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { DataTable, Column, BulkAction } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Drawer } from '../../components/ui/Drawer';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';

interface StudentCohortMember {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  performance: number;
  letterGrade: 'A' | 'B' | 'C' | 'D' | 'F';
  attendance: string;
  quizzesCompleted: number;
  lastQuizScore: string;
  status: 'Good Standing' | 'Needs Attention' | 'At Risk';
}

const initialStudents: StudentCohortMember[] = [
  {
    id: 'std-101',
    name: 'Marcus Chen',
    email: 'marcus.chen@student.univ.edu',
    rollNumber: 'CS2024-041',
    performance: 92,
    letterGrade: 'A',
    attendance: '96%',
    quizzesCompleted: 6,
    lastQuizScore: '95%',
    status: 'Good Standing',
  },
  {
    id: 'std-102',
    name: 'Alice Johnson',
    email: 'alice.j@student.univ.edu',
    rollNumber: 'CS2024-012',
    performance: 88,
    letterGrade: 'B',
    attendance: '92%',
    quizzesCompleted: 6,
    lastQuizScore: '86%',
    status: 'Good Standing',
  },
  {
    id: 'std-103',
    name: 'Bob Smith',
    email: 'bob.smith@student.univ.edu',
    rollNumber: 'CS2024-085',
    performance: 68,
    letterGrade: 'D',
    attendance: '78%',
    quizzesCompleted: 5,
    lastQuizScore: '62%',
    status: 'Needs Attention',
  },
  {
    id: 'std-104',
    name: 'Priya Sharma',
    email: 'priya.s@student.univ.edu',
    rollNumber: 'CS2024-033',
    performance: 95,
    letterGrade: 'A',
    attendance: '98%',
    quizzesCompleted: 6,
    lastQuizScore: '98%',
    status: 'Good Standing',
  },
  {
    id: 'std-105',
    name: 'Kevin Miller',
    email: 'kevin.m@student.univ.edu',
    rollNumber: 'CS2024-099',
    performance: 58,
    letterGrade: 'F',
    attendance: '65%',
    quizzesCompleted: 4,
    lastQuizScore: '50%',
    status: 'At Risk',
  },
  {
    id: 'std-106',
    name: 'Chloe Bennett',
    email: 'chloe.b@student.univ.edu',
    rollNumber: 'CS2024-022',
    performance: 82,
    letterGrade: 'B',
    attendance: '90%',
    quizzesCompleted: 6,
    lastQuizScore: '80%',
    status: 'Good Standing',
  },
];

export default function TeacherStudents() {
  const [students, setStudents] = useState<StudentCohortMember[]>(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState<StudentCohortMember[] | null>(null);
  const [inspectedStudent, setInspectedStudent] = useState<StudentCohortMember | null>(null);
  const [statusFilter, setStatusFilter] = useState('All');

  // Add student modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roll, setRoll] = useState('');

  const filteredStudents = students.filter((s) => {
    return statusFilter === 'All' || s.status === statusFilter;
  });

  const handleExportCSV = (listToExport: StudentCohortMember[]) => {
    const csv =
      'data:text/csv;charset=utf-8,RollNo,Name,Email,Performance,Grade,Attendance,Status\n' +
      listToExport
        .map(
          (s) =>
            `${s.rollNumber},"${s.name}",${s.email},${s.performance}%,${s.letterGrade},${s.attendance},${s.status}`
        )
        .join('\n');
    const a = document.createElement('a');
    a.href = encodeURI(csv);
    a.download = `cohort_roster_${Date.now()}.csv`;
    a.click();
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const created: StudentCohortMember = {
      id: `std-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      rollNumber: roll.trim() || `CS2024-${Math.floor(Math.random() * 900 + 100)}`,
      performance: 85,
      letterGrade: 'B',
      attendance: '100%',
      quizzesCompleted: 0,
      lastQuizScore: 'N/A',
      status: 'Good Standing',
    };

    setStudents([created, ...students]);
    setIsAddModalOpen(false);
    setName('');
    setEmail('');
    setRoll('');
  };

  const columns: Column<StudentCohortMember>[] = [
    {
      key: 'name',
      header: 'Student Candidate',
      sortable: true,
      accessor: (s) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700 shrink-0">
            {s.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)}
          </div>
          <div>
            <div className="font-semibold text-slate-900 leading-tight">{s.name}</div>
            <div className="text-xs text-slate-500 mt-0.5">
              {s.rollNumber} • {s.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'performance',
      header: 'Academic Mastery',
      sortable: true,
      accessor: (s) => (
        <div className="flex items-center gap-2.5">
          <span
            className={`font-bold text-xs tabular-nums px-2 py-0.5 rounded-md border ${
              s.performance >= 85
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : s.performance >= 70
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}
          >
            Grade {s.letterGrade} ({s.performance}%)
          </span>
          <div className="w-20 bg-slate-100 rounded-full h-1.5 hidden sm:block">
            <div
              className={`h-1.5 rounded-full ${
                s.performance >= 85
                  ? 'bg-emerald-600'
                  : s.performance >= 70
                  ? 'bg-amber-600'
                  : 'bg-rose-600'
              }`}
              style={{ width: `${s.performance}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      key: 'attendance',
      header: 'Attendance',
      sortable: true,
      accessor: (s) => <span className="text-xs text-slate-700 tabular-nums">{s.attendance}</span>,
    },
    {
      key: 'quizzesCompleted',
      header: 'Assessments',
      accessor: (s) => (
        <span className="text-xs text-slate-700 tabular-nums">
          {s.quizzesCompleted} / 6 Taken
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Standing',
      sortable: true,
      accessor: (s) => (
        <Badge
          variant={
            s.status === 'Good Standing'
              ? 'success'
              : s.status === 'Needs Attention'
              ? 'warning'
              : 'danger'
          }
          size="sm"
          dot
        >
          {s.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Action',
      align: 'right',
      accessor: (s) => (
        <Button
          variant="ghost"
          size="sm"
          className="text-xs h-7 px-2.5"
          onClick={(e) => {
            e.stopPropagation();
            setInspectedStudent(s);
          }}
        >
          Diagnostics
        </Button>
      ),
    },
  ];

  const bulkActions: BulkAction<StudentCohortMember>[] = [
    {
      label: 'Export Selected Roster',
      icon: <Download className="h-4 w-4" />,
      onClick: handleExportCSV,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Course Cohort & Student Roster</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track individual competency, assessment submissions, and identify candidates needing academic intervention.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="h-4 w-4" />}
            onClick={() => handleExportCSV(students)}
          >
            Export All (CSV)
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Enroll Student
          </Button>
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        data={filteredStudents}
        columns={columns}
        keyExtractor={(s) => s.id}
        searchPlaceholder="Search students by name, roll number, or email..."
        searchFilter={(s, query) => {
          const l = query.toLowerCase();
          return s.name.toLowerCase().includes(l) || s.rollNumber.toLowerCase().includes(l);
        }}
        bulkActions={bulkActions}
        filterSlots={
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-medium text-slate-700 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="All">All Academic Standings</option>
            <option value="Good Standing">Good Standing</option>
            <option value="Needs Attention">Needs Attention</option>
            <option value="At Risk">At Risk</option>
          </select>
        }
        onRowClick={(s) => setInspectedStudent(s)}
      />

      {/* Add Student Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Enroll Student in Cohort"
        description="Add a candidate to the active course roster for assessment distribution."
        size="md"
      >
        <form onSubmit={handleAddStudent} className="space-y-4">
          <Input
            label="Candidate Full Name"
            placeholder="e.g. Maya Lin"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="University Email"
            type="email"
            placeholder="e.g. m.lin@student.univ.edu"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Roll / Registration Number"
            placeholder="e.g. CS2024-055"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Enroll Student
            </Button>
          </div>
        </form>
      </Modal>

      {/* Student Diagnostic Drawer */}
      <Drawer
        isOpen={Boolean(inspectedStudent)}
        onClose={() => setInspectedStudent(null)}
        title={inspectedStudent?.name || 'Student Diagnostics'}
        description={`Roll No: ${inspectedStudent?.rollNumber} • ${inspectedStudent?.email}`}
        footer={
          <div className="flex items-center justify-between w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                alert(`Retake token generated for ${inspectedStudent?.name}`);
                setInspectedStudent(null);
              }}
            >
              Issue Retake Token
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setInspectedStudent(null)}
            >
              Done
            </Button>
          </div>
        }
      >
        {inspectedStudent && (
          <div className="space-y-6 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">{inspectedStudent.name}</span>
                <Badge
                  variant={
                    inspectedStudent.status === 'Good Standing'
                      ? 'success'
                      : inspectedStudent.status === 'Needs Attention'
                      ? 'warning'
                      : 'danger'
                  }
                  size="sm"
                >
                  {inspectedStudent.status}
                </Badge>
              </div>
              <p className="text-slate-500">Enrolled Course: CS-301 Database Systems</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-slate-100 bg-white">
                <span className="text-slate-400">Cumulative Score</span>
                <p className="font-bold text-slate-900 text-sm mt-0.5">
                  {inspectedStudent.performance}% (Grade {inspectedStudent.letterGrade})
                </p>
              </div>
              <div className="p-3 rounded-lg border border-slate-100 bg-white">
                <span className="text-slate-400">Class Attendance</span>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{inspectedStudent.attendance}</p>
              </div>
              <div className="p-3 rounded-lg border border-slate-100 bg-white">
                <span className="text-slate-400">Quizzes Taken</span>
                <p className="font-bold text-slate-900 text-sm mt-0.5">
                  {inspectedStudent.quizzesCompleted} of 6
                </p>
              </div>
              <div className="p-3 rounded-lg border border-slate-100 bg-white">
                <span className="text-slate-400">Last Assessment Score</span>
                <p className="font-bold text-slate-900 text-sm mt-0.5">
                  {inspectedStudent.lastQuizScore}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Assessment History & Attempts
              </h4>
              <div className="divide-y divide-slate-100 rounded-lg border border-slate-200">
                {[
                  { title: 'CS-301 Midterm Examination', date: '2 days ago', score: '95%', state: 'Passed' },
                  { title: 'Normalization & ER Diagram Quiz', date: '1 week ago', score: '88%', state: 'Passed' },
                  { title: 'SQL Aggregations & Joins Pop Quiz', date: '2 weeks ago', score: '92%', state: 'Passed' },
                ].map((att, i) => (
                  <div key={i} className="p-3 flex items-center justify-between bg-white">
                    <div>
                      <p className="font-semibold text-slate-900">{att.title}</p>
                      <p className="text-slate-400 text-[11px]">{att.date}</p>
                    </div>
                    <span className="font-bold text-slate-800 tabular-nums">{att.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}