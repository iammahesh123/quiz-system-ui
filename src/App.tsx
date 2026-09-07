import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/layout/DashboardLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminSchedule from './pages/admin/Schedule';
import AdminAnalytics from './pages/admin/Analytics';
import TeacherDashboard from './pages/teacher/Dashboard';
import TeacherStudents from './pages/teacher/Students';
import TeacherQuizzes from './pages/teacher/Quizzes';
import TeacherAnalytics from './pages/teacher/Analytics';
import StudentDashboard from './pages/student/Dashboard';
import StudentQuizzes from './pages/student/Quizzes';
import StudentProgress from './pages/student/Progress';
import ExamRunner from './pages/student/ExamRunner';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Dedicated Full-Screen Timed Examination Workspace */}
        <Route
          path="/exam/:quizId"
          element={<ProtectedRoute allowedRoles={['student', 'admin', 'teacher']} />}
        >
          <Route index element={<ExamRunner />} />
        </Route>

        {/* Admin Portal Routes */}
        <Route
          path="/admin"
          element={<ProtectedRoute allowedRoles={['admin']} />}
        >
          <Route element={<DashboardLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="schedule" element={<AdminSchedule />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>
        </Route>

        {/* Teacher Portal Routes */}
        <Route
          path="/teacher"
          element={<ProtectedRoute allowedRoles={['teacher']} />}
        >
          <Route element={<DashboardLayout />}>
            <Route index element={<TeacherDashboard />} />
            <Route path="students" element={<TeacherStudents />} />
            <Route path="quizzes" element={<TeacherQuizzes />} />
            <Route path="analytics" element={<TeacherAnalytics />} />
          </Route>
        </Route>

        {/* Student Portal Routes */}
        <Route
          path="/student"
          element={<ProtectedRoute allowedRoles={['student']} />}
        >
          <Route element={<DashboardLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="quizzes" element={<StudentQuizzes />} />
            <Route path="progress" element={<StudentProgress />} />
          </Route>
        </Route>

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;