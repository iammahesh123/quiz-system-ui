import { useState, useMemo } from 'react';
import { Plus, Download, ShieldCheck, Mail, Building, UserCheck, MoreHorizontal, Edit, KeyRound, UserX } from 'lucide-react';
import { DataTable, Column, BulkAction } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Drawer } from '../../components/ui/Drawer';
import { Input } from '../../components/ui/Input';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';

interface UniversityUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Teacher' | 'Student';
  department: string;
  status: 'Active' | 'Pending' | 'Suspended';
  lastActive: string;
  joinedDate: string;
}

const initialUsers: UniversityUser[] = [
  {
    id: 'usr-001',
    name: 'Dr. Robert Vance',
    email: 'admin@univ.edu',
    role: 'Admin',
    department: 'Academic Affairs',
    status: 'Active',
    lastActive: 'Just now',
    joinedDate: '2022-08-15',
  },
  {
    id: 'usr-002',
    name: 'Prof. Elena Rostova',
    email: 'elena.rostova@univ.edu',
    role: 'Teacher',
    department: 'Computer Science',
    status: 'Active',
    lastActive: '12 mins ago',
    joinedDate: '2023-01-10',
  },
  {
    id: 'usr-003',
    name: 'Marcus Chen',
    email: 'marcus.chen@student.univ.edu',
    role: 'Student',
    department: 'Computer Science',
    status: 'Active',
    lastActive: '1 hour ago',
    joinedDate: '2024-09-01',
  },
  {
    id: 'usr-004',
    name: 'Dr. Alan Turing',
    email: 'a.turing@univ.edu',
    role: 'Teacher',
    department: 'Mathematics',
    status: 'Active',
    lastActive: '3 hours ago',
    joinedDate: '2021-06-20',
  },
  {
    id: 'usr-005',
    name: 'Sophia Patel',
    email: 'sophia.p@student.univ.edu',
    role: 'Student',
    department: 'Electrical Engineering',
    status: 'Active',
    lastActive: 'Yesterday',
    joinedDate: '2024-09-01',
  },
  {
    id: 'usr-006',
    name: 'Dr. Sarah Connor',
    email: 's.connor@univ.edu',
    role: 'Teacher',
    department: 'Physics',
    status: 'Active',
    lastActive: '2 days ago',
    joinedDate: '2022-11-04',
  },
  {
    id: 'usr-007',
    name: 'Liam Neeson',
    email: 'l.neeson@student.univ.edu',
    role: 'Student',
    department: 'Computer Science',
    status: 'Pending',
    lastActive: 'Never',
    joinedDate: '2026-08-20',
  },
  {
    id: 'usr-008',
    name: 'Ada Lovelace',
    email: 'a.lovelace@univ.edu',
    role: 'Teacher',
    department: 'Computer Science',
    status: 'Active',
    lastActive: '4 hours ago',
    joinedDate: '2020-09-15',
  },
  {
    id: 'usr-009',
    name: 'David Beckham',
    email: 'd.beckham@student.univ.edu',
    role: 'Student',
    department: 'Sports Science',
    status: 'Suspended',
    lastActive: '2 weeks ago',
    joinedDate: '2023-09-01',
  },
  {
    id: 'usr-010',
    name: 'Marie Curie',
    email: 'm.curie@univ.edu',
    role: 'Teacher',
    department: 'Physics',
    status: 'Active',
    lastActive: '5 hours ago',
    joinedDate: '2019-01-15',
  },
];

