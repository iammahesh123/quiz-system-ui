import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, Plus, MapPin, Search, Trash2, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';

interface ExamSchedule {
  id: string;
  title: string;
  department: string;
  teacher: string;
  date: Date;
  duration: number;
  participants: number;
  room: string;
  status: 'Scheduled' | 'Live' | 'Completed';
}

const initialSchedules: ExamSchedule[] = [
  {
    id: 'sch-01',
    title: 'CS-301 Database Systems Midterm',
    department: 'Computer Science',
    teacher: 'Prof. Elena Rostova',
    date: new Date(2026, 9, 24, 10, 0),
    duration: 60,
    participants: 45,
    room: 'Lab B-102 (Virtual + On-Campus)',
    status: 'Scheduled',
  },
  {
    id: 'sch-02',
    title: 'MATH-202 Advanced Engineering Mathematics',
    department: 'Mathematics',
    teacher: 'Dr. Alan Turing',
    date: new Date(2026, 9, 25, 14, 30),
    duration: 90,
    participants: 38,
    room: 'Hall 4-A',
    status: 'Scheduled',
  },
  {
    id: 'sch-03',
    title: 'EE-104 Circuit Theory & Signals',
    department: 'Electrical Engineering',
    teacher: 'Dr. Sarah Connor',
    date: new Date(2026, 9, 22, 9, 0),
    duration: 45,
    participants: 28,
    room: 'Engineering Block Rm 204',
    status: 'Live',
  },
  {
    id: 'sch-04',
    title: 'CS-401 Algorithm Complexity & Design',
    department: 'Computer Science',
    teacher: 'Prof. Elena Rostova',
    date: new Date(2026, 9, 15, 11, 0),
    duration: 75,
    participants: 52,
    room: 'Auditorium West',
    status: 'Completed',
  },
];

export default function AdminSchedule() {
  const [schedules, setSchedules] = useState<ExamSchedule[]>(initialSchedules);
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // New Schedule Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDept, setNewDept] = useState('Computer Science');
  const [newTeacher, setNewTeacher] = useState('Prof. Elena Rostova');
  const [newDuration, setNewDuration] = useState('60');
  const [newRoom, setNewRoom] = useState('Hall A-101');
  const [newParticipants, setNewParticipants] = useState('40');

  // Delete State
  const [scheduleToDelete, setScheduleToDelete] = useState<ExamSchedule | null>(null);

  const filteredSchedules = schedules.filter((s) => {
    const matchSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDept = deptFilter === 'All' || s.department === deptFilter;
    const matchStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: ExamSchedule = {
      id: `sch-${Date.now()}`,
      title: newTitle.trim(),
      department: newDept,
      teacher: newTeacher,
      date: new Date(Date.now() + 86400000 * 2), // 2 days in future
      duration: parseInt(newDuration, 10) || 60,
      participants: parseInt(newParticipants, 10) || 30,
      room: newRoom,
      status: 'Scheduled',
    };

    setSchedules([created, ...schedules]);
    setIsModalOpen(false);
    setNewTitle('');
  };

  const handleDelete = () => {
    if (!scheduleToDelete) return;
    setSchedules((prev) => prev.filter((s) => s.id !== scheduleToDelete.id));
    setScheduleToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">University Examination Timetable</h1>
          <p className="text-xs text-slate-500 mt-1">
            Global schedule, room assignments, and proctoring allocations across all university departments.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Schedule Examination
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by exam title or instructor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-1 focus:ring-indigo-500 shadow-xs"
            />
          </div>

          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-medium text-slate-700 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="All">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-medium text-slate-700 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="All">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Live">Live Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Schedule Cards List */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-subtle overflow-hidden">
        <ul className="divide-y divide-slate-100">
          {filteredSchedules.length === 0 ? (
            <li className="p-12 text-center text-slate-400 text-sm">
              No examination sessions match your filter criteria.
            </li>
          ) : (
            filteredSchedules.map((schedule) => (
              <li
                key={schedule.id}
                className="p-5 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 shrink-0 border border-indigo-100">
                    <CalendarIcon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-slate-900">{schedule.title}</h3>
                      <Badge
                        variant={
                          schedule.status === 'Live'
                            ? 'danger'
                            : schedule.status === 'Scheduled'
                            ? 'info'
                            : 'neutral'
                        }
                        size="sm"
                        dot={schedule.status === 'Live'}
                      >
                        {schedule.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                      <span className="font-semibold text-slate-700">{schedule.department}</span>
                      <span>•</span>
                      <span>Proctor: {schedule.teacher}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-600">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        {schedule.room}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="flex items-center gap-4 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5 tabular-nums">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span>{format(schedule.date, 'MMM d, yyyy h:mm a')}</span>
                    </div>
                    <div className="tabular-nums font-medium">
                      {schedule.duration} mins
                    </div>
                    <div className="flex items-center gap-1.5 tabular-nums">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span>{schedule.participants} candidates</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-rose-600 hover:bg-rose-50 px-2.5"
                      onClick={() => setScheduleToDelete(schedule)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Schedule Exam Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule Institutional Examination"
        description="Book exam hall, proctor, and time slot for upcoming course assessment."
        size="md"
      >
        <form onSubmit={handleCreateSchedule} className="space-y-4">
          <Input
            label="Examination Title"
            placeholder="e.g. CS-301 Midterm Examination"
            required
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Department
              </label>
              <select
                value={newDept}
                onChange={(e) => setNewDept(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-sm text-slate-900 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
              </select>
            </div>

            <Input
              label="Assigned Proctor"
              placeholder="Prof. Elena Rostova"
              value={newTeacher}
              onChange={(e) => setNewTeacher(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Duration (mins)"
              type="number"
              value={newDuration}
              onChange={(e) => setNewDuration(e.target.value)}
            />
            <Input
              label="Room / Hall"
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
            />
            <Input
              label="Expected Students"
              type="number"
              value={newParticipants}
              onChange={(e) => setNewParticipants(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Confirm & Schedule
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={Boolean(scheduleToDelete)}
        onClose={() => setScheduleToDelete(null)}
        onConfirm={handleDelete}
        title="Cancel Scheduled Examination"
        message={`Are you sure you want to cancel the schedule for ${scheduleToDelete?.title}? Enrolled candidates will receive a cancellation notice.`}
        confirmLabel="Cancel Examination"
        variant="destructive"
      />
    </div>
  );
}