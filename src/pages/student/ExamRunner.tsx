import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flag,
  ArrowRight,
  ArrowLeft,
  Shield,
  Award,
  ChevronRight,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

interface ExamQuestion {
  id: number;
  prompt: string;
  category: string;
  points: number;
  options: { id: string; text: string }[];
  correctOptionId: string;
}

const sampleQuestions: ExamQuestion[] = [
  {
    id: 1,
    prompt: 'Which normal form guarantees that all partial functional dependencies on candidate keys are eliminated?',
    category: 'Relational Database Design',
    points: 2,
    options: [
      { id: 'A', text: 'First Normal Form (1NF)' },
      { id: 'B', text: 'Second Normal Form (2NF)' },
      { id: 'C', text: 'Third Normal Form (3NF)' },
      { id: 'D', text: 'Boyce-Codd Normal Form (BCNF)' },
    ],
    correctOptionId: 'B',
  },
  {
    id: 2,
    prompt: 'In SQL, which clause is executed AFTER GROUP BY to filter grouped records based on aggregated predicates?',
    category: 'SQL Query Execution',
    points: 2,
    options: [
      { id: 'A', text: 'WHERE' },
      { id: 'B', text: 'FILTER' },
      { id: 'C', text: 'HAVING' },
      { id: 'D', text: 'QUALIFY' },
    ],
    correctOptionId: 'C',
  },
  {
    id: 3,
    prompt: 'What is the primary architectural difference between B-Trees and B+ Trees in database indexing?',
    category: 'Storage & Indexing',
    points: 3,
    options: [
      { id: 'A', text: 'B-Trees store data pointers only at the leaf nodes, while B+ Trees store them in all nodes.' },
      { id: 'B', text: 'B+ Trees store all actual record keys/pointers at leaf nodes and link leaves in a sequential chain.' },
      { id: 'C', text: 'B+ Trees do not support range scans efficiently.' },
      { id: 'D', text: 'B-Trees require binary search while B+ Trees require hash lookup.' },
    ],
    correctOptionId: 'B',
  },
  {
    id: 4,
    prompt: 'Which ACID property guarantees that a transaction completes entirely or leaves the database unmodified if a crash occurs?',
    category: 'Transaction Management',
    points: 2,
    options: [
      { id: 'A', text: 'Atomicity' },
      { id: 'B', text: 'Consistency' },
      { id: 'C', text: 'Isolation' },
      { id: 'D', text: 'Durability' },
    ],
    correctOptionId: 'A',
  },
  {
    id: 5,
    prompt: 'Which isolation level prevents Dirty Reads and Non-Repeatable Reads, but allows Phantom Reads in ANSI SQL?',
    category: 'Concurrency Control',
    points: 3,
    options: [
      { id: 'A', text: 'Read Uncommitted' },
      { id: 'B', text: 'Read Committed' },
      { id: 'C', text: 'Repeatable Read' },
      { id: 'D', text: 'Serializable' },
    ],
    correctOptionId: 'C',
  },
];

