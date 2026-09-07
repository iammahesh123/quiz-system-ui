import { useState, useMemo } from 'react';
import { Plus, Search, Filter, BookOpen, Clock, Users, Play, Edit, Trash2, CheckCircle2, Eye } from 'lucide-react';
import { DataTable, Column, BulkAction } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Drawer } from '../../components/ui/Drawer';
import { Input } from '../../components/ui/Input';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';

interface TeacherQuiz {
  id: string;
  title: string;
  subject: string;
  courseCode: string;
  dueDate: string;
  status: 'active' | 'draft' | 'completed';
  questionsCount: number;
  durationMinutes: number;
  attemptsCount: number;
  totalCandidates: number;
  passingScore: number;
}

const initialQuizzes: TeacherQuiz[] = [
  {
    id: 'qz-101',
    title: 'CS-301 Midterm: Relational Algebra & SQL',
    subject: 'Computer Science',
    courseCode: 'CS-301',
    dueDate: '2026-10-24 17:00',
    status: 'active',
    questionsCount: 30,
    durationMinutes: 60,
    attemptsCount: 45,
    totalCandidates: 48,
    passingScore: 65,
  },
  {
    id: 'qz-102',
    title: 'CS-401 Algorithms: Dynamic Programming Mastery',
    subject: 'Computer Science',
    courseCode: 'CS-401',
    dueDate: '2026-10-28 23:59',
    status: 'draft',
    questionsCount: 25,
    durationMinutes: 75,
    attemptsCount: 0,
    totalCandidates: 42,
    passingScore: 70,
  },
  {
    id: 'qz-103',
    title: 'CS-201 Data Structures: Graphs & Trees Quiz',
    subject: 'Computer Science',
    courseCode: 'CS-201',
    dueDate: '2026-10-15 12:00',
    status: 'completed',
    questionsCount: 20,
    durationMinutes: 45,
    attemptsCount: 50,
    totalCandidates: 50,
    passingScore: 60,
  },
  {
    id: 'qz-104',
    title: 'CS-302 Operating Systems: Concurrency & Semaphores',
    subject: 'Computer Science',
    courseCode: 'CS-302',
    dueDate: '2026-11-02 14:00',
    status: 'draft',
    questionsCount: 35,
    durationMinutes: 90,
    attemptsCount: 0,
    totalCandidates: 45,
    passingScore: 65,
  },
  {
    id: 'qz-105',
    title: 'CS-101 Introduction to Computing & Python Basics',
    subject: 'Computer Science',
    courseCode: 'CS-101',
    dueDate: '2026-09-30 18:00',
    status: 'completed',
    questionsCount: 25,
    durationMinutes: 45,
    attemptsCount: 110,
    totalCandidates: 112,
    passingScore: 50,
  },
];