export default function AdminUsers() {
  const [users, setUsers] = useState<UniversityUser[]>(initialUsers);
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [deptFilter, setDeptFilter] = useState<string>('All');

  // Modals & Drawers
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UniversityUser | null>(null);
  const [userToDelete, setUserToDelete] = useState<UniversityUser | null>(null);

  // New User Form State
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'Admin' | 'Teacher' | 'Student'>('Student');
  const [newUserDept, setNewUserDept] = useState('Computer Science');

  // Filtered dataset
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchRole = roleFilter === 'All' || u.role === roleFilter;
      const matchDept = deptFilter === 'All' || u.department === deptFilter;
      return matchRole && matchDept;
    });
  }, [users, roleFilter, deptFilter]);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    const created: UniversityUser = {
      id: `usr-${Date.now()}`,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      department: newUserDept,
      status: 'Active',
      lastActive: 'Just now',
      joinedDate: new Date().toISOString().split('T')[0],
    };

    setUsers([created, ...users]);
    setIsAddUserOpen(false);
    setNewUserName('');
    setNewUserEmail('');
  };

  const handleDeleteUser = () => {
    if (!userToDelete) return;
    setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
    setUserToDelete(null);
    if (selectedUser?.id === userToDelete.id) {
      setSelectedUser(null);
    }
  };

  const handleBulkExport = (selected: UniversityUser[]) => {
    const csvContent =
      'data:text/csv;charset=utf-8,ID,Name,Email,Role,Department,Status\n' +
      selected
        .map((u) => `${u.id},"${u.name}",${u.email},${u.role},"${u.department}",${u.status}`)
        .join('\n');
    const encoded = encodeURI(csvContent);
    const a = document.createElement('a');
    a.href = encoded;
    a.download = `users_export_${Date.now()}.csv`;
    a.click();
  };

  const handleBulkDeactivate = (selected: UniversityUser[]) => {
    const ids = new Set(selected.map((u) => u.id));
    setUsers((prev) =>
      prev.map((u) => (ids.has(u.id) ? { ...u, status: 'Suspended' as const } : u))
    );
  };

  const columns: Column<UniversityUser>[] = [
    {
      key: 'name',
      header: 'User Identity',
      sortable: true,
      accessor: (u) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700 shrink-0">
            {u.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)}
          </div>
          <div>
            <div className="font-semibold text-slate-900 leading-tight">{u.name}</div>
            <div className="text-xs text-slate-500 mt-0.5">{u.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      accessor: (u) => (
        <Badge
          variant={
            u.role === 'Admin' ? 'danger' : u.role === 'Teacher' ? 'success' : 'info'
          }
          size="sm"
          dot
        >
          {u.role}
        </Badge>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
      accessor: (u) => <span className="text-xs font-medium text-slate-700">{u.department}</span>,
    },
    {
      key: 'status',
      header: 'Account Status',
      sortable: true,
      accessor: (u) => (
        <Badge
          variant={
            u.status === 'Active' ? 'success' : u.status === 'Pending' ? 'warning' : 'neutral'
          }
          size="sm"
        >
          {u.status}
        </Badge>
      ),
    },
    {
      key: 'lastActive',
      header: 'Last Active',
      accessor: (u) => <span className="text-xs text-slate-500 tabular-nums">{u.lastActive}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      accessor: (u) => (
        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="sm"
            className="px-2 py-1 h-7 text-xs"
            onClick={() => setSelectedUser(u)}
          >
            Inspect
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-2 py-1 h-7 text-xs text-rose-600 hover:bg-rose-50 hover:text-rose-700"
            onClick={() => setUserToDelete(u)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const bulkActions: BulkAction<UniversityUser>[] = [
    {
      label: 'Export Selected',
      icon: <Download className="h-4 w-4" />,
      onClick: handleBulkExport,
    },
    {
      label: 'Suspend Accounts',
      variant: 'destructive',
      onClick: handleBulkDeactivate,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">User Governance Directory</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage institutional access, departmental affiliations, and roles for faculty and candidates.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => setIsAddUserOpen(true)}
        >
          Add New User
        </Button>
      </div>

      {/* Enterprise Data Table */}
      <DataTable
        data={filteredUsers}
        columns={columns}
        keyExtractor={(u) => u.id}
        searchPlaceholder="Search users by name, email, or department..."
        searchFilter={(u, query) => {
          const q = query.toLowerCase();
          return (
            u.name.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q) ||
            u.department.toLowerCase().includes(q)
          );
        }}
        bulkActions={bulkActions}
        filterSlots={
          <div className="flex items-center gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="All">All Roles</option>
              <option value="Admin">Administrators</option>
              <option value="Teacher">Faculty / Teachers</option>
              <option value="Student">Candidates / Students</option>
            </select>

            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="All">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
            </select>
          </div>
        }
        activeFilters={[
          ...(roleFilter !== 'All'
            ? [{ label: `Role: ${roleFilter}`, onRemove: () => setRoleFilter('All') }]
            : []),
          ...(deptFilter !== 'All'
            ? [{ label: `Dept: ${deptFilter}`, onRemove: () => setDeptFilter('All') }]
            : []),
        ]}
        onClearFilters={() => {
          setRoleFilter('All');
          setDeptFilter('All');
        }}
        onRowClick={(user) => setSelectedUser(user)}
      />

      {/* Add User Modal */}
      <Modal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        title="Register Institutional User"
        description="Add a new academic user with institutional privileges and department affiliation."
        size="md"
      >
        <form onSubmit={handleCreateUser} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="e.g. Dr. Jane Doe"
            required
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />

          <Input
            label="Institutional Email"
            type="email"
            placeholder="e.g. j.doe@univ.edu"
            required
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Role Assignment
              </label>
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value as any)}
                className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-sm text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Department
              </label>
              <select
                value={newUserDept}
                onChange={(e) => setNewUserDept(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-sm text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddUserOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save & Create User
            </Button>
          </div>
        </form>
      </Modal>

      {/* Slide-over User Inspection Drawer */}
      <Drawer
        isOpen={Boolean(selectedUser)}
        onClose={() => setSelectedUser(null)}
        title={selectedUser?.name || 'User Details'}
        description={selectedUser?.email}
        footer={
          <div className="flex items-center justify-between w-full">
            <Button
              variant="subtle-destructive"
              size="sm"
              onClick={() => {
                if (selectedUser) setUserToDelete(selectedUser);
              }}
            >
              Delete User
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setSelectedUser(null)}
            >
              Close Drawer
            </Button>
          </div>
        }
      >
        {selectedUser && (
          <div className="space-y-6 text-sm">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm border border-indigo-200">
                {selectedUser.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div>
                <p className="font-bold text-slate-900">{selectedUser.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="brand" size="sm">
                    {selectedUser.role}
                  </Badge>
                  <span className="text-xs text-slate-500">{selectedUser.department}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Account Information
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg border border-slate-100 bg-white">
                  <span className="text-slate-400">User ID</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedUser.id}</p>
                </div>
                <div className="p-3 rounded-lg border border-slate-100 bg-white">
                  <span className="text-slate-400">Account Status</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedUser.status}</p>
                </div>
                <div className="p-3 rounded-lg border border-slate-100 bg-white">
                  <span className="text-slate-400">Joined Date</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedUser.joinedDate}</p>
                </div>
                <div className="p-3 rounded-lg border border-slate-100 bg-white">
                  <span className="text-slate-400">Last Active</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedUser.lastActive}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Security & Role Permissions
              </h4>
              <div className="rounded-lg border border-slate-200 divide-y divide-slate-100 text-xs">
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">Two-Factor Authentication</p>
                    <p className="text-slate-500 text-[11px]">Enforced institutional standard</p>
                  </div>
                  <Badge variant="success" size="sm">
                    Enabled
                  </Badge>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">Proctoring Authorization</p>
                    <p className="text-slate-500 text-[11px]">Can oversee live assessment rooms</p>
                  </div>
                  <Badge variant={selectedUser.role !== 'Student' ? 'success' : 'neutral'} size="sm">
                    {selectedUser.role !== 'Student' ? 'Granted' : 'Restricted'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* Delete User Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(userToDelete)}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDeleteUser}
        title="Deactivate Institutional User"
        message={`Are you sure you want to remove ${userToDelete?.name} (${userToDelete?.email})? This user will lose access to all active assessments and grade reports immediately.`}
        confirmLabel="Deactivate User"
        variant="destructive"
      />
    </div>
  );
}