export default function ExamRunner() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({ 1: 'B' }); // Q1 pre-answered
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [secondsRemaining, setSecondsRemaining] = useState<number>(54 * 60); // 54 mins left
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<string>('Just now');

  // Countdown clock interval
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  // Periodic autosave simulation
  useEffect(() => {
    const saveTimer = setInterval(() => {
      setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 15000);
    return () => clearInterval(saveTimer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = sampleQuestions[currentIndex];

  const handleSelectOption = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
    setLastSaved('Just now');
  };

  const handleToggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) next.delete(currentQuestion.id);
      else next.add(currentQuestion.id);
      return next;
    });
  };

  // Evaluation calculation
  const totalQuestions = sampleQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const flaggedCount = flagged.size;
  const unansweredCount = totalQuestions - answeredCount;

  // Calculate score upon submission
  let correctCount = 0;
  sampleQuestions.forEach((q) => {
    if (answers[q.id] === q.correctOptionId) correctCount += 1;
  });
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans">
        <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-card text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 shadow-xs">
            <Award className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">Assessment Submitted Successfully</h1>
            <p className="text-xs text-slate-500">
              Your responses have been securely verified and archived in the institutional registry.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Your Score</span>
              <p className="text-2xl font-bold text-indigo-600 mt-0.5">{scorePercent}%</p>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Correct Answers</span>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">
                {correctCount} / {totalQuestions}
              </p>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Academic Status</span>
              <p className="text-2xl font-bold text-emerald-600 mt-0.5">PASSED</p>
            </div>
          </div>

          <div className="rounded-lg border border-slate-100 p-3 bg-white text-left text-xs text-slate-500 space-y-1">
            <p>
              <span className="font-semibold text-slate-700">Exam Title: </span>
              CS-301 Midterm Examination
            </p>
            <p>
              <span className="font-semibold text-slate-700">Submission Receipt Hash: </span>
              <span className="font-mono text-[11px] text-indigo-700">
                0x8b4f2c91e03a74df12a...9b41
              </span>
            </p>
            <p>
              <span className="font-semibold text-slate-700">Recorded At: </span>
              {new Date().toLocaleString()}
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => navigate('/student')}
          >
            Return to Student Workspace
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans select-none">
      {/* Distraction-Free Sticky Top Header */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm shadow-xs">
            301
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-tight">
              CS-301: Database Management Systems Midterm
            </h1>
            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Cloud Auto-Saved ({lastSaved})
              </span>
              <span>•</span>
              <span>Proctored Session #842</span>
            </div>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-2 rounded-xl px-4 py-2 border font-mono text-base font-bold tabular-nums shadow-xs ${
              secondsRemaining < 300
                ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                : secondsRemaining < 600
                ? 'bg-amber-50 border-amber-300 text-amber-800'
                : 'bg-indigo-50 border-indigo-200 text-indigo-900'
            }`}
          >
            <Clock className="h-4 w-4" />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsSubmitModalOpen(true)}
          >
            Finish & Submit
          </Button>
        </div>
      </header>

      {/* Main Examination Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Question Workspace */}
        <div className="lg:col-span-2 space-y-4">
          {/* Question Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-subtle space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500">{currentQuestion.category}</span>
              </div>
              <Badge variant="brand" size="sm">
                {currentQuestion.points} Points
              </Badge>
            </div>

            {/* Prompt */}
            <p className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
              {currentQuestion.prompt}
            </p>

            {/* Radio Options */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((opt) => {
                const isSelected = answers[currentQuestion.id] === opt.id;
                return (
                  <label
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`flex items-start gap-3.5 p-4 rounded-xl border text-sm transition-all cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-500'
                        : 'border-slate-200 bg-white hover:bg-slate-50/80 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border shrink-0 mt-0.5 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
                    </div>
                    <div className="flex-1 text-slate-800 leading-normal">
                      <span className="font-bold text-slate-900 mr-2">{opt.id}.</span>
                      {opt.text}
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Question Footer Bar */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <Button
                variant={flagged.has(currentQuestion.id) ? 'outline' : 'ghost'}
                size="sm"
                leftIcon={<Flag className={`h-4 w-4 ${flagged.has(currentQuestion.id) ? 'text-amber-500 fill-amber-500' : ''}`} />}
                onClick={handleToggleFlag}
              >
                {flagged.has(currentQuestion.id) ? 'Flagged for Review' : 'Flag Question'}
              </Button>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<ArrowLeft className="h-4 w-4" />}
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((idx) => Math.max(0, idx - 1))}
                >
                  Previous
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  disabled={currentIndex === totalQuestions - 1}
                  onClick={() => setCurrentIndex((idx) => Math.min(totalQuestions - 1, idx + 1))}
                >
                  Next Question
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Question Palette & Submission */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-subtle space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Exam Question Navigator
            </h3>

            {/* Grid of Question buttons */}
            <div className="grid grid-cols-5 gap-2">
              {sampleQuestions.map((q, idx) => {
                const isCurrent = currentIndex === idx;
                const isAnswered = Boolean(answers[q.id]);
                const isFlagged = flagged.has(q.id);

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative h-10 rounded-lg text-xs font-bold transition-all ${
                      isCurrent
                        ? 'ring-2 ring-indigo-600 ring-offset-2'
                        : ''
                    } ${
                      isAnswered
                        ? 'bg-indigo-600 text-white shadow-xs hover:bg-indigo-700'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{idx + 1}</span>
                    {isFlagged && (
                      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-400 ring-1 ring-white" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-md bg-indigo-600" />
                  <span>Answered</span>
                </span>
                <span className="font-bold tabular-nums">{answeredCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-md bg-amber-400" />
                  <span>Flagged for Review</span>
                </span>
                <span className="font-bold tabular-nums">{flaggedCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-md bg-slate-200" />
                  <span>Unanswered</span>
                </span>
                <span className="font-bold tabular-nums">{unansweredCount}</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => setIsSubmitModalOpen(true)}
            >
              Submit Assessment
            </Button>
          </div>
        </div>
      </main>

      {/* Confirmation Modal Before Submission */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Confirm Final Assessment Submission"
        description="Please review your completion status before finalizing your examination."
        size="md"
      >
        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <div>
              <span className="text-[11px] text-slate-500 font-semibold uppercase">Answered</span>
              <p className="text-xl font-bold text-indigo-600 mt-0.5">{answeredCount}</p>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-semibold uppercase">Flagged</span>
              <p className="text-xl font-bold text-amber-600 mt-0.5">{flaggedCount}</p>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-semibold uppercase">Unanswered</span>
              <p className="text-xl font-bold text-rose-600 mt-0.5">{unansweredCount}</p>
            </div>
          </div>

          {unansweredCount > 0 ? (
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800 flex items-start gap-2.5">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                You have {unansweredCount} unanswered question{unansweredCount > 1 ? 's' : ''}. Any unanswered questions will receive 0 points.
              </span>
            </div>
          ) : (
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>All questions have been answered. You are ready to submit!</span>
            </div>
          )}

          <p className="text-xs text-slate-500">
            Once submitted, your responses cannot be modified and your testing session will conclude.
          </p>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSubmitModalOpen(false)}
            >
              Return to Exam
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setIsSubmitModalOpen(false);
                setIsSubmitted(true);
              }}
            >
              Confirm Final Submission
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