export default function TeacherQuizzes() {
  const [quizzes, setQuizzes] = useState<TeacherQuiz[]>(initialQuizzes);
  const [statusTab, setStatusTab] = useState<'all' | 'active' | 'draft' | 'completed'>('all');
  const [selectedQuiz, setSelectedQuiz] = useState<TeacherQuiz | null>(null);
  const [quizToDelete, setQuizToDelete] = useState<TeacherQuiz | null>(null);

  // 3-step Create Quiz Wizard State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizCourse, setQuizCourse] = useState('CS-301');
  const [quizDuration, setQuizDuration] = useState('60');
  const [quizQuestionsCount, setQuizQuestionsCount] = useState('25');
  const [quizPassingScore, setQuizPassingScore] = useState('65');
  const [quizShuffle, setQuizShuffle] = useState(true);

  const filteredQuizzes = useMemo(() => {
    if (statusTab === 'all') return quizzes;
    return quizzes.filter((q) => q.status === statusTab);
  }, [quizzes, statusTab]);

  const handleCreateSubmit = (status: 'active' | 'draft') => {
    if (!quizTitle.trim()) return;

    const created: TeacherQuiz = {
      id: `qz-${Date.now()}`,
      title: quizTitle.trim(),
      subject: 'Computer Science',
      courseCode: quizCourse,
      dueDate: new Date(Date.now() + 86400000 * 5).toISOString().replace('T', ' ').slice(0, 16),
      status,
      questionsCount: parseInt(quizQuestionsCount, 10) || 20,
      durationMinutes: parseInt(quizDuration, 10) || 60,
      attemptsCount: 0,
      totalCandidates: 45,
      passingScore: parseInt(quizPassingScore, 10) || 60,
    };

    setQuizzes([created, ...quizzes]);
    setIsCreateModalOpen(false);
    setWizardStep(1);
    setQuizTitle('');
  };

  const handleDelete = () => {
    if (!quizToDelete) return;
    setQuizzes((prev) => prev.filter((q) => q.id !== quizToDelete.id));
    setQuizToDelete(null);
    if (selectedQuiz?.id === quizToDelete.id) setSelectedQuiz(null);
  };

  const handleToggleStatus = (quiz: TeacherQuiz) => {
    const nextStatus = quiz.status === 'active' ? 'draft' : 'active';
    setQuizzes((prev) =>
      prev.map((q) => (q.id === quiz.id ? { ...q, status: nextStatus } : q))
    );
    if (selectedQuiz?.id === quiz.id) {
      setSelectedQuiz({ ...selectedQuiz, status: nextStatus });
    }
  };

  const columns: Column<TeacherQuiz>[] = [
    {
      key: 'title',
      header: 'Assessment Title',
      sortable: true,
      accessor: (q) => (
        <div>
          <div className="font-semibold text-slate-900 leading-tight">{q.title}</div>
          <div className="text-xs text-slate-500 mt-0.5">
            {q.courseCode} • {q.subject}
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      accessor: (q) => (
        <Badge
          variant={
            q.status === 'active' ? 'success' : q.status === 'draft' ? 'neutral' : 'info'
          }
          size="sm"
          dot={q.status === 'active'}
        >
          {q.status.toUpperCase()}
        </Badge>
      ),
    },
    {
      key: 'durationMinutes',
      header: 'Timing & Specs',
      accessor: (q) => (
        <div className="text-xs text-slate-700">
          <span className="font-semibold tabular-nums">{q.durationMinutes} mins</span>
          <span className="text-slate-400"> • </span>
          <span className="text-slate-500 tabular-nums">{q.questionsCount} questions</span>
        </div>
      ),
    },
    {
      key: 'dueDate',
      header: 'Due Deadline',
      sortable: true,
      accessor: (q) => <span className="text-xs text-slate-600 tabular-nums">{q.dueDate}</span>,
    },
    {
      key: 'attemptsCount',
      header: 'Submissions',
      sortable: true,
      accessor: (q) => (
        <div className="text-xs">
          <span className="font-semibold text-slate-900 tabular-nums">
            {q.attemptsCount} / {q.totalCandidates}
          </span>
          <div className="w-24 bg-slate-100 rounded-full h-1.5 mt-1">
            <div
              className="bg-indigo-600 h-1.5 rounded-full"
              style={{
                width: `${Math.round((q.attemptsCount / (q.totalCandidates || 1)) * 100)}%`,
              }}
            />
          </div>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      accessor: (q) => (
        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="sm"
            className="px-2 py-1 h-7 text-xs"
            onClick={() => setSelectedQuiz(q)}
          >
            Inspect
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-2 py-1 h-7 text-xs text-rose-600 hover:bg-rose-50"
            onClick={() => setQuizToDelete(q)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Course Assessments & Quizzes</h1>
          <p className="text-xs text-slate-500 mt-1">
            Author examination questions, configure proctoring parameters, and monitor live submissions.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => {
            setWizardStep(1);
            setIsCreateModalOpen(true);
          }}
        >
          Create Assessment
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 text-xs font-semibold">
        {[
          { key: 'all' as const, label: `All Quizzes (${quizzes.length})` },
          { key: 'active' as const, label: `Active (${quizzes.filter((q) => q.status === 'active').length})` },
          { key: 'draft' as const, label: `Drafts (${quizzes.filter((q) => q.status === 'draft').length})` },
          { key: 'completed' as const, label: `Past / Completed (${quizzes.filter((q) => q.status === 'completed').length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusTab(tab.key)}
            className={`px-4 py-2.5 border-b-2 transition-colors ${
              statusTab === tab.key
                ? 'border-indigo-600 text-indigo-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* DataTable */}
      <DataTable
        data={filteredQuizzes}
        columns={columns}
        keyExtractor={(q) => q.id}
        searchPlaceholder="Search assessments by title or course code..."
        searchFilter={(q, query) => {
          const l = query.toLowerCase();
          return q.title.toLowerCase().includes(l) || q.courseCode.toLowerCase().includes(l);
        }}
        onRowClick={(q) => setSelectedQuiz(q)}
      />

      {/* 3-Step Assessment Creation Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title={
          wizardStep === 1
            ? 'Create Assessment: Step 1 of 3 (Basic Details)'
            : wizardStep === 2
            ? 'Create Assessment: Step 2 of 3 (Timing & Parameters)'
            : 'Create Assessment: Step 3 of 3 (Review & Publish)'
        }
        description="Configure your examination parameters for enrolled student candidates."
        size="lg"
      >
        <div className="space-y-5">
          {/* Progress Indicators */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
            {[
              { num: 1, label: 'Course Info' },
              { num: 2, label: 'Timing & Rules' },
              { num: 3, label: 'Review & Publish' },
            ].map((s) => (
              <div
                key={s.num}
                className={`flex items-center gap-2 text-xs font-semibold ${
                  wizardStep === s.num
                    ? 'text-indigo-600'
                    : wizardStep > s.num
                    ? 'text-emerald-600'
                    : 'text-slate-400'
                }`}
              >
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    wizardStep === s.num
                      ? 'bg-indigo-600 text-white'
                      : wizardStep > s.num
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {wizardStep > s.num ? '✓' : s.num}
                </div>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          {wizardStep === 1 && (
            <div className="space-y-4">
              <Input
                label="Assessment Title"
                placeholder="e.g. CS-301 Midterm Examination"
                required
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Course Code
                  </label>
                  <select
                    value={quizCourse}
                    onChange={(e) => setQuizCourse(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-sm text-slate-900 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="CS-301">CS-301: Database Management Systems</option>
                    <option value="CS-401">CS-401: Design & Analysis of Algorithms</option>
                    <option value="CS-201">CS-201: Data Structures</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Target Cohort
                  </label>
                  <input
                    type="text"
                    disabled
                    value="48 Enrolled Students"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 px-3 text-sm text-slate-500"
                  />
                </div>
              </div>
            </div>
          )}

          {wizardStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Input
                  label="Duration (Minutes)"
                  type="number"
                  required
                  value={quizDuration}
                  onChange={(e) => setQuizDuration(e.target.value)}
                />
                <Input
                  label="Question Count"
                  type="number"
                  required
                  value={quizQuestionsCount}
                  onChange={(e) => setQuizQuestionsCount(e.target.value)}
                />
                <Input
                  label="Passing Score (%)"
                  type="number"
                  required
                  value={quizPassingScore}
                  onChange={(e) => setQuizPassingScore(e.target.value)}
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase">Assessment Security & Rules</h4>
                <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={quizShuffle}
                    onChange={(e) => setQuizShuffle(e.target.checked)}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Randomize question order and multiple-choice options for each candidate</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Enforce browser window blur and tab-switching integrity logging</span>
                </label>
              </div>
            </div>
          )}

          {wizardStep === 3 && (
            <div className="space-y-4">
              <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-950 text-sm">{quizTitle}</span>
                  <Badge variant="brand" size="sm">
                    {quizCourse}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2 text-slate-600">
                  <div>
                    <span className="text-slate-400">Duration:</span> {quizDuration} mins
                  </div>
                  <div>
                    <span className="text-slate-400">Questions:</span> {quizQuestionsCount} items
                  </div>
                  <div>
                    <span className="text-slate-400">Passing Grade:</span> {quizPassingScore}%
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                You can publish this assessment immediately to open candidate access, or save it as a Draft to assemble questions later.
              </p>
            </div>
          )}

          {/* Modal Navigation Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {wizardStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setWizardStep((s) => (s - 1) as any)}
              >
                ← Back
              </Button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              {wizardStep < 3 ? (
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  disabled={!quizTitle.trim()}
                  onClick={() => setWizardStep((s) => (s + 1) as any)}
                >
                  Next Step →
                </Button>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleCreateSubmit('draft')}
                  >
                    Save as Draft
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={() => handleCreateSubmit('active')}
                  >
                    Publish Assessment
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>

      {/* Slide-over Inspection Drawer */}
      <Drawer
        isOpen={Boolean(selectedQuiz)}
        onClose={() => setSelectedQuiz(null)}
        title={selectedQuiz?.title || 'Assessment Details'}
        description={selectedQuiz?.courseCode}
        footer={
          selectedQuiz && (
            <div className="flex items-center justify-between w-full">
              <Button
                variant={selectedQuiz.status === 'active' ? 'outline' : 'primary'}
                size="sm"
                onClick={() => handleToggleStatus(selectedQuiz)}
              >
                {selectedQuiz.status === 'active' ? 'Deactivate (Draft)' : 'Activate Assessment'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedQuiz(null)}
              >
                Close
              </Button>
            </div>
          )
        }
      >
        {selectedQuiz && (
          <div className="space-y-6 text-xs">
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">{selectedQuiz.title}</span>
                <Badge
                  variant={
                    selectedQuiz.status === 'active'
                      ? 'success'
                      : selectedQuiz.status === 'draft'
                      ? 'neutral'
                      : 'info'
                  }
                  size="sm"
                >
                  {selectedQuiz.status.toUpperCase()}
                </Badge>
              </div>
              <p className="text-slate-500">Scheduled Due: {selectedQuiz.dueDate}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-slate-100 bg-white">
                <span className="text-slate-400">Total Duration</span>
                <p className="font-bold text-slate-800 text-sm mt-0.5">
                  {selectedQuiz.durationMinutes} Minutes
                </p>
              </div>
              <div className="p-3 rounded-lg border border-slate-100 bg-white">
                <span className="text-slate-400">Questions Pool</span>
                <p className="font-bold text-slate-800 text-sm mt-0.5">
                  {selectedQuiz.questionsCount} Multiple Choice
                </p>
              </div>
              <div className="p-3 rounded-lg border border-slate-100 bg-white">
                <span className="text-slate-400">Passing Benchmark</span>
                <p className="font-bold text-slate-800 text-sm mt-0.5">
                  {selectedQuiz.passingScore}% Correct
                </p>
              </div>
              <div className="p-3 rounded-lg border border-slate-100 bg-white">
                <span className="text-slate-400">Submission Rate</span>
                <p className="font-bold text-slate-800 text-sm mt-0.5">
                  {Math.round((selectedQuiz.attemptsCount / selectedQuiz.totalCandidates) * 100)}%
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Sample Question Bank Items
              </h4>
              <div className="space-y-2">
                {[
                  '1. Which SQL clause is used to filter records following aggregation?',
                  '2. Explain the difference between B-Trees and B+ Trees in indexing.',
                  '3. What ensures ACID compliance during distributed transaction rollback?',
                ].map((q, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg border border-slate-100 bg-white text-slate-700">
                    {q}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(quizToDelete)}
        onClose={() => setQuizToDelete(null)}
        onConfirm={handleDelete}
        title="Delete Assessment"
        message={`Are you sure you want to permanently remove ${quizToDelete?.title}? All recorded candidate attempts and scores for this quiz will be purged.`}
        confirmLabel="Delete Assessment"
        variant="destructive"
      />
    </div>
  );
}