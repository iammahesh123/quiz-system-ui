import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Calendar,
  BarChart3,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  FileSpreadsheet,
  ShieldAlert,
  Download,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

interface IntegrityIncident {
  id: string;
  student: string;
  exam: string;
  course: string;
  timestamp: string;
  flagType: string;
  severity: 'high' | 'medium';
  details: string;
}

const mockIncidents: IntegrityIncident[] = [
  {
    id: 'inc-101',
    student: 'Bob Smith',
    exam: 'CS-301 Midterm Examination',
    course: 'Computer Science',
    timestamp: '14 minutes ago',
    flagType: 'Tab Switch Violation (4 occurrences)',
    severity: 'high',
    details: 'Candidate switched away from full-screen exam tab for 42 seconds during Section B.',
  },
  {
    id: 'inc-102',
    student: 'Priya Sharma',
    exam: 'EE-202 Circuit Analysis Quiz',
    course: 'Electrical Engineering',
    timestamp: '48 minutes ago',
    flagType: 'Multiple Concurrent IP Logins',
    severity: 'high',
    details: 'Simultaneous sessions detected from 192.168.1.45 and 10.0.4.12 within 2 minutes.',
  },
  {
    id: 'inc-103',
    student: 'Kevin Miller',
    exam: 'MATH-104 Discrete Mathematics',
    course: 'Mathematics',
    timestamp: '2 hours ago',
    flagType: 'Clipboard Paste Anomaly',
    severity: 'medium',
    details: 'Sudden insertion of 450 characters of formatted code into SQL query response box.',
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);
  const [incidents, setIncidents] = useState<IntegrityIncident[]>(mockIncidents);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const stats = [
    {
      name: 'Registered Users',
      value: '2,345',
      change: '+12% this term',
      icon: Users,
      href: '/admin/users',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
    {
      name: 'Scheduled Exams',
      value: '45',
      change: '8 running today',
      icon: Calendar,
      href: '/admin/schedule',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      name: 'Completed Attempts',
      value: '12,456',
      change: '+23% vs last year',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      name: 'Integrity Alerts',
      value: `${incidents.length}`,
      change: 'Requires review',
      icon: AlertTriangle,
      onClick: () => setIsAlertsModalOpen(true),
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      highlight: true,
    },
  ];

  const handleDismissIncident = (id: string) => {
    setIncidents((prev) => prev.filter((inc) => inc.id !== id));
    setActionNotice('Integrity alert marked as resolved false positive.');
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleExportSystemAudit = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,Category,Value,Timestamp\nTotal Users,2345,' +
      new Date().toISOString() +
      '\nActive Quizzes,45,' +
      new Date().toISOString() +
      '\nAlerts,' +
      incidents.length +
      ',' +
      new Date().toISOString();
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `system_audit_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Institutional Governance Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">
            System overview, university examination scheduling, and real-time security alerts.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="h-4 w-4" />}
            onClick={handleExportSystemAudit}
          >
            Export Audit Logs
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Calendar className="h-4 w-4" />}
            onClick={() => navigate('/admin/schedule')}
          >
            Schedule Examination
          </Button>
        </div>
      </div>

      {actionNotice && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Metric Cards Grid with Interactive Drilldowns */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            onClick={() => {
              if (stat.onClick) stat.onClick();
              else if (stat.href) navigate(stat.href);
            }}
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
                <span className="text-xs font-semibold text-indigo-600">
                  {stat.change}
                </span>
              </div>
            </div>

            <div className="mt-3 text-[11px] font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors">
              Click to view details →
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout: Action Queue & Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Urgent Action Queue */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-subtle p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-600" />
              <h2 className="text-base font-bold text-slate-900">Governance & Proctoring Queue</h2>
            </div>
            <Badge variant="warning" size="sm">
              {incidents.length} Pending
            </Badge>
          </div>

          <div className="mt-4 divide-y divide-slate-100">
            {incidents.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                All academic integrity incidents resolved.
              </div>
            ) : (
              incidents.slice(0, 3).map((incident) => (
                <div key={incident.id} className="py-3.5 flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{incident.student}</span>
                      <Badge variant="danger" size="sm">
                        {incident.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 truncate">{incident.flagType}</p>
                    <p className="text-[11px] text-slate-400">
                      {incident.exam} • {incident.timestamp}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs py-1 px-2 shrink-0"
                    onClick={() => setIsAlertsModalOpen(true)}
                  >
                    Inspect
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Institutional Operations Feed */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-subtle p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Real-Time Examination Activity</h2>
            <Badge variant="neutral" size="sm">
              Live Feed
            </Badge>
          </div>

          <div className="mt-4 space-y-4">
            {[
              {
                title: 'New Quiz Published: CS-301 Midterm Examination',
                actor: 'Prof. Elena Rostova',
                dept: 'Computer Science',
                time: '24 minutes ago',
                icon: FileSpreadsheet,
              },
              {
                title: 'Term Schedule Confirmed: 45 Examination Windows',
                actor: 'Dr. Robert Vance (Dean)',
                dept: 'Academic Affairs',
                time: '1 hour ago',
                icon: Calendar,
              },
              {
                title: 'Batch Roster Imported: 120 Engineering Candidates',
                actor: 'System Registrar',
                dept: 'Electrical Engineering',
                time: '3 hours ago',
                icon: Users,
              },
              {
                title: 'Grade Audit Exported: Discrete Mathematics Final',
                actor: 'Dr. Marcus Webb',
                dept: 'Mathematics',
                time: '5 hours ago',
                icon: BarChart3,
              },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 shrink-0 mt-0.5">
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-900 leading-tight">
                    {activity.title}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {activity.actor} • {activity.dept}
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Academic Integrity Modal */}
      <Modal
        isOpen={isAlertsModalOpen}
        onClose={() => setIsAlertsModalOpen(false)}
        title="Academic Integrity & Cheating Incident Review"
        description="Review anomalous behavior flags logged by the automated proctoring monitor."
        size="lg"
      >
        <div className="space-y-4">
          {incidents.map((inc) => (
            <div
              key={inc.id}
              className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{inc.student}</span>
                    <Badge variant={inc.severity === 'high' ? 'danger' : 'warning'} size="sm">
                      {inc.severity.toUpperCase()} PRIORITY
                    </Badge>
                  </div>
                  <p className="text-xs font-medium text-slate-600 mt-0.5">{inc.exam}</p>
                </div>
                <span className="text-xs text-slate-400">{inc.timestamp}</span>
              </div>

              <div className="rounded-lg bg-white border border-slate-200 p-3 text-xs text-slate-700">
                <p className="font-semibold text-rose-700 mb-1">{inc.flagType}</p>
                <p className="text-slate-600 leading-relaxed">{inc.details}</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/60">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDismissIncident(inc.id)}
                >
                  Dismiss (False Positive)
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    handleDismissIncident(inc.id);
                    setActionNotice(`Exam session flagged for formal academic review: ${inc.student}`);
                  }}
                >
                  Flag for Faculty Review
                </Button>
              </div>
            </div>
          ))}

          {incidents.length === 0 && (
            <div className="py-8 text-center text-slate-500 text-sm">
              No active integrity incidents requiring review.
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}